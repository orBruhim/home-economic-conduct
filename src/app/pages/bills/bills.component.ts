import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillsFacade } from './sotre/bills.facade';
import { BillsQuery } from './sotre/bills.query';
import { BillsService } from './sotre/bills.service';
import { Bill } from './bill.interface';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillsComponent implements OnInit {
  sum$ = this.billsQuery.selectedSum$;
  bills$ = this.billsQuery.selectBills$;

  constructor(
    private billsFacade: BillsFacade,
    private router: Router,
    private billsQuery: BillsQuery,
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    this.billsService.getBills().subscribe();
  }

  deleteBill(bill: Bill): void {
    this.billsFacade.deleteBill(bill);
  }

  navigateToAddNewBill(): void {
    this.router.navigate(['/new-bill']);
  }
}
