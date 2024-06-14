import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { ElectionFacade } from '../../facades/election.facade';
import { AuthFacade } from '../../../auth/facades/auth.facade';
import { jwtDecode } from 'jwt-decode';
import { CandidateDescriptionDialogComponent } from '../candidate-description-dialog/candidate-description-dialog.component';
import { IMAGE_BASE_URL } from '../../../core/constants/api-endpoints';
import { format } from 'date-fns';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface ElectionDetailComponentState {
  electionDetail: any;
  electionData: any;
  accessToken: string;
}

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.scss'],
  providers: [RxState],
})
export class ElectionDetailComponent implements OnInit {
  electionId: string | undefined;
  electionDetail: any;
  electionData$ = this.state.select('electionData');
  electionDetail$ = this.state.select('electionDetail');
  electionData: any;
  accessToken: string | null = null;
  accessToken$ = this.state.select('accessToken');
  decodedToken: any;
  imageBaseUrl = IMAGE_BASE_URL;
  hasEnded: boolean = false;
  multi: any[] = [];
  pieData: any[] = [];

  // options for ngx-charts
  view: [number, number] = [700, 400];
  viewPie: [number, number] = [400, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';
  autoScale = true;
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7C8CC7', '#f1b872', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private route: ActivatedRoute,
    private electionFacade: ElectionFacade,
    private authFacade: AuthFacade,
    private dialog: MatDialog,
    private state: RxState<ElectionDetailComponentState>
  ) {
    this.state.set({ electionDetail: {} });
    this.state.connect('electionDetail', this.electionFacade.electionDetail$);
    this.state.connect('accessToken', this.authFacade.accessToken$);
    this.state.connect('electionData', this.electionFacade.electionData$);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.electionId = params['id'];
      if (this.electionId) {
        this.electionFacade.dispatchGetElectionDetail(this.electionId);
      }
    });

    this.electionDetail$.subscribe((electionDetail) => {
      console.log('electionDetail', electionDetail);
      this.electionDetail = electionDetail;
      this.electionFacade.dispatchGetElectionData(
        electionDetail.electionId,
        electionDetail.timeCreated,
        electionDetail.endTime
      );

      if (this.electionDetail && this.electionDetail.endTime) {
        this.hasEnded = Date.now() > Number(this.electionDetail.endTime);
      }

      this.processPieData();
    });

    this.accessToken$.subscribe((token) => {
      this.accessToken = token;
      this.decodedToken = jwtDecode(token);
    });

    this.electionData$.subscribe((electionData) => {
      console.log('electionData', electionData);
      this.electionData = electionData;
      this.processElectionData(electionData);
    });
  }

  processElectionData(data: any) {
    this.multi = data.map((candidate: any) => ({
      name: candidate.candidateName,
      series: candidate.series.map((point: any) => ({
        name: format(new Date(point.name), 'yyyy-MM-dd HH:mm:ss'),
        value: point.value,
      })),
    }));
  }

  processPieData() {
    if (this.electionDetail && this.electionDetail.candidates) {
      this.pieData = this.electionDetail.candidates.map((candidate: any) => ({
        name: candidate.name,
        value: Number(candidate.VoteCount),
      }));
    }
  }

  async voteForCandidate(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Voting',
        message:
          'Are you sure you want to vote for this candidate? You cannot change your choice once you vote!',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 'confirm') {
        try {
          if (this.electionId) {
            this.electionFacade.dispatchVoteForCandidate(
              this.decodedToken.id,
              this.electionId,
              id
            );
            console.log('Vote successful!', this.electionId, this);
          }
        } catch (e) {
          console.error('Error voting:', e);
        }
      }
    });
  }

  openDescription(candidate: any): void {
    this.dialog.open(CandidateDescriptionDialogComponent, {
      data: candidate,
      width: '30%',
      height: 'auto',
    });
  }
}
