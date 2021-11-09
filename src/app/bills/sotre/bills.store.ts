import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Bill } from 'src/app/bill.interface';

export interface BillsState {
   bills: Bill[];
}

export function createInitialState(): BillsState {
  return {
    bills:[]
  };
}

@Injectable ({providedIn:'root'})
@StoreConfig({ name: 'bills' })
export class BillsStore extends Store<BillsState> {
  constructor() {
    super(createInitialState());
  }
}