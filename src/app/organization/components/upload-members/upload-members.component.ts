import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationFacade } from '../../facades/organizations.facades';

@Component({
  selector: 'app-upload-members',
  templateUrl: './upload-members.component.html',
  styleUrl: './upload-members.component.scss'
})
export class UploadMembersComponent {
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UploadMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { organizationId: string },
    private organizationFacade: OrganizationFacade
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    this.organizationFacade.dispatchUploadMembers(this.selectedFile as File, this.data.organizationId)
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
