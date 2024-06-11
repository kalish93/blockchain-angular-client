import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import {
  CreateElection,
  GetAllElections,
  VoteForCandidate,
  GetElectionDetial,
  GetPersolanizedElections,
  GetElectionData,
} from './election.action';
import { BlockchainService } from '../services/blockchain.service';
import { ElectionService } from '../services/election.service';
import { Election } from '../models/election.model';
import { AuthState, AuthStateModel } from '../../auth/store/auth.state';
import { jwtDecode } from 'jwt-decode';
import { ImageUploadService } from '../services/image-upload.service';
import { forkJoin, map, tap } from 'rxjs';
import { OperationStatusService } from '../../core/services/operation-status.service';
import { successStyle } from '../../core/services/status-style-names';

export interface ElectionStateModel {
  // inprogress: boolean;
  elections: any[];
  electionDetail: any;
  personalizedElections: any[];
  electionData: any;
}

const ELECTION_STATE_TOKEN = new StateToken<ElectionStateModel>(
  'ElectionState'
);

const defaults: ElectionStateModel = {
  // inprogress: false,
  elections: [],
  electionDetail: {},
  personalizedElections: [],
  electionData: {},
};

@State<ElectionStateModel>({
  name: ELECTION_STATE_TOKEN,
  defaults: defaults,
})
@Injectable()
export class ElectionState {
  constructor(
    private blockchainService: BlockchainService,
    private imageUploadService: ImageUploadService,
    private store: Store,
    private operationStatusService: OperationStatusService,
    private electionService: ElectionService
  ) {}

  @Action(CreateElection)
  async createElection(
    { setState, patchState, getState }: StateContext<ElectionStateModel>,
    { election }: CreateElection
  ) {
    const uploadRequests = [];
    for (let i = 0; election.has(`candidates[${i}][name]`); i++) {
      if (election.has(`candidates[${i}][image]`)) {
        const image = election.get(`candidates[${i}][image]`) as File;
        if (image) {
          uploadRequests.push(
            this.imageUploadService.uploadImage(image).pipe(
              map((result: any) => ({
                name: election.get(`candidates[${i}][name]`) as string,
                imgUrl: result.imageUrl,
                Description: election.get(
                  `candidates[${i}][description]`
                ) as string,
              }))
            )
          );
        }
      }
    }

    // Ensure all file uploads are completed before proceeding.
    const electionData = await forkJoin(uploadRequests).toPromise();
    const createdElection = await this.blockchainService.createElection(
      election.get(`title`) as string,
      (election.get('organizationId') as string) ?? '',
      election.get(`description`) as string,
      electionData || [],
      election.get(`endTime`)
    );

    const state = getState();
    patchState({
      personalizedElections: [createdElection, ...state.personalizedElections],
    });
    this.operationStatusService.displayStatus(
      'Election created successfully',
      successStyle
    );
  }

  @Action(GetAllElections)
  async getAllElections({ patchState }: StateContext<ElectionStateModel>) {
    // setState({ inprogress: true });
    const elections = await this.blockchainService.getAllElections();
    console.log('GetAllElections elections', elections);
    patchState({ elections: elections });
  }

  getUserIdFromToken(): string | null {
    const authState: AuthStateModel = this.store.selectSnapshot(AuthState);
    const accessToken = authState.accessToken;

    if (!accessToken) {
      return null;
    }

    const decodedToken: any = jwtDecode(accessToken);
    return decodedToken.id;
  }

  @Action(GetElectionDetial)
  async getElectionDetial(
    { patchState }: StateContext<ElectionStateModel>,
    { electionId }: GetElectionDetial
  ) {
    // setState({ inprogress: true });

    const comingElection = await this.blockchainService.getSingleElection(
      electionId,
      this.getUserIdFromToken()!
    );
    const election: Election = {
      hasVoted: comingElection.hasVoted,
      electionId: comingElection.electionId,
      electionName: comingElection.electionName,
      description: comingElection.description,
      candidates: comingElection.candidates,
      endTime: comingElection.endTime,
    };
    console.log('GetElectionDetial election', election);
    console.log('GetElectionDetial electionName', election.electionName);

    patchState({ electionDetail: election });
  }

  @Action(VoteForCandidate)
  async voteForCandidate(
    { setState, getState }: StateContext<ElectionStateModel>,
    { votorId, electionId, candidateId }: VoteForCandidate
  ) {
    // setState({ inprogress: true });
    await this.blockchainService.voteForCandidate(
      votorId,
      electionId,
      candidateId
    );

    let state = getState();

    const candidate = state.electionDetail.candidates.find(
      (candidate: any) => candidate.id === candidateId
    );
    const candidateName = candidate ? candidate.name : null;
    ;
    this.electionService.recordData(electionId, candidateId, candidateName).pipe(tap((data) => console.log(data)) ).subscribe(    );

    this.store.dispatch(new GetElectionDetial(electionId));
    this.operationStatusService.displayStatus(
      'Vote recorded successfully',
      successStyle
    );
  }

  @Action(GetPersolanizedElections)
  async getPersonalizedElections(
    { patchState }: StateContext<ElectionStateModel>,
    { organizationIds }: GetPersolanizedElections
  ) {
    // setState({ inprogress: true });
    const elections = await this.blockchainService.getPersonalizedElections(
      organizationIds
    );
    patchState({ personalizedElections: elections });
  }

  @Action(GetElectionData)
  getElectionData(
    { patchState, getState }: StateContext<ElectionStateModel>,
    { electionId }: GetElectionData
  ){

    let state = getState();
    let election = state.electionDetail;
    this.electionService
      .getRecordedData(electionId, election.timeCreated, election.endTime)
      .subscribe((data) => {
        console.log('GetElectionData data', data);
        patchState({ electionData: data });
      });
  }
}
