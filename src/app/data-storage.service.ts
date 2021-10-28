import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { billsService } from './bills/bills.service';
import {tap} from 'rxjs/operators';
import { Bill } from './bill.interface';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private billsService: billsService,
              private http: HttpClient) { }

  
  storeBills() {
  const bills = this.billsService.getBills();
       return this.http.post ('https://the-frontend-booster-default-rtdb.firebaseio.com/posts.json', bills);
  }
  // fetchBills () {
  //   return this.http.get <Bill[]> 
  //   ('https://the-frontend-booster-default-rtdb.firebaseio.com/posts.json')
  //   .pipe(
  //     tap (bills => {
  //       this.billsService.setBills(bills);
  //       console.log(bills);
        
  //     })
  //   );
  // }
}
