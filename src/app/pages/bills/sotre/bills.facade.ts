import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BillsState, BillsStore } from './bills.store';
import { Bill } from '../bill.interface';
import { BillsQuery } from './bills.query';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BillsFacade {
  billsChanged$ = new BehaviorSubject<Bill[]>([]);
  bills = [];

  constructor(private billsStore: BillsStore, private billsQuery: BillsQuery) {
    this.billsQuery.selectBills$
      .pipe(
        tap((bills: Bill[]) => {
          this.bills = bills;
        })
      )
      .subscribe();
  }

  getBill(id: string): Bill {
    return this.bills.find(bill => bill.id === id);
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

  //
  // getSum(): number {
  //   let totalSum = 0;
  //   this.bills.forEach(bill => {
  //     debugger;
  //     totalSum = +bill.sum;
  //   });
  //   return totalSum;
  // }

  getSumsArray(): number[] {
    const sumsArray = [];
    this.bills.forEach(bill => {
      sumsArray.push(bill.sum);
    });
    return sumsArray;
  }

  getTitlesArray(): string[] {
    const titleArray = [];
    this.bills.forEach(bill => {
      titleArray.push(bill.title);
    });
    return titleArray;
  }
}
