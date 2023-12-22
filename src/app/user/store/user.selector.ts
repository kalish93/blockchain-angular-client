import { createPickSelector, createSelector, Selector } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';
import { UserResponse } from '../models/user-response';

export class UserSelector {
  static authState = createSelector(
    [UserState],
    (state: UserStateModel) => state,
  );

  @Selector([UserState])
  static user(state: UserStateModel): UserResponse | null {
    return state.user;
  }
}
