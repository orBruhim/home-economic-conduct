import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DataStorageService } from '../../data-storage.service';
import { Income } from '../../income.interface';
import { IncomeService } from './income.service';
import { IncomeQuery } from './store/incomes.query';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomesComponent implements OnInit, OnDestroy {
  title: string = '';
  form = new FormGroup({});
  incomes$?: Observable<Income[]>;
  newIncome: Income = { title: '', sum: 0 };
  totalIncomes: number = 0;
  subscription: Subscription | null = null;

  constructor(private dataStorageService: DataStorageService,
    private incomeService: IncomeService,
    private incomeQuery: IncomeQuery) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      sum: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
    this.incomeService.getIncomes();
    this.incomes$= this.incomeQuery.selectIncomes$;
    // this.incomeService.incomeChanged$.subscribe((incomes: Income[]) => {
    //   this.incomes = incomes;
    //   this.totalIncomes = this.incomeService.returnSum();

    // });

  }
  onSubmit() {
    let incomeTitle: string = this.form.value.title;
    let incomeSum: number = +this.form.value.sum;
    this.newIncome = { title: incomeTitle, sum: +incomeSum };
    this.incomeService.addIncome(this.newIncome);
    // this.subscription = this.incomeService.incomeChanged$.subscribe((incomes: Income[]) => {
    //   this.incomes = incomes;
    // });
    this.subscription = this.dataStorageService.storeIncomes().subscribe();
    this.form.reset();
  }
  onDelete(income: Income) {
    this.incomeService.deleteIncome(income);
    // this.subscription = this.incomeService.incomeChanged$.subscribe((incomes: Income[]) => {
    //   this.incomes = incomes;
    // });
    this.subscription = this.dataStorageService.storeIncomes().subscribe();
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
