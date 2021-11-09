import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Bill } from '../bill.interface';
import { DataStorageService } from '../data-storage.service';
import { BillsService } from './bills.service';
import { BillsQuery } from './sotre/bills.query';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillsComponent implements OnInit, OnDestroy {

  bills: Bill[] = [];
  sum = 0;
  subscription: Subscription | null = null;
  bills$?: Observable<Bill[]>

  constructor(private billsService: BillsService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private billsQuery: BillsQuery) {
  }

  ngOnInit() {
    // this.billsService.getBills();
    // this.subscription = this.billsService.billsChanged$
    //   .subscribe(
    //     (bills: Bill[]) => {
    //       this.bills = bills;
    //       this.sum = this.billsService.returnSum();
    //     }
    //   );
    this.bills$ = this.billsQuery.selectBills$;    
    this.sum = this.billsService.returnSum();
    console.log(this.bills$);
  }

  onDelete(bill: Bill) {
    this.billsService.deleteBill(bill);
    // this.subscription = this.billsService.billsChanged$.subscribe((bills: Bill[]) =>
    //   this.bills = bills);
    // this.subscription = this.dataStorageService.storeBills().subscribe();
  }
  navigateToAddNewBill() {
    this.router.navigate(['/new-bill'])
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
