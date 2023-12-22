import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { AuthFacade } from '../../facades/auth.facade';
import { ELECTION_HOME } from '../../../core/constants/routes';

interface LoginComponentState {
  isAuthenticated: boolean;
  isPasswordVisible: boolean;
}

const initLoginComponentState: Partial<LoginComponentState> = {
  isAuthenticated: true,
  isPasswordVisible: true,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RxState],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');

  constructor(
    private fb: NonNullableFormBuilder,
    private authFacade: AuthFacade,
    private state: RxState<LoginComponentState>,
    private router: Router,
  ) {
    this.state.set(initLoginComponentState);
    this.state.connect('isAuthenticated', authFacade.isAuthenticated$);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((result) => {
      if (result) {
        this.router.navigate([ELECTION_HOME]);
      }
    });
  }

  get emailValidationError() {
    return this.loginForm.controls.email;
  }
  get passwordValidationError() {
    return this.loginForm.controls.password;
  }

  get isPasswordVisible() {
    const { isPasswordVisible } = this.state.get();
    return isPasswordVisible;
  }

  togglePasswordVisibility() {
    const { isPasswordVisible } = this.state.get();
    this.state.set({ isPasswordVisible: !isPasswordVisible });
  }

  login() {
    const { valid, touched, dirty } = this.loginForm;

    if (
      valid &&
      (touched || dirty) &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      this.authFacade.dispatchLogin({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      });
    }
  }
}
