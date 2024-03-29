import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { UserService} from '../services/user.service';
import {  Register, VerifyUserEmail} from './user.actions';
import { UserResponse} from '../models/user-response';
import { SetProgressOff, SetProgressOn } from '../../core/store/progress-status.actions';
import { successStyle } from '../../core/services/status-style-names';
import { OperationStatusService } from '../../core/services/operation-status.service';

export interface UserStateModel {
    user : UserResponse | null,
}

const USER_STATE_TOKEN = new StateToken<UserStateModel>('userState');

@State<UserStateModel>({
  name: USER_STATE_TOKEN,
  defaults: {
    user : null
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
}
