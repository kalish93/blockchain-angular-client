import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateElection } from '../state/election.action';

@Injectable({
  providedIn: 'root',
})
export class ElectionFacade {
  constructor(private store: Store) {}

  dispatchCreateElection(election: any) {
    this.store.dispatch(new CreateElection(election));
  }
}
