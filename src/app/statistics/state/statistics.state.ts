import { Action, State, StateContext, StateToken, Store } from "@ngxs/store";
import { GeneralStatistics } from "../models/general-statistics";
import { GetGeneralStatistics } from "./statistics.action";
import { BlockchainService } from "../services/blockchain.service";

export interface StaticticsStateModel {
    generalStatistics: GeneralStatistics | undefined;
}

const STATISTICS_STATE_TOKEN = new StateToken<StaticticsStateModel>('StatisticsState');

const defaults: StaticticsStateModel = {
    generalStatistics: undefined,
};

@State<StaticticsStateModel>({
  name: STATISTICS_STATE_TOKEN,
  defaults: defaults,
})
export class StatisticsState {
  constructor(
    private blockchainService: BlockchainService,
    private store: Store
  ) {}

  @Action(GetGeneralStatistics)
  async getGeneralStatictics(
    { setState }: StateContext<StaticticsStateModel>,
    {}: GetGeneralStatistics
  ) {
    const generalStatistics = await this.blockchainService.getGeneralStatistics();
    setState({ generalStatistics });
  }
}