import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {ChartType, ChartOptions} from 'chart.js';

import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip
} from 'ng2-charts';
import {Subject, Subscription} from 'rxjs';
import {BillsFacade} from '../bills/sotre/bills.facade';
import {IncomeService} from '../incomes/income.service';
import {Bill} from '../bills/bill.interface';
import {BillsQuery} from '../bills/sotre/bills.query';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  public chart: Chart = new Chart('', {});
  subscription: Subscription | null = null;
  bills: Bill[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabelsBills: Label[] = [];
  public pieChartDataBills: SingleDataSet = [];
  public pieChartLabelsIncomes: Label[] = [];
  public pieChartDataIncomes: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  sumBills = 0;
  private destroySubject = new Subject<void>();

  constructor(
    private billsFacade: BillsFacade,
    private incomesService: IncomeService,
    private billsQuery: BillsQuery
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {

    this.pieChartDataIncomes = this.incomesService.returnSums();
    this.pieChartLabelsIncomes = this.incomesService.returnTitles();
    let sumIncomes = this.incomesService.returnSum();
    this.billsQuery.selectedSum$.pipe(
      takeUntil(this.destroySubject),
      tap(sum => {
        this.sumBills = sum;
      })
    );

    this.billsQuery.selectBills$
      .pipe(
        tap((bills: Bill[]) => {

          this.pieChartDataBills = this.billsFacade.getSumsArray(bills);
          this.pieChartLabelsBills = this.billsFacade.getTitlesArray(bills);
        })
      )
      .subscribe();


    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Total'],
        datasets: [
          {
            label: 'bills',
            data: [this.sumBills],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 3
          },
          {
            label: 'incomes',
            data: [sumIncomes],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.billsFacade.billsChanged$.subscribe(
      (bills: Bill[]) => (this.bills = bills)
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
