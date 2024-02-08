import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { MatDialog } from '@angular/material/dialog';
import { Organization } from '../../models/organization.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationFacade } from '../../facades/organizations.facades';

@Component({
  selector: 'app-create-organization-dialog',
  templateUrl: './create-organization-dialog.component.html',
  styleUrl: './create-organization-dialog.component.scss',
  providers: [RxState],

})
export class CreateOrganizationDialogComponent {
  organizationForm:FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private organizationFacade: OrganizationFacade,
  ){
    this.organizationForm = this.fb.group({
      name: ['',[Validators.required]],
      shortName: ['',[Validators.required]],
    });
    }

  createOrganization(){
    const { valid, touched, dirty } = this.organizationForm;
    if(valid && (touched || dirty)){
      const organization:Organization = {
        name: this.organizationForm.value.name,
        shortName: this.organizationForm.value.shortName,
      }

      this.organizationFacade.dispatchCreateOrganization(organization);
      this.dialog.closeAll();
    }

  }

}
