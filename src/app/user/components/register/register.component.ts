import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { UserResponse } from '../../models/user-response';
import { UserFacade } from '../../facades/users.facades';
import { Observable } from 'rxjs';
import { LOGIN_ROUTE, VERIFY_EMAIL_ROUTE } from '../../../core/constants/routes';
import { UserRole } from '../../../core/constants/user-types';

interface RegisterComponentState {
  isPasswordVisible: boolean;
  user: UserResponse;
  isConfirmPasswordVisisble: boolean;
}

const initRegisterComponentState: Partial<RegisterComponentState> = {
  isPasswordVisible: true,
  user: { email: '', id: '' },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [RxState],
})
export class RegisterComponent implements OnInit {
  userType = UserRole;
  selectedUserType: UserRole = UserRole.ELECTOR;

  // passwordMatchValidator: ValidatorFn = (
  //   control: AbstractControl
  // ): { [key: string]: any } | null => {
  //   const password = control.get('password')?.value;
  //   const confirmPassword = control.get('confirmPassword')?.value;
  //   return password && confirmPassword && password === confirmPassword
  //     ? null
  //     : { mismatch: true };
  // };

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      userType: [this.selectedUserType],
    },
    { validators: this.passwordMatchValidator() }
  );

  user$: Observable<UserResponse> = this.state.select('user');
  user: UserResponse | undefined = undefined;

  constructor(
    private fb: NonNullableFormBuilder,
    private userFacade: UserFacade,
    private state: RxState<RegisterComponentState>,
    private router: Router
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
    const { isConfirmPasswordVisisble } = this.state.get();
    return isConfirmPasswordVisisble;
  }

  togglePasswordVisibility() {
    const { isPasswordVisible } = this.state.get();
    this.state.set({ isPasswordVisible: !isPasswordVisible });
  }

  toggleConfirmPasswordVisibility() {
    const { isConfirmPasswordVisisble } = this.state.get();
    this.state.set({ isConfirmPasswordVisisble: !isConfirmPasswordVisisble });
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
        role: this.registerForm.value.userType!,
      });
      this.router.navigate([VERIFY_EMAIL_ROUTE]);
    }
  }

  navigateToLogin() {
    this.router.navigate([LOGIN_ROUTE]);
  }
}
