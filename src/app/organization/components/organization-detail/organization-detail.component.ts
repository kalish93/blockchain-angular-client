import { Component } from '@angular/core';
import { OrganizationFacade } from '../../facades/organizations.facades';
import { Organization, OrganizationWithMembers } from '../../models/organization.model';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateMemberDialogComponent } from '../create-member-dialog/create-member-dialog.component';
import { SIDE_DIALOG_CONFIG } from '../../../core/constants/dialog-config';
import { CreateElectionDialogComponent } from '../../../election/components/create-election-dialog/create-election-dialog.component';
import { AuthFacade } from '../../../auth/facades/auth.facade';
import { jwtDecode } from 'jwt-decode';
import { Roles } from '../../../core/constants/roles';
import { OrganizationService } from '../../services/organization.service';
import { UploadMembersComponent } from '../upload-members/upload-members.component';
import { ElectionFacade } from '../../../election/facades/election.facade';
import { IMAGE_BASE_URL } from '../../../core/constants/api-endpoints';


interface OrganizationDetailComponentState {
  selectedOrganization: Organization | undefined;
  organizationDetial: OrganizationWithMembers | undefined;
  accessToken: any;
  organizationElections: any[];
}

const initOrganizationDetailComponentState: OrganizationDetailComponentState = {
  selectedOrganization: undefined,
  organizationDetial: undefined,
  accessToken: undefined,
  organizationElections: []
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

  organizationElections$ = this.state.select('organizationElections');
  organizationElections: any[] = [];

  accessToken$ = this.state.select('accessToken');
  decodedToken: any;
  selectedFile: File | null = null;

  imageBaseUrl = IMAGE_BASE_URL;
  constructor(
    private state: RxState<OrganizationDetailComponentState>,
    private organizationFacade: OrganizationFacade,
    private authFacade: AuthFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private service: OrganizationService,
    private electionFacade: ElectionFacade,
    private router: Router
  ) {
    this.state.set(initOrganizationDetailComponentState);
    this.state.connect(
      'organizationDetial',
      this.organizationFacade.organization$
    );
    this.state.connect(
      'selectedOrganization',
      this.organizationFacade.selectedOrganization$
    );
    this.state.connect('accessToken', this.authFacade.accessToken$);
    this.state.connect(
      'organizationElections',
      this.electionFacade.organizationElections$
    );
  }

  ngOnInit(): void {
    this.accessToken$.subscribe((token) => {
      this.decodedToken = jwtDecode(token);
    });
    this.route.params.subscribe((params) => {
      this.organizationFacade.dispatchGetOrganizationDetail(params['id']);
      this.electionFacade.dispatchGetOrganizationElections(params['id']);
    });
    this.organizationDetial$.subscribe((og) => {
      this.organization = og;
    });
    this.selectedOrganization$.subscribe((og) => {
      this.selectedOrganization = og;
    });

    this.organizationElections$.subscribe((elections) => {
      this.organizationElections = elections;
    });
  }

  openCreateMemberDialog() {
    this.dialog.open(CreateMemberDialogComponent);
  }

  openCreateElectionDialog(): void {
    const dialogRef = this.dialog.open(CreateElectionDialogComponent, {
      data: {
        organizationId: this.selectedOrganization?.id,
      },
    });

    dialogRef.afterClosed();
  }
  openFileUploadDialog() {
    const dialogRef = this.dialog.open(UploadMembersComponent, {
      width: '400px',
      data: { organizationId: this.selectedOrganization?.id },
    });
  }

  downloadCsvTemplate() {
    this.service.downloadTemplateCsv();
  }
  downloadXlsxTemplate() {
    this.service.downloadTemplateXlsx();
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/election-list', id]);
  }
}
