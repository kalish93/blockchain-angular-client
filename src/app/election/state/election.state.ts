import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { CreateElection } from './election.action';

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
  @Action(CreateElection)
  setProgressOff({ setState }: StateContext<ElectionStateModel>,
    {election}: CreateElection) {
        console.log(election);
    setState({ inprogress: false });
    return 
  }
}
