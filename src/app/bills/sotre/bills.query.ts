import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/bill.interface';
import { BillsState, BillsStore } from './bills.store';

@Injectable({ providedIn: 'root' })
export class BillsQuery extends Query<BillsState> {
    selectBills$= this.select(state => state.bills);

    constructor(protected store: BillsStore) {
        super(store);
    }
}



