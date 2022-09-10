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
  sum = this.billsFacade.getSum();
  bills$ = this.billsQuery.selectBills$;

  constructor(
    private billsFacade: BillsFacade,
    private router: Router,
    private billsQuery: BillsQuery,
    private billsService: BillsService
  ) {}

  onDelete(bill: Bill) {
    this.billsFacade.deleteBill(bill);
  }

  navigateToAddNewBill() {
    this.router.navigate(['/new-bill']);
  }

  ngOnInit(): void {
    this.billsService.getBills().subscribe();
  }
}
