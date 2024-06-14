import { Component, OnInit } from '@angular/core';
import { GeneralStatistics } from '../../models/general-statistics';
import { BlockchainFacade } from '../../facades/statistics.facade';
import { RxState } from '@rx-angular/state';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface DashboardComponentState {
  generalStatistics: GeneralStatistics | undefined;
}

const initialDashboardComponentState: DashboardComponentState = {
  generalStatistics: undefined,
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  generalStatistics: GeneralStatistics | undefined;
  generalStatistics$ = this.blockchainFacade.generalStatistics$;

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number of Elections';
  showYAxisLabel = true;
  yAxisLabel = 'Election Type';
  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7C8CC7', '#f1b872', '#C7B42C', '#AAAAAA']
  };

  barChartData: any[] = [];

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
      (generalStatistics) => {
        this.generalStatistics = generalStatistics;
        this.updateChartData();
      }
    );
    console.log("general statics", this.generalStatistics?.noOfElections);
  }

  get publicElectionsPercentage(): number {
    if (this.generalStatistics) {
      return (
        (this.generalStatistics.noOfPublicElections /
          this.generalStatistics.noOfElections) *
        100
      );
    }
    return 0;
  }

  updateChartData(): void {
    if (this.generalStatistics) {
      this.barChartData = [
        {
          "name": "Public Elections",
          "value": Number(this.generalStatistics.noOfPublicElections)
        },
        {
          "name": "Private Elections",
          "value": Number(this.generalStatistics.noOfPrivateElections)
        }
      ];
    }
  }
}
