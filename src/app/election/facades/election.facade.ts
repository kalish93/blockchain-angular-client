import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateElection, GetAllElections,VoteForCandidate, GetElectionDetial, GetPersolanizedElections, GetElectionData } from '../state/election.action';
import { ElectionSelector } from '../state/election.selector';

@Injectable({
  providedIn: 'root',
})
export class ElectionFacade {
  constructor(private store: Store) {}

  @Select(ElectionSelector.elections)
  elections$!: Observable<any[]>;

  @Select(ElectionSelector.personalizedElections)
  personalizedElections$!: Observable<any[]>;

  @Select(ElectionSelector.electionDetail)
  electionDetail$!: Observable<any>;

  @Select(ElectionSelector.electionData)
  electionData$!: Observable<any>;

  dispatchCreateElection(election: any) {
    this.store.dispatch(new CreateElection(election));
  }

  dispatchGetAllElections() {
    this.store.dispatch(new GetAllElections());
  }

  dispatchVoteForCandidate(votorId: string, electionId: string, candidateId: string) {
    this.store.dispatch(new VoteForCandidate(votorId, electionId, candidateId));
  }

  dispatchGetElectionDetail(electionId: string) {
    this.store.dispatch(new GetElectionDetial(electionId));
  }

  dispatchGetPersonalizedElections(organizationIds: string[]) {
    this.store.dispatch(new GetPersolanizedElections(organizationIds));
  }

  dispatchGetElectionData(electionId: string) {
    this.store.dispatch(new GetElectionData(electionId));
  }
}
