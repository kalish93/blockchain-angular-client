import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectionFacade } from '../../facades/election.facade';
import { RxState } from '@rx-angular/state';
import { AuthFacade } from '../../../auth/facades/auth.facade';
import { jwtDecode } from 'jwt-decode';


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
        private state: RxState<ElectionsListComponentState>
        ) {
          this.state.set(initialElectionsListComponentState);
          this.state.connect('elections', this.electionFacade.elections$);
          this.state.connect('personalizedElections', this.electionFacade.personalizedElections$);
          this.state.connect('accessToken', this.authFacade.accessToken$);
        }

  ngOnInit(): void {
    // this.electionFacade.dispatchGetAllElections();
    // this.elections$.subscribe((elections) => {
    //   console.log(elections);
    //   this.elections = elections;
    // });
    this.accessToken$.subscribe((token)=>{
      this.decodedToken = jwtDecode(token);
      this.decodedToken.organizations.forEach((organization: { id: any; }) => {
        return this.organizationIds.push(organization.id as never);
      });
    })
    this.electionFacade.dispatchGetPersonalizedElections(this.organizationIds)
    this.personalizedElections$.subscribe((elections)=>{
      this.elections = elections
    })
  }


  navigateToDetail(id: string) {
    this.router.navigate(['/election-list', id]);
  }
}
