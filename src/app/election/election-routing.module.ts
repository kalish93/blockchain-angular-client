import { NgModule } from "@angular/core";
import { HomeComponent } from "../home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { ELECTION_HOME, ELECTION_LIST } from "../core/constants/routes";
import { ElectionHomeComponent } from "./components/election-home/election-home.component";
import { ElectionDetailComponent } from "./components/election-detail/election-detail.component";
import { EmailVerifiedGuard } from "../auth/services/email-verified.guard";

const routes: Routes = [
  {
    path: ELECTION_HOME,
    component: ElectionHomeComponent,
    canActivate: [EmailVerifiedGuard]
},
  {
    path: `${ELECTION_LIST}/:id`,
    component: ElectionDetailComponent,
    canActivate: [EmailVerifiedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionRoutingModule {}
