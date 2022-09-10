import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Income } from '../../income.interface';
import { IncomeState, IncomeStore } from './store/incomes.store';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  incomes: Income[] = [
    {
      title: 'or',
      sum: 20
    },
    {
      title: 'orrrr',
      sum: 20
    }
  ];
  sum: number = 0;
  incomeChanged$: BehaviorSubject<Income[]> =
    new BehaviorSubject<Income[]>(this.incomes);

  constructor(private incomeStore: IncomeStore) {}

  getIncomes() {
    // return this.incomes.slice();
    this.incomeStore.update((IncomeState: IncomeState) => {
      return {
          ...IncomeState, incomes: [...this.incomes]
      };
  });
  }
  deleteIncome(income: Income) {
    // this.incomes = this.incomes.filter(item => item !== income);
    // this.incomeChanged$.next(this.incomes.slice());
    this.incomeStore.update((incomeState: IncomeState) => {
      const incomes = incomeState.incomes.filter(item => item !== income)
      return {
          ...incomeState, incomes
      }
  });
  }

  addIncome(income: Income) {
    this.incomes.push(income);
    this.incomeChanged$.next(this.incomes.slice());
  }
  setIncomes(incomes: Income[]) {
    this.incomes = incomes;
    this.incomeChanged$.next(this.incomes);
  }
  returnSums() {
    const sumsArray = [];
    for (let i = 0; i < this.incomes.length; i++)
      sumsArray[i] = this.incomes[i].sum;
    return sumsArray;
  }
  returnTitles() {
    const titleArray = [];
    for (let i = 0; i < this.incomes.length; i++) {
      titleArray[i] = this.incomes[i].title;
    }
    return titleArray;
  }
  returnSum() {
    this.sum = 0;
    for (let i = 0; i < this.incomes.length; i++)
      this.sum = +this.sum + this.incomes[i].sum;
    return +this.sum;
  }
}
