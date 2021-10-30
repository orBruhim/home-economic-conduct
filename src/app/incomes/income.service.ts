import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Income } from '../income.interface';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  incomes: Income [] =[
    {title: 'or',
      sum: 20},
      {title: 'orrrr',
      sum: 20}
  ];
  sum: number =0;
  incomeChanged$: BehaviorSubject <Income[]> =
   new BehaviorSubject <Income[]> (this.incomes);

   getIncomes () {
       return this.incomes.slice();           
   }
   deleteIncome (income: Income) {
    this.incomes = this.incomes.filter(item => item !== income);
    this.incomeChanged$.next(this.incomes.slice());
   }

   addIncome (income: Income) {
       this.incomes.push(income);
       this.incomeChanged$.next(this.incomes.slice());
   }
   setIncomes (incomes: Income[]) {
       this.incomes= incomes;
       this.incomeChanged$.next(this.incomes);
   }
   returnSums() {
    const sumsArray = [];
    for(let i = 0; i < this.incomes.length; i++)
    sumsArray[i]= this.incomes[i].sum;
    return sumsArray;
}
  returnTitles() {
    const titleArray = [];
    for(let i = 0; i < this.incomes.length; i++) {
    titleArray[i]= this.incomes[i].title;
    }
    return titleArray;
  }
}
