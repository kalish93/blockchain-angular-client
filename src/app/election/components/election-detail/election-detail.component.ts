import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '../../services/blockchain.service';
import { ConfirmDialogComponent } from '../../../shared/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { ElectionFacade } from '../../facades/election.facade';
import { AuthFacade } from '../../../auth/facades/auth.facade';
import { jwtDecode } from 'jwt-decode';

interface ElectionDetailComponentState {
  electionDetail: any;
  accessToken: string;
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
  accessToken: string | null = null;
  accessToken$ = this.state.select('accessToken');
  decodedToken : any;
  constructor(
    private route: ActivatedRoute,
    private electionFacade: ElectionFacade,
    private authFacade: AuthFacade,
    private dialog: MatDialog,
    private state: RxState<ElectionDetailComponentState>
  ) {
    this.state.set({electionDetail: {}});
    this.state.connect('electionDetail', this.electionFacade.electionDetail$);
    this.state.connect('accessToken', this.authFacade.accessToken$);
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

    this.accessToken$.subscribe((token)=>{
      this.accessToken = token
      this.decodedToken = jwtDecode(token);
    })
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
            // this.election = await this.blockchainService.voteForCandidate(this.electionId, id);
            this.electionFacade.dispatchVoteForCandidate(this.decodedToken.id, this.electionId, id);
            console.log('Vote successful!', this.electionId,this);
          }
        } catch (e) {
          console.error('Error voting:', e);
        }
      }
    });
  }
}
