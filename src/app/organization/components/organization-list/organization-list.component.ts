import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization.model';
import { OrganizationFacade } from '../../facades/organizations.facades';
import { RxState } from '@rx-angular/state';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrganizationDialogComponent } from '../create-organization-dialog/create-organization-dialog.component';
import { SIDE_DIALOG_CONFIG } from '../../../core/constants/dialog-config';
import { Router } from '@angular/router';
import { ORGANIZATION_LIST } from '../../../core/constants/routes';
import { filter, startWith } from 'rxjs';

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
  providers: [RxState],
})
export class OrganizationListComponent implements OnInit {
  organizations$ = this.state.select('organizations').pipe(
    filter((organizations) => organizations !== null), // Filter out null values
    startWith([] as Organization[]) // Provide an empty array as the initial value
  );
  organizations: Organization[] = [];
  displayedColumns: string[] = ['fullName', 'shortName', 'status'];
  constructor(
    private state: RxState<OrganizationListComponentState>,
    private organizationFacade: OrganizationFacade,
    private dialog: MatDialog,
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

  editOrganization(event: MouseEvent, organization: Organization) {
    event.stopPropagation(); // Prevent the event from bubbling up to the row click
    // Handle edit logic here
  }

  deleteOrganization(event: MouseEvent, organization: Organization) {
    event.stopPropagation(); // Prevent the event from bubbling up to the row click
    // Handle delete logic here
  }

  organizationSelected(organization: Organization) {
    this.organizationFacade.dispatchSetSelectedOrganization(organization);
    this.router.navigate([`${ORGANIZATION_LIST}/${organization.id}`]);
  }
  openCreateOrganizationDialog() {
    this.dialog.open(CreateOrganizationDialogComponent, SIDE_DIALOG_CONFIG);
  }
}
