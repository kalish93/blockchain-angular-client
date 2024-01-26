import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionRoutingModule } from './election-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ElectionHomeComponent } from './components/election-home/election-home.component';
import { CreateElectionDialogComponent } from './components/create-election-dialog/create-election-dialog.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';



@NgModule({
  declarations: [
    ElectionHomeComponent,
    CreateElectionDialogComponent,
    CandidateFormComponent,
  ],
  imports: [CommonModule, SharedModule, ElectionRoutingModule],
})
export class ElectionModule {}
