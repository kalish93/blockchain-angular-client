import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionRoutingModule } from './election-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ElectionHomeComponent } from './components/election-home/election-home.component';
import { CreateElectionDialogComponent } from './components/create-election-dialog/create-election-dialog.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { ElectionState } from './state/election.state';
import { NgxsModule } from '@ngxs/store';
import { ElectionsListComponent } from './components/elections-list/elections-list.component';
import { ElectionDetailComponent } from './components/election-detail/election-detail.component';



@NgModule({
  declarations: [
    ElectionHomeComponent,
    CreateElectionDialogComponent,
    CandidateFormComponent,
    ElectionsListComponent,
    ElectionDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ElectionRoutingModule,
    NgxsModule.forFeature([ElectionState]),
  ],
})
export class ElectionModule {}
