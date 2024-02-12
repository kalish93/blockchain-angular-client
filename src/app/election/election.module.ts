import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionRoutingModule } from './election-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ElectionHomeComponent } from './components/election-home/election-home.component';
import { CreateElectionDialogComponent } from './components/create-election-dialog/create-election-dialog.component';
import { ElectionState } from './state/election.state';
import { NgxsModule } from '@ngxs/store';
import { ElectionsListComponent } from './components/elections-list/elections-list.component';
import { ElectionDetailComponent } from './components/election-detail/election-detail.component';
import { CreatedElectionsComponent } from './components/created-elections/created-elections.component';


@NgModule({
  declarations: [
    ElectionHomeComponent,
    CreateElectionDialogComponent,
    ElectionsListComponent,
    ElectionDetailComponent,
    CreatedElectionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ElectionRoutingModule,
    NgxsModule.forFeature([ElectionState]),
  ],
})
export class ElectionModule {}
