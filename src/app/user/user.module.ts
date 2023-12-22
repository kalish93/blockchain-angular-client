import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { UserState } from './store/user.state';
import { NgxsModule } from '@ngxs/store';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,NgxsModule.forFeature([UserState])]
    
})
export class UserModule { }
