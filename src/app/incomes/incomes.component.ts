import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { Income } from '../income.interface';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit, OnDestroy {
  title: string ='';
  form= new FormGroup ({});
  incomes:Income[] =[];
  newIncome: Income = {title: '', sum:0};
  totalIncomes: number = 0;
  subscription: Subscription | null = null;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl ('', Validators.required),
      sum: new FormControl ('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }
  onSubmit() {
    console.log(this.form);
    let incomeTitle: string = this.form.value.title;
    let incomeSum: number = this.form.value.sum;
    this.newIncome = {title: incomeTitle,sum: incomeSum}
    this.incomes.push(this.newIncome); 
    this.form.reset();
    this.totalIncomes += (incomeSum);
    this.subscription= this.dataStorageService.storeBills().subscribe ((response) =>
    console.log(response)
    );     
  }
  onDelete(income: Income) {
    this.incomes = this.incomes.filter(item => item !== income);
    this.totalIncomes = this.totalIncomes- this.newIncome.sum;  
    this.subscription= this.dataStorageService.storeBills().subscribe ((response) =>
    console.log(response)
    );
  }
  ngOnDestroy () {
    this.subscription?.unsubscribe();
  }
}
