import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BillsFacade } from '../sotre/bills.facade';
import { DataStorageService } from '../../../data-storage.service';
import { BillsService } from '../sotre/bills.service';
import { Bill } from '../bill.interface';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit, OnDestroy {
  title: string = '';
  form = new FormGroup({});
  bills: Bill[] | undefined;
  id = '0';
  subscription: Subscription | null = null;

  constructor(
    private billsFacade: BillsFacade,
    private router: Router,
    private dataStorageService: DataStorageService,
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      sum: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', Validators.required),
      payment: new FormControl('', Validators.required)
    });
    this.subscription = this.billsFacade.billsChanged$.subscribe(
      (bills: Bill[]) => {
        this.bills = bills;
        this.id = this.bills.length.toString();
      }
    );
  }

  onSubmit() {
    let id = this.id + 1;
    let title = this.form.value.title;
    let sum = +this.form.value.sum;
    let startDate = this.form.value.startDate;
    let endDate = this.form.value.endDate;
    let payment = this.form.value.payment;
    const newBill: Bill = { id, title, sum, startDate, endDate, payment };
    // this.billsFacade.addBill(newBill);
    // this.billsFacade.billsChanged$.subscribe((bills: Bill[]) =>
    //   this.bills = bills);
    this.billsService
      .postsBills(newBill)
      .subscribe(response => console.log(response));
    this.router.navigate(['/bills']);
    this.billsFacade.addBill(newBill);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
