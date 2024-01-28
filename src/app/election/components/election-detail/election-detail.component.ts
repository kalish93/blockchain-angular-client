import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '../../services/blockchain.service';
import { ConfirmDialogComponent } from '../../../shared/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { ElectionFacade } from '../../facades/election.facade';

interface ElectionDetailComponentState {
  electionDetail: any;
}

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrl: './election-detail.component.scss',
  providers: [RxState],
})
export class ElectionDetailComponent {
  electionId: string | undefined;
  electionDetail: any;
  electionDetail$ = this.state.select('electionDetail');

  constructor(
    private route: ActivatedRoute,
    private electionFacade: ElectionFacade,
    private dialog: MatDialog,
    private state: RxState<ElectionDetailComponentState>
  ) { 
    this.state.set({electionDetail: {}});
    this.state.connect('electionDetail', this.electionFacade.electionDetail$);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.electionId = params['id'];
      if(this.electionId){
        this.electionFacade.dispatchGetElectionDetail(this.electionId);
      }
    });

    this.electionDetail$.subscribe((electionDetail) => {
      console.log("electionDetail",electionDetail);
      this.electionDetail = electionDetail;
    });
  }

  // async loadElectionDetails() {
  //   try {
  //     if(this.electionId){
  //       this.election = await this.blockchainService.getSingleElection(this.electionId);
  //     }

  //   } catch (e) {
  //     console.error('Error loading election details:', e);
  //   }
  // }

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
            // this.election = await this.blockchainService.voteForCandidate(this.electionId, id);
            this.electionFacade.dispatchVoteForCandidate(this.electionId, id);
            console.log('Vote successful!', this.electionId,this);
          }
        } catch (e) {
          console.error('Error voting:', e);
        }
      }
    });
  }
}
