import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BillsState, BillsStore } from './bills.store';

@Injectable({ providedIn: 'root' })
export class BillsQuery extends Query<BillsState> {
  selectBills$ = this.select(state => state.bills);
  selectedSum$ = this.select(state => state.sum);

  constructor(protected store: BillsStore) {
    super(store);
  }
}
