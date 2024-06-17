import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMAGE_BASE_URL } from '../../../core/constants/api-endpoints';

@Component({
  selector: 'app-candidate-description-dialog',
  templateUrl: './candidate-description-dialog.component.html',
  styleUrl: './candidate-description-dialog.component.scss',
})
export class CandidateDescriptionDialogComponent {
  imageBaseUrl = IMAGE_BASE_URL;
  constructor(
    public dialogRef: MatDialogRef<CandidateDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
