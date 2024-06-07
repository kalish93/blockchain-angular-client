import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsers, Register, VerifyUserEmail } from '../store/user.actions';
import { UserSelector } from '../store/user.selector';
import { UserRequest, VerifyUserEmailRequest} from '../models/user-request';
import { UserResponse } from '../models/user-response';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {


  @Select(UserSelector.user)
  user$!: Observable<UserResponse>;

  @Select(UserSelector.users)
  users$!: Observable<User[]>;

  constructor(private store: Store) {}

  dispatchRegister(request: UserRequest) {
    this.store.dispatch(new Register(request));
  }

  dispatchVerifyEmail(request: VerifyUserEmailRequest) {
    this.store.dispatch(new VerifyUserEmail(request));
  }

  dispatchGetUsers() {
    this.store.dispatch(new GetUsers());
  }
}
