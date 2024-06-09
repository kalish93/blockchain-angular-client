import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { RESET_PASSWORD_ROUTE } from '../../../core/constants/routes';
import { Store } from '@ngxs/store';
import { UserService } from '../../services/user.service';
import { SetProgressOff, SetProgressOn } from '../../../core/store/progress-status.actions';
import { OperationStatusService } from '../../../core/services/operation-status.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers: [RxState],

})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private userService: UserService,
    private oprationStatus: OperationStatusService,
  ) {
    this.forgetPasswordForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
    });
   }

   forgetPassword(){
    const { valid, touched, dirty } = this.forgetPasswordForm;
    if (
      valid &&
      (touched || dirty) &&
      this.forgetPasswordForm.value.email
    ) {

      this.store.dispatch(new SetProgressOn());
      this.userService.forgetPassword(this.forgetPasswordForm.value.email).subscribe(
       {
          next: (result) => {
            this.store.dispatch(new SetProgressOff());
            this.oprationStatus.displayStatus('Reset password link sent to your email');
            this.router.navigate([RESET_PASSWORD_ROUTE]);
          },
          error: (error) => {
            this.store.dispatch(new SetProgressOff());
            this.oprationStatus.displayStatus('Error in sending reset password link');
          }
       }
      );

    }
  }
}
