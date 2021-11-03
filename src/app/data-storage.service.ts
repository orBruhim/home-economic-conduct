import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillsService } from './bills/bills.service';
import { tap, map, take, exhaustMap, switchMap } from 'rxjs/operators';
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
    // const bills = this.billsService.getBills();
    // return this.http.put('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', bills);
    {
      const bills = this.billsService.getBills();
      return this.authService.user$.pipe(take(1), switchMap(user => {
        return this.http.put
          ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth='
            + user.token, bills
          )
      }),
      );
    }


  }
  fetchBills() {
    return this.authService.user$.pipe(take(1), switchMap(user => {
      return this.http.get<Bill[]>
        ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth='
          + user.token
        )
    }),
      tap(bills => {
        this.billsService.setBills(bills);
      }));
  }
  storeIncomes() {
    // const incomes = this.incomeService.getIncomes();
    // return this.http.put('https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json', incomes);
    const incomes = this.incomeService.getIncomes();
    return this.authService.user$.pipe(take(1), switchMap(user => {
      return this.http.put
        ('https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json?auth='
          + user.token, incomes
        )
    }),
    );
  }
  fetchIncomes() {
    return this.authService.user$.pipe(take(1), switchMap(user => {
      return this.http.get<Income[]>
        ('https://home-economic--conduct-default-rtdb.firebaseio.com/incomes.json?auth='
          + user.token
        )
    }),
      tap(incomes => {
        this.incomeService.setIncomes(incomes)
      }));
  }
}
