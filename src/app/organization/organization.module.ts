import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { OrganizationState } from './state/organization.state';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrganizationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([OrganizationState])]
})
export class OrganizationModule { }
