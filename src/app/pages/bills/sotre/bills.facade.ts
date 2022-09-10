import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BillsState, BillsStore } from './bills.store';
import { Bill } from '../bill.interface';

@Injectable({ providedIn: 'root' })
export class BillsFacade {
  bills: Bill[] = [];
  sum: number = 0;
  billsChanged$ = new BehaviorSubject<Bill[]>(this.bills);

  constructor(private billsStore: BillsStore) {}

  getBill(id: number): void {
    this.billsStore.update((billsState: BillsState) => {
      const billGet = billsState.bills[id];
      return {
        ...billsState,
        billGet
      };
    });
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
        bills
      };
    });
  }

  addBill(bill: Bill): void {
    this.billsStore.update((billsState: BillsState) => {
      return {
        ...billsState,
        bills: [...billsState.bills, bill]
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

  getSum(): number {
    this.sum = 0;
    this.bills.forEach(bill => {
      this.sum = +bill.sum;
    });
    return this.sum;
  }

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
