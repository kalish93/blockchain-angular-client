import { Component } from '@angular/core';
import { OrganizationFacade } from '../../facades/organizations.facades';
import { Organization, OrganizationWithMembers } from '../../models/organization.model';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateMemberDialogComponent } from '../create-member-dialog/create-member-dialog.component';
import { SIDE_DIALOG_CONFIG } from '../../../core/constants/dialog-config';
import { CreateElectionDialogComponent } from '../../../election/components/create-election-dialog/create-election-dialog.component';


interface OrganizationDetailComponentState {
  selectedOrganization: Organization | undefined;
  organizationDetial: OrganizationWithMembers | undefined;
}

const initOrganizationDetailComponentState: OrganizationDetailComponentState = {
  selectedOrganization: undefined,
  organizationDetial: undefined,
};

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrl: './organization-detail.component.scss',
  providers: [RxState],
})
export class OrganizationDetailComponent {
  selectedOrganization$ = this.state.select('selectedOrganization');
  organizationDetial$ = this.state.select('organizationDetial');
  selectedOrganization: Organization | undefined = undefined;
  organization: OrganizationWithMembers | undefined = undefined;
  constructor(
    private state: RxState<OrganizationDetailComponentState>,
    private organizationFacade: OrganizationFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.state.set(initOrganizationDetailComponentState);
    this.state.connect('organizationDetial', this.organizationFacade.organization$);
    this.state.connect('selectedOrganization', this.organizationFacade.selectedOrganization$);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.organizationFacade.dispatchGetOrganizationDetail(
        params['id']
      );
    })
    this.organizationDetial$.subscribe((og) => {
      this.organization = og;
    });
    this.selectedOrganization$.subscribe((og) => {
      this.selectedOrganization = og;
    }
    );
  }

  openCreateMemberDialog() {
    this.dialog.open(CreateMemberDialogComponent, SIDE_DIALOG_CONFIG);

  }

  openCreateElectionDialog(): void {
    const dialogRef = this.dialog.open(
      CreateElectionDialogComponent,
      {
        data: {
          organizationId: this.selectedOrganization?.id,
        },
        ...SIDE_DIALOG_CONFIG,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}