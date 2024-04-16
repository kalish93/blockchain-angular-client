import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import {
  CreateElection,
  GetAllElections,
  VoteForCandidate,
  GetElectionDetial,
  GetPersolanizedElections,
} from './election.action';
import { BlockchainService } from '../services/blockchain.service';
import { Election } from '../models/election.model';
import { AuthState, AuthStateModel } from '../../auth/store/auth.state';
import { jwtDecode } from 'jwt-decode';
import { ImageUploadService } from '../services/image-upload.service';
import { forkJoin, map, tap } from 'rxjs';

export interface ElectionStateModel {
  // inprogress: boolean;
  elections: any[];
  electionDetail: any;
  personalizedElections: any[];
}

const ELECTION_STATE_TOKEN = new StateToken<ElectionStateModel>(
  'ElectionState'
);

const defaults: ElectionStateModel = {
  // inprogress: false,
  elections: [],
  electionDetail: {},
  personalizedElections: [],
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
    private store: Store
  ) {}

  @Action(CreateElection)
  async createElection(
    { setState }: StateContext<ElectionStateModel>,
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
                   description: election.get(
                     `candidates[${i}][description]`
                   ) as string,
                   imageUrl: result.imageUrl,
                 }))
            )
          );
        }
      }
    }

    // Ensure all file uploads are completed before proceeding.
    const electionData = await forkJoin(uploadRequests).toPromise();
    
    
    await this.blockchainService.createElection(
      election.get(`title`) as string,
      (election.get('organizationId') as string) ?? '',
      election.get(`description`) as string,
      electionData || []
    );

    this.store.dispatch(new GetAllElections());
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
    };
    console.log('GetElectionDetial election', election);
    console.log('GetElectionDetial electionName', election.electionName);

    patchState({ electionDetail: election });
  }

  @Action(VoteForCandidate)
  async voteForCandidate(
    { setState }: StateContext<ElectionStateModel>,
    { votorId, electionId, candidateId }: VoteForCandidate
  ) {
    // setState({ inprogress: true });
    await this.blockchainService.voteForCandidate(
      votorId,
      electionId,
      candidateId
    );
    this.store.dispatch(new GetElectionDetial(electionId));
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
}
