import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BillsState, BillsStore } from './bills.store';
import { Bill } from '../bill.interface';

@Injectable({ providedIn: 'root' })
export class BillsFacade {
  billsChanged$ = new BehaviorSubject<Bill[]>([]);

  constructor(private billsStore: BillsStore) {}

  getBill(bills: Bill[], id: string): Bill {
    return bills.find(bill => bill.id === id);
  }

  setBill(updatedBill: Bill): void {
    this.billsStore.update((billsState: BillsState) => {
      const bills = billsState.bills.map(bill => {
        if (bill.id === updatedBill.id) {
          return {
            ...bills,
            bill: updatedBill
          };
        }
      });
      return {
        ...billsState,
        bills
      };
    });
  }

  deleteBill(bill: Bill): void {
    this.billsStore.update((billsState: BillsState) => {
      const bills = billsState.bills.filter(item => item !== bill);
      return {
        ...billsState,
        bills,
        sum: billsState.sum - bill.sum
      };
    });
  }

  addBill(bill: Bill): void {
    this.billsStore.update((billsState: BillsState) => {
      return {
        ...billsState,
        bills: [...billsState.bills, bill],
        sum: billsState.sum + bill.sum
      };
    });
  }

  setBills(bills: Bill[]): void {
    this.billsStore.update((billsState: BillsState) => {
      return {
        ...billsState,
        bills
      };
    });
  }

  getSumsArray(bills: Bill[]): number[] {
    const sumsArray = [];
    bills.forEach(bill => {
      sumsArray.push(bill.sum);
    });
    return sumsArray;
  }

  getTitlesArray(bills: Bill[]): string[] {
    const titleArray = [];
    bills.forEach(bill => {
      titleArray.push(bill.title);
    });
    return titleArray;
  }
}
