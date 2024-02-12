import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from '../../facades/users.facades';
import { VerifyUserEmailRequest } from '../../models/user-request';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '../../../core/constants/routes';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
  providers: [RxState],
})
export class VerifyEmailComponent {
  verifyEmailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacade,
    private router: Router
  ){
    this.verifyEmailForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      otp: ['',[Validators.required]],
    });
  }

  verifyEmail(){
    const { valid, touched, dirty } = this.verifyEmailForm;
    if (
      valid &&
      (touched || dirty) &&
      this.verifyEmailForm.value.email &&
      this.verifyEmailForm.value.otp
    ) {
      const request: VerifyUserEmailRequest = {
        email: this.verifyEmailForm.value.email,
        otp: this.verifyEmailForm.value.otp,
      };
      this.userFacade.dispatchVerifyEmail(request);
      this.router.navigate([LOGIN_ROUTE]);
    }
  }

}
