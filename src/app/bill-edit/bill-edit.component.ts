import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bill } from '../bill.interface';
import { billsService } from '../bills/bills.service';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.css']
})
export class BillEditComponent implements OnInit {
  bill: Bill| null = null;
  id : number = 0;
  bills: Bill[]| null = null;
  form: FormGroup = new FormGroup ({})
  newbill : Bill ={id:0, title: '', startDate: new Date (2021,11,30), endDate:new Date (2021,11,30), sum:0, payment:''}
  

  constructor(private route: ActivatedRoute,
              private billsService: billsService,
              private router: Router) { }

  ngOnInit(): void {
    // this.id= this.route.snapshot.params ['id'];
    this.route.params.subscribe ((params: Params) => 
    this.id= +params['id']);
    
    this.bill= this.billsService.getBill(this.id);
    console.log(this.bill?.startDate);
    this.form = new FormGroup ({
      title: new FormControl (this.bill.title, Validators.required),
      sum: new FormControl (this.bill.sum, [Validators.required, Validators.pattern("^[0-9]*$")]),
      startDate: new FormControl (this.bill.startDate, Validators.required),
      endDate: new FormControl (this.bill.endDate, Validators.required),
      payment: new FormControl (this.bill.payment, Validators.required)
       
    });
    
  }
  onSubmit () {
    this.newbill.title= this.form.value.title;
    this.newbill.startDate= this.form.value.startDate;
    this.newbill.endDate= this.form.value.endDate;
    this.newbill.sum= this.form.value.sum;
    this.newbill.payment= this.form.value.payment;
    this.billsService.setBill (this.id, this.newbill);
    console.log(this.newbill)
    console.log(this.form);
    this.router.navigate(['/header/bills']);
    
  }
}
