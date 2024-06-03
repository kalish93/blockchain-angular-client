import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-description-dialog',
  templateUrl: './candidate-description-dialog.component.html',
  styleUrl: './candidate-description-dialog.component.scss',
})
export class CandidateDescriptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CandidateDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
