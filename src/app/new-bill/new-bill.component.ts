import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bill } from '../bill.interface';
import { billsService } from '../bills/bills.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit, OnDestroy {
  title: string ='';
  form= new FormGroup ({});
  bills: Bill[] |undefined;
  id: number= 0;
  subscription: Subscription |null =null;

  constructor( private billsService: billsService,
                private router: Router,
                private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl ('', Validators.required),
      sum: new FormControl ('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      startDate: new FormControl ('', [Validators.required]),
      endDate: new FormControl ('', Validators.required),
      payment: new FormControl ('', Validators.required)
    });
    this.billsService.billsChanged$.subscribe((bills: Bill[]) => {
      this.bills=bills;
      this.id= this.bills.length;
      
    })
  }
  onSubmit () {
    let id= this.id +1;
    let title= this.form.value.title;
    let sum= this.form.value.sum;
    let startDate= this.form.value.startDate;
    let endDate= this.form.value.endDate;
    let payment= this.form.value.payment;
    const newBill: Bill = {id, title, sum, startDate,endDate, payment};
    this.dataStorageService.storeBills().subscribe ((response) =>
    console.log(response)
    );
    this.billsService.addBill(newBill);
    this.router.navigate(['/header/bills'])    
  }

  ngOnDestroy () {
    this.subscription?.unsubscribe();
  }
}
