import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionRoutingModule } from './election-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ElectionHomeComponent } from './components/election-home/election-home.component';



@NgModule({
  declarations: [ElectionHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ElectionRoutingModule
  ]
})
export class ElectionModule { }
