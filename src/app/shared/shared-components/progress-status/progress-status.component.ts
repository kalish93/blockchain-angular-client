import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { ProgressStatusFacade } from '../../../core/facades/progress-status.facade';

interface ProgressStatusComponentState {
  inprogress: boolean;
}

const initProgressStatusComponentState: Partial<ProgressStatusComponentState> =
  {
    inprogress: false,
  };

@Component({
  selector: 'app-progress-status',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './progress-status.component.html',
  styleUrls: ['./progress-status.component.scss'],
  providers: [RxState],
})
export class ProgressStatusComponent {
  inprogress$: Observable<boolean> = this.state.select('inprogress');

  constructor(
    private state: RxState<ProgressStatusComponentState>,
    private progressStatusFacade: ProgressStatusFacade,
  ) {
    this.state.set(initProgressStatusComponentState);
    this.state.connect('inprogress', this.progressStatusFacade.inprogress$);
  }
}
