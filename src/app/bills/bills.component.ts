import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bill } from '../bill.interface';
import { DataStorageService } from '../data-storage.service';
import { billsService } from './bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit, OnDestroy{

  bills: Bill[] =[];
  sum =0;
  subscription: Subscription | null = null;
  constructor(private billsService: billsService,
              private router: Router,
              private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.bills= this.billsService.getBills(); 
    this.billsService.billsChanged$.subscribe((bills: Bill[]) => {
      this.bills= bills.slice();
      }); 
    this.sum= this.billsService.returnSum();   
  }

  onDelete(bill:Bill) {
    this.billsService.deleteBill(bill);
    this.subscription = this.billsService.billsChanged$.subscribe ((bills: Bill[]) => 
      this.bills= bills);
    this.subscription= this.dataStorageService.storeBills().subscribe ((response) =>
    console.log(response)
    );

}
navigateToAddNewBill() {
  this.router.navigate(['/header/new-bill'])
}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
