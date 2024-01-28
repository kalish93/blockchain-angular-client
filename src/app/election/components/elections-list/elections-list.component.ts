import { Component, OnInit } from '@angular/core';
// import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router';
import { ElectionFacade } from '../../facades/election.facade';
import { RxState } from '@rx-angular/state';


interface ElectionsListComponentState {
  elections: any[];
}

const initialElectionsListComponentState: ElectionsListComponentState = {
  elections: []
};


@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrl: './elections-list.component.scss',
  providers: [RxState],
})
export class ElectionsListComponent implements OnInit{
    elections: any[] = [];
    elections$ = this.state.select('elections');

  constructor(
        private electionFacade: ElectionFacade, 
        private router: Router,
        private state: RxState<ElectionsListComponentState>
        ) {
          this.state.set(initialElectionsListComponentState);
          this.state.connect('elections', this.electionFacade.elections$);
        }

  ngOnInit(): void {
    // this.loadElections();
    this.electionFacade.dispatchGetAllElections();
    this.elections$.subscribe((elections) => {
      console.log(elections);
      this.elections = elections;
    });
  }

  // async loadElections(): Promise<void> {
  //   try {
  //     this.elections = await this.blockchainService.getAllElections();
  //   } catch (error) {
  //     console.error('Error fetching elections:', error);
  //   }
  // }

  navigateToDetail(id: string) {
    this.router.navigate(['/election-list', id]);
  }
}
