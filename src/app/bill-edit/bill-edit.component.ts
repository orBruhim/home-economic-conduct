import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bill } from '../bill.interface';
import { billsService } from '../bills/bills.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})
export class BillEditComponent implements OnInit, OnDestroy {
  bill: Bill = {id:0, title: '', startDate: new Date (2021,11,30), endDate:new Date (2021,11,30), sum:0, payment:''};
  id : number = 0;
  bills: Bill[]| null = null;
  form: FormGroup = new FormGroup ({})
  newBill : Bill ={id:0, title: '', startDate: new Date (2021,11,30), endDate:new Date (2021,11,30), sum:0, payment:''}
  subscription: Subscription | null = null;
  date: string ='';

  constructor(private route: ActivatedRoute,
              private billsService: billsService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
   this.id = +this.route.snapshot.params.id;
    this.subscription= this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params.id;
      this.bill= this.billsService.getBill(this.id);        
    }
    );

    
    this.form = new FormGroup ({
      title: new FormControl (this.bill.title, Validators.required),
      sum: new FormControl (this.bill.sum, [Validators.required, Validators.pattern("^[0-9]*$")]),
      startDate: new FormControl (this.bill.startDate, Validators.required),
      endDate: new FormControl (this.bill.endDate, Validators.required),
      payment: new FormControl (this.bill.payment, Validators.required)
       
    });
    // console.log(this.form.value.startDate);
    
  }
  onSubmit () {
    this.newBill.title= this.form.value.title;
    this.newBill.startDate= this.form.value.startDate;
    this.newBill.endDate= this.form.value.endDate;
    this.newBill.sum= +this.form.value.sum;
    this.newBill.payment= this.form.value.payment;
    this.newBill.id= this.id;
    this.billsService.setBill (this.id, this.newBill);    
    this.dataStorageService.storeBills().subscribe ((response) =>
    console.log(response)
    );
    this.router.navigate(['/header/bills']);  

  }
  ngOnDestroy () {
    this.subscription?.unsubscribe();
  }
}
