import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, ORGANIZATION_LIST, REGISTER_ROUTE, VERIFY_EMAIL_ROUTE } from './core/constants/routes';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/components/register/register.component';
import { OrganizationListComponent } from './organization/components/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './organization/components/organization-detail/organization-detail.component';
import { VerifyEmailComponent } from './user/components/verify-email/verify-email.component';
import { DashboardComponent } from './statistics/componenets/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
  { path: LOGIN_ROUTE, component: LoginComponent },
  { path: HOME_ROUTE, component: HomeComponent },
  { path: REGISTER_ROUTE, component: RegisterComponent },
  { path: ORGANIZATION_LIST, component: OrganizationListComponent },
  { path: `${ORGANIZATION_LIST}/:id`, component: OrganizationDetailComponent },
  { path: VERIFY_EMAIL_ROUTE, component: VerifyEmailComponent},
  { path: DASHBOARD_ROUTE, component: DashboardComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
