import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Income } from 'src/app/income.interface';
import { IncomeState, IncomeStore } from './incomes.store';


@Injectable ({providedIn:'root'})
export class IncomeQuery extends Query<IncomeState> { 
    selectIncomes$: Observable <Income[]>= this.select (state => state.incomes);
    
  constructor(protected store: IncomeStore) {
    super(store);
    
  }
}



   