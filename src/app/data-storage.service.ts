import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillsService } from './bills/bills.service';
import {tap, map, take, exhaustMap} from 'rxjs/operators';
import { Bill } from './bill.interface';
import { IncomeService } from './incomes/income.service';
import { Income } from './income.interface';
import { AuthService } from './auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private billsService: BillsService,
              private incomeService: IncomeService,
              private http: HttpClient,
              private authService: AuthService) { }

  
  storeBills() {
  const bills = this.billsService.getBills();
       return this.http.put ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', bills);
  }
  fetchBills () {
    return this.authService.user$.pipe(take(1), exhaustMap(user => {
      return this.http.get <Bill[]>
      ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth=' +user.token)
    }),
    tap(bills => {
      this.billsService.setBills(bills);
      console.log(bills);
  }));    
  }
  storeIncomes() {
    const incomes = this.incomeService.getIncomes();
         return this.http.put ('https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json', incomes);
    }
    fetchIncomes () {
      return this.http.get <Income[]>
      ('https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json', ).pipe(
      tap(incomes => {
         this.incomeService.setIncomes(incomes);
     }));
    }
}
