import { NgModule } from "@angular/core";
import { HomeComponent } from "../home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { ELECTION_HOME, ELECTION_LIST } from "../core/constants/routes";
import { ElectionHomeComponent } from "./components/election-home/election-home.component";
import { ElectionDetailComponent } from "./components/election-detail/election-detail.component";

const routes: Routes = [
  {
    path: ELECTION_HOME,
    component: ElectionHomeComponent,
},
  {
    path: `${ELECTION_LIST}/:id`,
    component: ElectionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionRoutingModule {}
