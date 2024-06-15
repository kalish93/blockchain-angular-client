import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectionFacade } from '../../facades/election.facade';
import { AuthFacade } from '../../../auth/facades/auth.facade';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { jwtDecode } from 'jwt-decode';
import { ElectionCategory } from '../../models/election.model';

interface ElectionsListComponentState {
  elections: any[];
  personalizedElections: any[];
  accessToken: any;
}

const initialElectionsListComponentState: ElectionsListComponentState = {
  elections: [],
  personalizedElections: [],
  accessToken: undefined,
};

@Component({
  selector: 'app-categorized-elections',
  templateUrl: './categorized-elections.component.html',
  styleUrls: ['./categorized-elections.component.scss'],
  providers: [RxState],
})
export class CategorizedElectionsComponent implements OnInit {
  elections: any[] = [];
  elections$ = this.state.select('elections');

  personalizedElections: any[] = [];
  personalizedElections$ = this.state.select('personalizedElections');

  accessToken$ = this.state.select('accessToken');
  decodedToken: any;
  organizationIds: any[] = [];
  category: string = '';
  title: string = '';
  constructor(
    private electionFacade: ElectionFacade,
    private authFacade: AuthFacade,
    private router: Router,
    private route: ActivatedRoute,
    private state: RxState<ElectionsListComponentState>,
  ) {
    this.state.set(initialElectionsListComponentState);
    this.state.connect('elections', this.electionFacade.elections$);
    this.state.connect('personalizedElections', this.electionFacade.personalizedElections$);
    this.state.connect('accessToken', this.authFacade.accessToken$);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.filterByCategory(this.category);
      this.extractTitle(this.category);
    });

    this.accessToken$.subscribe((token) => {
      this.decodedToken = jwtDecode(token);
      this.electionFacade.dispatchGetPersonalizedElections(this.decodedToken.organizations);
      this.personalizedElections$.subscribe((elections) => {
        this.elections = elections;
        this.filterByCategory(this.category);
      });
    });
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/election-list', id]);
  }

  transformEnum(value: string): string {
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;

    if (!filterValue) {
      this.electionFacade.dispatchGetPersonalizedElections(this.organizationIds);
      this.filterByCategory(this.category);
    } else {
      const trimmedFilterValue = filterValue.trim().toLowerCase();
      this.elections = this.elections.filter((election) =>
        election.electionName.toLowerCase().includes(trimmedFilterValue)
      );
    }
  }

  filterByCategory(category: string) {
    if (category) {
      this.elections = this.elections.filter(election => election.category.toLowerCase() === category.toLowerCase());
    } else {
      this.elections = [...this.elections];
    }
  }

  extractTitle(category: any){
    if(category === ElectionCategory.ENTERTAINMENT_AWARD){
      this.title = 'Entertainment Awards';
    }else if(category === ElectionCategory.GOVERNMENT_ELECTION){
      this.title = 'Government Elections'
    }else if(category === ElectionCategory.SPORT_AWARD){
      this.title = 'Sport Awards'
    }else{
      this.title = 'Others'
    }
  }
}
