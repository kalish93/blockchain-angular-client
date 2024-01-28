import { Selector, createPropertySelectors } from '@ngxs/store';
import { ElectionState, ElectionStateModel } from './election.state';

export class ElectionSelector {
  static slices = createPropertySelectors<ElectionStateModel>(ElectionState);

  @Selector([ElectionState])
  static elections(stateModel: ElectionStateModel) {
    return stateModel.elections;
  }

  @Selector([ElectionState])
  static electionDetail(stateModel: ElectionStateModel) {
    return stateModel.electionDetail;
  }

}