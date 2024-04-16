import { createPickSelector, createSelector, Selector } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';
import { CurrentUser } from '../models/login-response';

export class AuthSelector {
  static authState = createSelector(
    [AuthState],
    (state: AuthStateModel) => state,
  );

  static tokens = createPickSelector(this.authState, [
    'accessToken',
    'refreshToken',
  ]);

  @Selector([AuthState])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }

  @Selector([AuthState])
  static accessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }

  @Selector([AuthState])
  static refreshToken(state: AuthStateModel): string | null {
    return state.refreshToken;
  }

  @Selector([AuthState])
  static currentUser(state: AuthStateModel):CurrentUser | null {
    return state.currentUser;
  }
}
