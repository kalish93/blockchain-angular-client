import { Component } from '@angular/core';
import { GeneralStatistics } from '../../models/general-statistics';
import { BlockchainFacade } from '../../facades/statistics.facade';
import { RxState } from '@rx-angular/state';

interface DashboardComponentState {
  generalStatistics: GeneralStatistics | undefined;
}

const initialDashboardComponentState: DashboardComponentState = {
  generalStatistics: undefined,
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  generalStatistics: GeneralStatistics | undefined;
  generalStatistics$ = this.blockchainFacade.generalStatistics$;
  constructor(
    private blockchainFacade: BlockchainFacade,
    private state: RxState<DashboardComponentState>
  ) {
    this.state.set(initialDashboardComponentState);
    this.state.connect('generalStatistics', this.generalStatistics$);
  }

  ngOnInit(): void {
    this.blockchainFacade.dispatchGetGeneralStatistics();
    this.generalStatistics$.subscribe(
      (generalStatistics) => (this.generalStatistics = generalStatistics)
    );
      console.log("general statics",this.generalStatistics?.noOfElections);
  }

  get publicElectionsPercentage(): number {
    if (this.generalStatistics){
      return (
        (this.generalStatistics.noOfPublicElections /
          this.generalStatistics.noOfElections) *
        100
      );
    }
    return 0
    
  }
}
