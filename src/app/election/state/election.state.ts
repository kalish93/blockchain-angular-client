import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { CreateElection, GetAllElections,VoteForCandidate, GetElectionDetial } from './election.action';
import { BlockchainService } from '../services/blockchain.service';
import { Election } from '../models/election.model';

export interface ElectionStateModel {
  // inprogress: boolean;
  elections: any[];
  electionDetail: any;


}

const ELECTION_STATE_TOKEN = new StateToken<ElectionStateModel>(
  'ElectionState'
);

const defaults:ElectionStateModel = {
  // inprogress: false,
  elections: [],
  electionDetail:{},

};

@State<ElectionStateModel>({
  name: ELECTION_STATE_TOKEN,
  defaults: defaults,
})
@Injectable()
export class ElectionState {
  constructor(
      private blockchainService: BlockchainService,
      private store: Store,
      ) { }

  @Action(CreateElection)
  async createElection({ setState}: StateContext<ElectionStateModel>,
    { organizationId, election }: CreateElection) {
    console.log("election", election);
    //return this.blockchainService.createElection(election.name, election.candidates);
    let electionData = []
    for (let i of election.candidates) {
      electionData.push({ name: i.name, imgUrl: i.image, Description: i.description })
    }
    // setState({ inprogress: false });

    await this.blockchainService.createElection(election.title, organizationId, election.description, electionData);

    this.store.dispatch(new GetAllElections());
  }

  @Action(GetAllElections)
  async getAllElections({ patchState }: StateContext<ElectionStateModel>) {
    // setState({ inprogress: true });
    const elections = await this.blockchainService.getAllElections();
    console.log("GetAllElections elections", elections);
    patchState({ elections: elections });
  }

  @Action(GetElectionDetial)
  async getElectionDetial({ patchState }: StateContext<ElectionStateModel>,
    { electionId }: GetElectionDetial) {
    // setState({ inprogress: true });
    const comingElection = await this.blockchainService.getSingleElection(electionId);
    const election:Election = {
      electionId: comingElection.electionId,
      electionName: comingElection.electionName,
      description: comingElection.description,
      candidates: comingElection.candidates,
    }
    console.log("GetElectionDetial election", election);
    console.log("GetElectionDetial electionName", election.electionName)

    patchState({ electionDetail: election });
  }

  @Action(VoteForCandidate)
  async voteForCandidate({ setState }: StateContext<ElectionStateModel>,
    { votorId, electionId, candidateId }: VoteForCandidate) {
    // setState({ inprogress: true });
    await this.blockchainService.voteForCandidate(votorId, electionId, candidateId);
    this.store.dispatch(new GetElectionDetial(electionId));
  }
}
