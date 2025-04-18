import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillsFacade } from './pages/bills/sotre/bills.facade';
import { tap, map, take, exhaustMap, switchMap } from 'rxjs/operators';
import { IncomeService } from './pages/incomes/income.service';
import { Income } from './income.interface';
import { AuthService } from './pages/auth/auth.service';
import { combineLatest } from 'rxjs';
import { BillsQuery } from './pages/bills/sotre/bills.query';
import { Bill } from './pages/bills/bill.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private billsFacade: BillsFacade,
    private incomeService: IncomeService,
    private http: HttpClient,
    private authService: AuthService,
    private billsQuery: BillsQuery
  ) {}

  storeBills() {
    // const bills = this.billsFacade.getBills();
    // return this.http.put('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', bills);
    {
      const bills = null;
      return combineLatest([
        this.authService.user$,
        this.billsQuery.selectBills$
      ]).pipe(
        switchMap(([user, bills]) => {
          debugger;
          return this.http.put(
            'https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth=',
            {}
          );
        }),
        take(1)
      );
    }
  }

  fetchBills() {
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<Bill[]>(
          'https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth='
        );
      }),
      tap(bills => {
        this.billsFacade.setBills(bills);
      })
    );
  }

  storeIncomes() {
    const incomes = this.incomeService.getIncomes();
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        return this.http.put(
          'https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json?auth=',
          incomes
        );
      })
    );
  }

  fetchIncomes() {
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<Income[]>(
          'https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json?auth='
        );
      }),
      tap(incomes => {
        this.incomeService.setIncomes(incomes);
      })
    );
  }
}
