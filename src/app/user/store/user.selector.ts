import { createPickSelector, createSelector, Selector } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';
import { UserResponse } from '../models/user-response';
import { User } from '../models/user.model';

export class UserSelector {
  static authState = createSelector(
    [UserState],
    (state: UserStateModel) => state,
  );

  @Selector([UserState])
  static user(state: UserStateModel): UserResponse | null {
    return state.user;
  }

  @Selector([UserState])
  static users(state: UserStateModel): User[] {
    return state.users;
  }
}
