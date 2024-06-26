import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { UserService} from '../services/user.service';
import {  GetUsers, Register, VerifyUserEmail, ForgetPassword, ResetPassword} from './user.actions';
import { UserResponse} from '../models/user-response';
import { SetProgressOff, SetProgressOn } from '../../core/store/progress-status.actions';
import { successStyle } from '../../core/services/status-style-names';
import { OperationStatusService } from '../../core/services/operation-status.service';
import { User } from '../models/user.model';

export interface UserStateModel {
    user : UserResponse | null,
    users: User[]
}

const USER_STATE_TOKEN = new StateToken<UserStateModel>('userState');

@State<UserStateModel>({
  name: USER_STATE_TOKEN,
  defaults: {
    user : null,
    users: []
  },
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService,
    private store: Store,
    private oprationStatus: OperationStatusService
  ) {}

  @Action(Register)
  register({setState, patchState }: StateContext<UserStateModel>, { request }: Register) {
    this.store.dispatch(new SetProgressOn());
    return this.userService.register(request).pipe(
      tap((result:UserResponse) => {
        patchState({
           user : result
        });
        this.store.dispatch(new GetUsers());
        this.oprationStatus.displayStatus('User registered successfully', successStyle)
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }

  @Action(VerifyUserEmail)
  verifyEmail({patchState }: StateContext<UserStateModel>, { request }: VerifyUserEmail) {
    this.store.dispatch(new SetProgressOn());
    return this.userService.verifyEmail(request).pipe(
      tap((result:UserResponse) => {
        patchState({
           user : result
        });
        this.oprationStatus.displayStatus('User email verified successfully', successStyle)
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }

  @Action(GetUsers)
  getUsers({patchState }: StateContext<UserStateModel>) {
    this.store.dispatch(new SetProgressOn());
    return this.userService.getUsers().pipe(
      tap((result) => {
        patchState({
           users : result
        });
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }

  @Action(ForgetPassword)
  forgetPassword({patchState }: StateContext<UserStateModel>, { email }: ForgetPassword) {
    this.store.dispatch(new SetProgressOn());
    return this.userService.forgetPassword(email).pipe(
      tap(() => {
        this.oprationStatus.displayStatus('Password reset email sent successfully', successStyle)
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }

  @Action(ResetPassword)
  resetPassword({patchState }: StateContext<UserStateModel>, { request }: ResetPassword) {
    this.store.dispatch(new SetProgressOn());
    return this.userService.resetPassword(request).pipe(
      tap((result:User) => {
        this.oprationStatus.displayStatus('Password reset successfully', successStyle)
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }
}
