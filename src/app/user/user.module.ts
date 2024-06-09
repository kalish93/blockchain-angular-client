import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { UserState } from './store/user.state';
import { NgxsModule } from '@ngxs/store';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';



@NgModule({
  declarations: [RegisterComponent,VerifyEmailComponent, UsersListComponent, AdminRegistrationComponent, ForgetPasswordComponent],
  imports: [
    SharedModule,NgxsModule.forFeature([UserState])]

})
export class UserModule { }
