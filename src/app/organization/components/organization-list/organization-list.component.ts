import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization.model';
import { OrganizationFacade } from '../../facades/organizations.facades';
import { RxState } from '@rx-angular/state';

interface OrganizationListComponentState {
  organizations: Organization[]
}

const initOrganizationListComponentState: OrganizationListComponentState = {
  organizations: []
}
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss',
})
export class OrganizationListComponent implements OnInit{

  organizations$ = this.state.select('organizations');
  organizations: Organization[] = [];
  constructor(
    private state: RxState<OrganizationListComponentState>,
    private organizationFacade: OrganizationFacade
  ){
    this.state.set(initOrganizationListComponentState);
    this.state.connect('organizations', this.organizationFacade.organizations$);
  }
  ngOnInit(): void {
    this.organizationFacade.dispatchGetOrganizations();
    this.organizations$.subscribe((organizations)=>{
      this.organizations = organizations;
    })
  }
}
