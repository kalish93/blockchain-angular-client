import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserFacade } from '../../facades/users.facades';
import { RxState } from '@rx-angular/state';
import { Roles } from '../../../core/constants/roles';
import { AdminRegistrationComponent } from '../admin-registration/admin-registration.component';
import { MatDialog } from '@angular/material/dialog';

interface UsersListComponentState {
  users: User[]
}

const initUsersListComponentState : UsersListComponentState = {
  users: []
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [RxState]
})
export class UsersListComponent implements OnInit{
  users$ = this.state.select('users');
  users: User[] = [];

  constructor(
    private userFacade: UserFacade,
    private state: RxState<UsersListComponentState>,
    private dialog: MatDialog
  ) {
    this.state.set(initUsersListComponentState);
    this.state.connect('users', this.userFacade.users$);
  }
  ngOnInit(): void {
    this.userFacade.dispatchGetUsers();
    this.users$.subscribe((users)=>{
      this.users = users;
    })
  }

  hasAdminRole(){
    return Roles.ADMIN
  }

  getRole(role: any){
    if(role === Roles.ADMIN){
      return 'Admin'
    }else if(role === Roles.ELECTION_CREATOR){
      return 'Election Creator'
    }else{
      return 'Elector'
    }
  }

  openCreateAdminDialog(): void {
    const dialogRef = this.dialog.open(
      AdminRegistrationComponent,
    );

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
