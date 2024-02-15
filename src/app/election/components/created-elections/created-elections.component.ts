import { Component } from '@angular/core';
import { SIDE_DIALOG_CONFIG } from '../../../core/constants/dialog-config';
import { CreateElectionDialogComponent } from '../create-election-dialog/create-election-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-created-elections',
  templateUrl: './created-elections.component.html',
  styleUrl: './created-elections.component.scss',
})
export class CreatedElectionsComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(
      CreateElectionDialogComponent,
      {
        data: {
          organizationId: '',
        },
        ...SIDE_DIALOG_CONFIG,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
