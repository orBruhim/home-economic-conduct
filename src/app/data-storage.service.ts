import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { billsService } from './bills/bills.service';
import {tap, map} from 'rxjs/operators';
import { Bill } from './bill.interface';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private billsService: billsService,
              private http: HttpClient) { }

  
  storeBills() {
  const bills = this.billsService.getBills();
       return this.http.put ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', bills);
  }
  fetchBills () {
    return this.http.get <Bill[]>
    ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', ).pipe(
    tap(bills => {
       this.billsService.setBills(bills);
       console.log(bills);
   }));
  }
  // storeIncomes() {
  //   const bills = this.billsService.getBills();
  //        return this.http.put ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', bills);
  //   }
  //   fetchBills () {
  //     return this.http.get <Bill[]>
  //     ('https://home-economic--conduct-default-rtdb.firebaseio.com/bills.json', ).pipe(
  //     tap(bills => {
  //        this.billsService.setBills(bills);
  //        console.log(bills);
  //    }));
  //   }
}
