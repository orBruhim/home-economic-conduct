import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Income } from '../income.interface';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  form= new FormGroup ({});
  incomes:Income[] =[];
  newIncome: Income = {title: '', sum:0};
  totalIncomes: number = 0;

  constructor() { }

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
    console.log(this.totalIncomes);
     
  }
  onDelete(income: Income) {
    this.incomes = this.incomes.filter(item => item !== income);
    this.totalIncomes = this.totalIncomes- this.newIncome.sum;  


  }

}
