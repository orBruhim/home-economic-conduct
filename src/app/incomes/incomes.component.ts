import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { Income } from '../income.interface';
import { IncomeService } from './income.service';

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

  constructor(private dataStorageService: DataStorageService,
              private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl ('', Validators.required),
      sum: new FormControl ('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
    this.incomes= this.incomeService.getIncomes();
    this.incomeService.incomeChanged$.subscribe ((incomes: Income[]) => {
      this.incomes= incomes;
    });
  }
  onSubmit() {
    console.log(this.form);
    let incomeTitle: string = this.form.value.title;
    let incomeSum: number = this.form.value.sum;
    this.newIncome = {title: incomeTitle,sum: incomeSum};
    this.incomeService.addIncome(this.newIncome);
    this.subscription= this.incomeService.incomeChanged$.subscribe ((incomes: Income[]) => {
      this.incomes= incomes;
    });
    this.subscription= this.dataStorageService.storeIncomes().subscribe ();
    this.form.reset();
    this.totalIncomes += (incomeSum);    
  }
  onDelete(income: Income) {
    this.incomeService.deleteIncome(income);
    this.subscription= this.incomeService.incomeChanged$.subscribe ((incomes: Income[]) => {
      this.incomes= incomes;
    });
    this.subscription= this.dataStorageService.storeIncomes().subscribe ();
    this.totalIncomes = this.totalIncomes- this.newIncome.sum;  
  }
  ngOnDestroy () {
    this.subscription?.unsubscribe();
  }
}
