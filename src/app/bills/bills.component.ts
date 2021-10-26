import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bill } from '../bill.interface';
import { billsService } from './bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit, OnDestroy{

  bills: Bill[] =[];
  sum =0;
  subscription: Subscription | null = null;
  constructor(private billsService: billsService,
              private router: Router) {}

  ngOnInit(): void {
this.bills= this.billsService.getBills(); 
this.billsService.billsChanged$.subscribe((bills: Bill[]) => {
  this.bills= bills.slice();
 console.log(bills);
  }); 
  console.log(this.bills);
  
  this.sum= this.billsService.returnSum();   
  }

  onDelete(bill:Bill) {
    this.billsService.deleteBill(bill);
    this.subscription = this.billsService.billsChanged$.subscribe ((bills: Bill[]) => {
      this.bills= bills;
  });
}
navigateToAddNewBill() {
  this.router.navigate(['/header/new-bill'])
}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
