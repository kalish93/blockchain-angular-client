import { Selector, createPropertySelectors } from "@ngxs/store";
import { StaticticsStateModel, StatisticsState } from "./statistics.state";

export class StatisticsSelector {
  static slices = createPropertySelectors(StatisticsState);
  @Selector([StatisticsState])
  static generalStatistics(stateModel: StaticticsStateModel) {
    return stateModel.generalStatistics;
  }
}