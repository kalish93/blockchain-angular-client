import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateElectionDialogComponent } from '../create-election-dialog/create-election-dialog.component';
import { SIDE_DIALOG_CONFIG } from '../../../core/constants/dialog-config';

@Component({
  selector: 'app-election-home',
  templateUrl: './election-home.component.html',
  styleUrl: './election-home.component.scss',
})
export class ElectionHomeComponent {
  constructor(
    private blockService: BlockchainService,
    public dialog: MatDialog
  ) {}


  
  openDialog(): void {
    const dialogRef = this.dialog.open(
      CreateElectionDialogComponent,
      SIDE_DIALOG_CONFIG
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // ... handle result if dialog returns value
    });
  }
}
