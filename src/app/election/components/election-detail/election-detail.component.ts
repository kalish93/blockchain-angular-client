import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '../../services/blockchain.service';
import { ConfirmDialogComponent } from '../../../shared/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrl: './election-detail.component.scss'
})
export class ElectionDetailComponent {
  electionId: string | undefined;
  election: any;

  constructor(
    private route: ActivatedRoute,
    private blockchainService: BlockchainService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.electionId = params['id'];
      this.loadElectionDetails();
    });
  }

  async loadElectionDetails() {
    try {
      if(this.electionId){
        this.election = await this.blockchainService.getSingleElection(this.electionId);
      }

    } catch (e) {
      console.error('Error loading election details:', e);
    }
  }

  async voteForCandidate(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Voting',
        message: 'Are you sure you want to vote for this candidate? You cannot change your choice once you vote!',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 'confirm') {
        try {
          if (this.electionId) {
            this.election = await this.blockchainService.voteForCandidate(this.electionId, id);
            console.log('Vote successful!', this.electionId,this);
          }
        } catch (e) {
          console.error('Error voting:', e);
        }
      }
    });
  }

}
