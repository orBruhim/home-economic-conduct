import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Bill } from "../bill.interface";

@Injectable ({providedIn: 'root'})

export class billsService {
  bills: Bill[] = [
    {id: 0,
    title: 'Municipal rate',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'bi-monthly'
    },
    {id: 1,
    title: 'Electricity',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'bi-monthly'
    },
    {id: 2,
    title: 'Water',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'bi-monthly'
    },
    {id: 3,
    title: 'Building committee',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'weekly'
    },
    {id: 4,
    title: 'Gas',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'monthly'
    },
    {id: 5,
    title: 'Mobile telephone',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'nonthly'
    },
    {id: 6,
    title: 'Car insurnace',
    startDate: new Date (2021,11,31),
    endDate: new Date (2021,11,31),
    sum: 0,
    payment: 'yearly'
    }
  ];
  
  sum =0;
  billsChanged$: BehaviorSubject <Bill[]> =
   new BehaviorSubject <Bill[]> (this.bills);

   getBills () {
       return this.bills.slice();           
   }
   getBill (id: number) {
       return this.bills[id];
   } 
   setBill (id: number, bill: Bill) {
       this.bills[id]= bill;
       this.billsChanged$.next(this.bills.slice());
   }
   deleteBill (bill: Bill) {
    this.bills = this.bills.filter(item => item !== bill);
    this.billsChanged$.next(this.bills.slice());
   }

   addBill (bill: Bill) {
       this.bills.push(bill);
       this.billsChanged$.next(this.bills.slice());
   }
   setBills (bills: Bill[]) {
       this.bills= bills;
       this.billsChanged$.next(this.bills);
   }

   returnSum () {
    this.sum=0;
     for(let i = 0; i < this.bills.length; i++)
     this.sum =this.sum + this.bills[i].sum;
     return this.sum;     
   }
}