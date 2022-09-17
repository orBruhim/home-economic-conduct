import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Bill } from 'src/app/pages/bills/bill.interface';

export interface BillsState {
  bills: Bill[];
  sum: number;
}

export function createInitialState(): BillsState {
  return {
    bills: [],
    sum: 0
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bills' })
export class BillsStore extends Store<BillsState> {
  constructor() {
    super(createInitialState());
  }
}
