import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { CreateElection } from './election.action';
import { BlockchainService } from '../services/blockchain.service';

export interface ElectionStateModel {
 
}

const ELECTION_STATE_TOKEN = new StateToken<ElectionStateModel>(
  'ElectionState'
);

const defaults = {
  inprogress: false,
};

@State<ElectionStateModel>({
  name: ELECTION_STATE_TOKEN,
  defaults: defaults,
})
@Injectable()
export class ElectionState {
  constructor(private blockchainService: BlockchainService){}
  @Action(CreateElection)
  setProgressOff({ setState }: StateContext<ElectionStateModel>,
    {election}: CreateElection) {
        console.log(election);
        console.log(election.title);
        //return this.blockchainService.createElection(election.name, election.candidates);
        let electionData = []
        for(let i of election.candidates){
          electionData.push({name:i.name,imgUrl:i.image,Description:i.description})
        }
    setState({ inprogress: false });
    return this.blockchainService.createElection(election.title, electionData);
  }
}
