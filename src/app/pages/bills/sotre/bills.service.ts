import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { BillsFacade } from './bills.facade';
import { combineLatest } from 'rxjs';
import { BillsQuery } from './bills.query';
import { Bill } from '../bill.interface';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private billsFacade: BillsFacade,
    private billsQuery: BillsQuery
  ) {}

  getBills() {
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        console.log(user);
        return this.http.get<Bill[]>(
          'https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth='
        );
      }),
      tap((bills: Bill[]) => {
        console.log(bills);
        this.billsFacade.setBills(bills);
      })
    );
  }

  postsBills() {
    return combineLatest([
      this.authService.user$,
      this.billsQuery.selectBills$
    ]).pipe(
      tap(([user, bills]) => {
        return this.http.post(
          'https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json?auth=',
          bills
        );
      })
    );
  }
}
