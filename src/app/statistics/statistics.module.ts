import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticsState } from './state/statistics.state';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([StatisticsState]),
  ],
})
export class StatisticsModule {}
