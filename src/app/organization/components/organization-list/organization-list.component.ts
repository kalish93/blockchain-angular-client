import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization.model';
import { OrganizationFacade } from '../../facades/organizations.facades';
import { RxState } from '@rx-angular/state';
import { Router } from '@angular/router';
import { ORGANIZATION_LIST } from '../../../core/constants/routes';

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
export class OrganizationListComponent implements OnInit {
  organizations$ = this.state.select('organizations');
  organizations: Organization[] = [];
  constructor(
    private state: RxState<OrganizationListComponentState>,
    private organizationFacade: OrganizationFacade,
    private router: Router
  ) {
    this.state.set(initOrganizationListComponentState);
    this.state.connect('organizations', this.organizationFacade.organizations$);
  }
  ngOnInit(): void {
    this.organizationFacade.dispatchGetOrganizations();
    this.organizations$.subscribe((organizations) => {
      this.organizations = organizations;
    });
  }

  organizationSelected(organization: Organization) {
    this.organizationFacade.dispatchSetSelectedOrganization(organization);
    this.router.navigate([`${ORGANIZATION_LIST}/${organization.id}`]);
  }
}
