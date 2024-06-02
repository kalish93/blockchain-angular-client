import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserResponse } from '../../models/user-response';
import { UserRole } from '../../../core/constants/user-types';
import { AbstractControl, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserFacade } from '../../facades/users.facades';
import { RxState } from '@rx-angular/state';
import { Roles } from '../../../core/constants/roles';

interface RegisterComponentState {
  isPasswordVisible: boolean;
  user: UserResponse;
  isConfirmPasswordVisible: boolean;
}

const initRegisterComponentState: Partial<RegisterComponentState> = {
  isPasswordVisible: true,
  isConfirmPasswordVisible: true,
  user: { email: '', id: '' },
};

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss'],
  providers: [RxState]
})
export class AdminRegistrationComponent {

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      userType: [Roles.ADMIN],
    },
    { validators: this.passwordMatchValidator() }
  );

  user$: Observable<UserResponse> = this.state.select('user');
  user: UserResponse | undefined = undefined;

  constructor(
    private fb: NonNullableFormBuilder,
    private userFacade: UserFacade,
    private state: RxState<RegisterComponentState>,
    private dialogRef: MatDialogRef<AdminRegistrationComponent>,
  ) {
    this.state.set(initRegisterComponentState);
    this.state.connect('user', userFacade.user$);
  }
  ngOnInit(): void {
    this.user$.subscribe((result) => {
      this.user = result;
    });

    this.registerForm.get('password')!.valueChanges.subscribe(() => {
      this.registerForm
        .get('confirmPassword')!
        .updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }

  get emailValidationError() {
    return this.registerForm.controls.email;
  }

  get passwordValidationError() {
    return this.registerForm.controls.password;
  }

  get isPasswordVisible() {
    const { isPasswordVisible } = this.state.get();
    return isPasswordVisible;
  }

  get isConfirmPasswordVisible() {
    const { isConfirmPasswordVisible } = this.state.get();
    return isConfirmPasswordVisible;
  }

  togglePasswordVisibility() {
    const { isPasswordVisible } = this.state.get();
    this.state.set({ isPasswordVisible: !isPasswordVisible });
  }

  toggleConfirmPasswordVisibility() {
    const { isConfirmPasswordVisible } = this.state.get();
    this.state.set({ isConfirmPasswordVisible: !isConfirmPasswordVisible });
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

  register() {
    const { valid, touched, dirty } = this.registerForm;

    if (
      valid &&
      (touched || dirty) &&
      this.registerForm.value.email &&
      this.registerForm.value.password
    ) {
      this.userFacade.dispatchRegister({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword!,
        role: Roles.ADMIN as any,
      });
    }
    this.dialogRef.close();
  }

}
