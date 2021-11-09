import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Bill } from "../bill.interface";
import { BillsQuery } from "./sotre/bills.query";
import { BillsState, BillsStore } from "./sotre/bills.store";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })

export class BillsService {
    bills: Bill[] = [];
    //     {
    //         id: 0,
    //         title: 'Municipal rate',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 0,
    //         payment: 'bi-monthly'
    //     },

    //     {
    //         id: 1,
    //         title: 'Electricity',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 0,
    //         payment: 'bi-monthly'
    //     },
    //     {
    //         id: 2,
    //         title: 'Water',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 0,
    //         payment: 'bi-monthly'
    //     },
    //     {
    //         id: 3,
    //         title: 'Building committee',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 100,
    //         payment: 'weekly'
    //     },
    //     {
    //         id: 4,
    //         title: 'Gas',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 200,
    //         payment: 'monthly'
    //     },
    //     {
    //         id: 5,
    //         title: 'Mobile telephone',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 0,
    //         payment: 'nonthly'
    //     },
    //     {
    //         id: 6,
    //         title: 'Car insurnace',
    //         startDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         endDate: new Date(0, 0, 0).toISOString().split('T')[0],
    //         sum: 0,
    //         payment: 'yearly'
    //     }
    // ];

    sum: number = 0;
    billsChanged$: BehaviorSubject<Bill[]> =
        new BehaviorSubject<Bill[]>(this.bills);
    constructor(private billsStore: BillsStore,
        private billsQuery: BillsQuery) { }

    // getBills() {
    //     this.billsStore.update((billsState: BillsState) => {
    //         return {
    //             ...billsState, bills: [...this.bills]
    //         };
    //     });
    // }

    getBill(id: number) {
        // return this.bills[id];
        // this.billsStore.update((billsState: BillsState) => {
        // return {
        //     ...billsState, bills: [...billsState.bills , this.bills[id]]
        // };
        //     const getedBill = billsState.bills[id];
        //     return {
        //         ...billsState, getedBill
        //     }
        // });
        this.billsStore.update((billsState: BillsState) => {
            const billGet = billsState.bills[id]
            console.log(billGet);
            return {
                ...billsState, billGet
            }
        });
    }
    setBill(id: number, bill: Bill) {
        // this.bills[id] = bill;
        // this.billsChanged$.next(this.bills.slice());
        // this.billsStore.update((billsState: BillsState) => {
        //     const bills = billsState.bills;
        //     bills[id] = bill;
        //     return {
        //         ...billsState, bills
        //     }
        // });
        this.billsStore.update((billsState: BillsState) => {
            const bill = billsState.bills[id];
            const updatedBill = { ...bill, id };
            const updatedBills = [...billsState.bills]
            updatedBills[id] = updatedBill
            return {
                ...billsState, bills: [...updatedBills]
            }
        });
    }

    deleteBill(bill: Bill) {
        // this.bills = this.bills.filter(item => item !== bill);
        // this.billsChanged$.next(this.bills.slice());
        this.billsStore.update((billsState: BillsState) => {
            const bills = billsState.bills.filter(item => item !== bill)
            return {
                ...billsState, bills
            }
        });
    }

    addBill(bill: Bill) {
        // this.bills.push(bill);
        // this.billsChanged$.next(this.bills.slice());
        this.billsStore.update((billsState: BillsState) => {
            return {
                ...billsState, bills: [...billsState.bills, bill]
            }
        })
    }


    setBills(bills: Bill[]) {
        // this.bills = bills;
        // this.billsChanged$.next(this.bills);
        // this.billsStore.update((billsState: BillsState) => {
        //     return {
        //         ...billsState, bills: [...bills]
        //     };
        // });
        this.billsStore.update((billsState: BillsState) => {
            console.log(bills);
            return {
                ...billsState, bills
            }
        });
    }

    returnSum() {
        this.sum = 0;
        for (let i = 0; i < this.bills.length; i++)
            this.sum = this.sum + this.bills[i].sum;
        return this.sum;
    }

    returnSums() {
        const sumsArray = [];
        for (let i = 0; i < this.bills.length; i++)
            sumsArray[i] = this.bills[i].sum;
        return sumsArray;
    }
    returnTitles() {
        const titleArray = [];
        for (let i = 0; i < this.bills.length; i++) {
            titleArray[i] = this.bills[i].title;
        }
        return titleArray;
    }
}