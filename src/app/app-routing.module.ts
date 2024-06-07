import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, ORGANIZATION_LIST, REGISTER_ROUTE, USERS_ROUTE, VERIFY_EMAIL_ROUTE } from './core/constants/routes';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/components/register/register.component';
import { OrganizationListComponent } from './organization/components/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './organization/components/organization-detail/organization-detail.component';
import { VerifyEmailComponent } from './user/components/verify-email/verify-email.component';
import { DashboardComponent } from './statistics/componenets/dashboard/dashboard.component';
import { EmailVerifiedGuard } from './auth/services/email-verified.guard';
import { UsersListComponent } from './user/components/users-list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
  { path: LOGIN_ROUTE, component: LoginComponent },
  { path: HOME_ROUTE, component: HomeComponent, canActivate: [EmailVerifiedGuard]},
  { path: REGISTER_ROUTE, component: RegisterComponent},
  { path: ORGANIZATION_LIST, component: OrganizationListComponent, canActivate: [EmailVerifiedGuard] },
  { path: `${ORGANIZATION_LIST}/:id`, component: OrganizationDetailComponent, canActivate: [EmailVerifiedGuard] },
  { path: VERIFY_EMAIL_ROUTE, component: VerifyEmailComponent},
  { path: DASHBOARD_ROUTE, component: DashboardComponent, canActivate: [EmailVerifiedGuard] },
  { path: USERS_ROUTE, component: UsersListComponent, canActivate: [EmailVerifiedGuard] },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
