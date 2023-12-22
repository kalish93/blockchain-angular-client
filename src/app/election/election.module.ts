import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionRoutingModule } from './election-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ElectionRoutingModule
  ]
})
export class ElectionModule { }
