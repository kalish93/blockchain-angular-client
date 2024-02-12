import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { UserState } from './store/user.state';
import { NgxsModule } from '@ngxs/store';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';



@NgModule({
  declarations: [RegisterComponent,VerifyEmailComponent],
  imports: [
    SharedModule,NgxsModule.forFeature([UserState])]
    
})
export class UserModule { }
