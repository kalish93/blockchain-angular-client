import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './core/constants/routes';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
  { path: LOGIN_ROUTE, component: LoginComponent },
  { path: HOME_ROUTE, component: HomeComponent },
  { path : REGISTER_ROUTE, component: RegisterComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}