import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateElectionDialogComponent } from '../create-election-dialog/create-election-dialog.component';
import { SIDE_DIALOG_CONFIG } from '../../../core/constants/dialog-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-election-home',
  templateUrl: './election-home.component.html',
  styleUrl: './election-home.component.scss',
})
export class ElectionHomeComponent {
  constructor(
    private blockService: BlockchainService,
    public dialog: MatDialog,
    private router: Router
  ) {}



  openDialog(): void {
    const dialogRef = this.dialog.open(
      CreateElectionDialogComponent,
      SIDE_DIALOG_CONFIG
    );

    dialogRef.afterClosed().subscribe((result) => {
      // ... handle result if dialog returns value
    });
  }

  selectCategory(category: any){
    this.router.navigate(['/election-list/categories', category]);
  }
}
