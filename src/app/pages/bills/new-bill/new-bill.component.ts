import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BillsService } from '../sotre/bills.service';
import { takeUntil, tap } from 'rxjs/operators';
import { BillsQuery } from '../sotre/bills.query';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit, OnDestroy {
  title: string = '';
  form = new FormGroup({});
  id = '';

  private destroySubject = new Subject<void>();

  constructor(
    private router: Router,
    private billsService: BillsService,
    private billsQuery: BillsQuery
  ) {}

  ngOnInit(): void {
    this.billsService.getBills().subscribe();

    this.billsQuery.selectBills$
      .pipe(
        takeUntil(this.destroySubject),
        tap(bills => {
          this.id = bills.length.toString() + 1;
        })
      )
      .subscribe();
    this.initForm();
  }

  onSubmit(): void {
    const { id, title, sum, startDate, endDate, payment } = this.form.value;
    const newBill = { id, title, sum, startDate, endDate, payment };

    this.billsService.postsBills(newBill).subscribe();
    this.router.navigate(['/bills']);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  private initForm(): void {
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
  }
}
