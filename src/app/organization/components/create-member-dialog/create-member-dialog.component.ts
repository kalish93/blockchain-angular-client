import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { MatDialog } from '@angular/material/dialog';
import { Member, Organization } from '../../models/organization.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationFacade } from '../../facades/organizations.facades';

interface CreateOrganizationDialogComponentState {
  selectedOrganization: Organization | undefined;
}

const initCreateOrganizationDialogComponentState: CreateOrganizationDialogComponentState = {
  selectedOrganization: undefined,
};

@Component({
  selector: 'app-create-member-dialog',
  templateUrl: './create-member-dialog.component.html',
  styleUrl: './create-member-dialog.component.scss',
  providers: [RxState],
})
export class CreateMemberDialogComponent {
  selectedOrganization$ = this.state.select('selectedOrganization');
  selectedOrganization: Organization | undefined;
  organizationForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private organizationFacade: OrganizationFacade,
    private state: RxState<CreateOrganizationDialogComponentState>
  ) {
    this.state.set(initCreateOrganizationDialogComponentState);
    this.state.connect('selectedOrganization', this.organizationFacade.selectedOrganization$);
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.selectedOrganization$.subscribe((organization) => {
      this.selectedOrganization = organization;
    });
  }

  createMember() {
    const { valid, touched, dirty } = this.organizationForm;
    if (valid && (touched || dirty) && this.selectedOrganization?.id) {
      const member: Member = {
        name: this.organizationForm.value.name,
        email: this.organizationForm.value.email,
        organizationId: this.selectedOrganization?.id,
      };

      this.organizationFacade.dispatchCreateMember(member);
      this.organizationFacade.dispatchGetOrganizationDetail(member.organizationId)
      this.dialog.closeAll();
    }
  }


}
