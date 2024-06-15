import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectionFacade } from '../../facades/election.facade';
import { RxState } from '@rx-angular/state';
import { AuthFacade } from '../../../auth/facades/auth.facade';
import { jwtDecode } from 'jwt-decode';
import { Roles } from '../../../core/constants/roles';
import { MatDialog } from '@angular/material/dialog';
import { CreateElectionDialogComponent } from '../create-election-dialog/create-election-dialog.component';


interface ElectionsListComponentState {
  elections: any[];
  personalizedElections: any[];
  accessToken: any;
}

const initialElectionsListComponentState: ElectionsListComponentState = {
  elections: [],
  personalizedElections:[],
  accessToken: undefined
};


@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrl: './elections-list.component.scss',
  providers: [RxState],
})
export class ElectionsListComponent implements OnInit{
    elections: any[] = [];
    elections$ = this.state.select('elections');

    personalizedElections: any[] = [];
    personalizedElections$ = this.state.select('personalizedElections');

    accessToken$ = this.state.select('accessToken');
    decodedToken: any;
    organizationIds = [];
  constructor(
        private electionFacade: ElectionFacade,
        private authFacade: AuthFacade,
        private router: Router,
        private state: RxState<ElectionsListComponentState>,
        private dialog: MatDialog
        ) {
          this.state.set(initialElectionsListComponentState);
          this.state.connect('elections', this.electionFacade.elections$);
          this.state.connect('personalizedElections', this.electionFacade.personalizedElections$);
          this.state.connect('accessToken', this.authFacade.accessToken$);
        }

  ngOnInit(): void {

    this.accessToken$.subscribe((token)=>{
    this.decodedToken = jwtDecode(token);

    this.electionFacade.dispatchGetPersonalizedElections(this.decodedToken.organizations);
    this.personalizedElections$.subscribe((elections)=>{
      this.elections = elections
    })
  })
  }


  navigateToDetail(id: string) {
    this.router.navigate(['/election-list', id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      CreateElectionDialogComponent,
      {
        data: {
          organizationId: '',
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  hasElectionCreatorRole(){
    return Roles.ELECTION_CREATOR
  }

  hasAdminRole(){
    return Roles.ADMIN
  }

  transformEnum(value: string): string {
    return value
      .toLowerCase()                        // Convert to lowercase
      .replace(/_/g, ' ')                   // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
  }
}
