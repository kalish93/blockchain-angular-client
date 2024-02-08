import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { OrganizationState } from './state/organization.state';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, NgxsModule.forFeature([OrganizationState])]
})
export class OrganizationModule { }
