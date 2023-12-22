import { NgModule } from "@angular/core";
import { HomeComponent } from "../home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { ELECTION_HOME } from "../core/constants/routes";
import { ElectionHomeComponent } from "./components/election-home/election-home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ELECTION_HOME,
        component: ElectionHomeComponent,
      }
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionRoutingModule {}