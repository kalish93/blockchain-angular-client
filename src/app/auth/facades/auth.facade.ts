import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login, Logout } from '../store/auth.actions';
import { AuthSelector } from '../store/auth.selector';
import { LoginRequest } from '../models/login-request';
import { CurrentUser } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean> = this.store.select(
    AuthSelector.isAuthenticated,
  );

  @Select(AuthSelector.accessToken)
  accessToken$!: Observable<string>;

  @Select(AuthSelector.refreshToken)
  refreshToken$!: Observable<string>;

  @Select(AuthSelector.currentUser)
  currentUser$!: Observable<CurrentUser>;

  constructor(private store: Store) {}

  dispatchLogin(request: LoginRequest) {
    this.store.dispatch(new Login(request));
  }

  dispatchLogout() {
    this.store.dispatch(new Logout());
  }
}
