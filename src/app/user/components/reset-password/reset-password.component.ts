import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserFacade } from '../../facades/users.facades';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { LOGIN_ROUTE } from '../../../core/constants/routes';
import { UserService } from '../../services/user.service';
import { OperationStatusService } from '../../../core/services/operation-status.service';
import { SetProgressOff, SetProgressOn } from '../../../core/store/progress-status.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [RxState],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isPasswordVisible: boolean = true;
  isConfirmPasswordVisible: boolean = true;

  constructor(
    private fb: FormBuilder,
    private oprationStatus: OperationStatusService,
    private userService: UserService,
    private router: Router,
    private store: Store,

  ) {
    this.resetPasswordForm = this.fb.group(
      {
      email: ['',[Validators.required, Validators.email]],
      otp: ['',[Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator() }
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password && confirmPassword && password === confirmPassword
        ? null
        : { mismatch: true };
    };
  }

  resetPassword(){
    const { valid, touched, dirty } = this.resetPasswordForm;
    if (
      valid &&
      (touched || dirty) &&
      this.resetPasswordForm.value.email &&
      this.resetPasswordForm.value.otp &&
      this.resetPasswordForm.value.password &&
      this.resetPasswordForm.value.confirmPassword
    ) {
      this.store.dispatch(new SetProgressOn());
      this.userService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (response) => {
          this.store.dispatch(new SetProgressOff());
          this.oprationStatus.displayStatus('Password reset successfully');
          this.router.navigate([LOGIN_ROUTE]);
        },
        error: (error) => {
          this.store.dispatch(new SetProgressOff());
          this.oprationStatus.displayStatus(error.error.message);
        }
      })
    }
  }
}
