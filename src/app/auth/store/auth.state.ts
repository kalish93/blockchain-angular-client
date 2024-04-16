import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Login, Logout } from './auth.actions';
import { LoginResponse, CurrentUser } from '../models/login-response';
import { SetProgressOff, SetProgressOn } from '../../core/store/progress-status.actions';
import { OperationStatusService } from '../../core/services/operation-status.service';
import { successStyle } from '../../core/services/status-style-names';

export interface AuthStateModel {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  username: string | null;
  currentUser: CurrentUser | null;
}

const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('authState');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    accessToken: null,
    refreshToken: null,
    username: null,
    email: null,
    currentUser: null,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthenticationService,
    private oprationStatus: OperationStatusService,
    private store: Store,
  ) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { request }: Login) {
    this.store.dispatch(new SetProgressOn());
    return this.authService.login(request).pipe(
      tap((result: LoginResponse) => {
        patchState({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          email: result.user.email,
          // username: result.user.username,
          currentUser: result.user,
        });
        this.oprationStatus.displayStatus('logged in successfully', successStyle)
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        setState({
          accessToken: null,
          refreshToken: null,
          username: null,
          email: null,
          currentUser: null,
        });
      }),
    );
  }
}
