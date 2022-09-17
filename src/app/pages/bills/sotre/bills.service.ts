import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs/operators';
import { BillsFacade } from './bills.facade';
import { from } from 'rxjs';
import { BillsQuery } from './bills.query';
import { Bill } from '../bill.interface';
import {
  Firestore,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  billsCollection = collection(this.firestore, 'bills');

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private billsFacade: BillsFacade,
    private billsQuery: BillsQuery,
    private firestore: Firestore
  ) {}

  getBills() {
    return collectionData(this.billsCollection).pipe(
      tap(bills => {
        this.billsFacade.setBills(bills as Bill[]);
      })
    );
  }

  postsBills(newBill: Bill) {
    this.billsFacade.addBill(newBill);
    return from(addDoc(this.billsCollection, newBill));
  }
}
