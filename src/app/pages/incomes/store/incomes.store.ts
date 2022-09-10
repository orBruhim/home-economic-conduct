import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Income } from 'src/app/income.interface';

export interface IncomeState {
   incomes: Income[];
}

export function createInitialState(): IncomeState {
  return {
    incomes:[]
  };
}

@Injectable ({providedIn:'root'})
@StoreConfig({ name: 'incomes' })
export class IncomeStore extends Store<IncomeState> {
  constructor() {
    super(createInitialState());
  }
}