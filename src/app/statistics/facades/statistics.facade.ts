import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { GetGeneralStatistics } from "../state/statistics.action";
import { StatisticsSelector } from "../state/statistics.selector";
import { Observable } from "rxjs";
import { GeneralStatistics } from "../models/general-statistics";

@Injectable({ providedIn: 'root' })

export class BlockchainFacade {
    constructor(private store: Store) { }

    @Select(StatisticsSelector.generalStatistics)
    generalStatistics$!: Observable<GeneralStatistics>;

    dispatchGetGeneralStatistics() {
        this.store.dispatch(new GetGeneralStatistics());
    }
}