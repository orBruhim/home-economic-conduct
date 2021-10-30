import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType, ChartOptions } from 'chart.js';


import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Bill } from '../bill.interface';
import { BillsService } from '../bills/bills.service';
import { IncomeService } from '../incomes/income.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy{
  public chart: Chart = new Chart("", {});
  subscription : Subscription |null =null;
  bills: Bill[] =[];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabelsBills: Label[] = [];
  public pieChartDataBills: SingleDataSet = [];
  public pieChartLabelsIncomes: Label[] = [];
  public pieChartDataIncomes: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // public columnChartLabel: Label[] = [];
  // public columnChartData: SingleDataSet = [];
  // public columnChartType: ChartType = 'bar';
 
  constructor(private billsService: BillsService,
              private incomesService: IncomeService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.pieChartDataBills= this.billsService.returnSums();
    this.pieChartLabelsBills= this.billsService.returnTitles();
    this.pieChartDataIncomes= this.incomesService.returnSums();
    this.pieChartLabelsIncomes= this.incomesService.returnTitles(); 
    let sumIncomes= this.incomesService.returnSum();
    let sumBills= this.billsService.returnSum();
     
    
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Total"],
                datasets: [
          {
          label:"bills",
            data: [sumBills],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
      ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 3
          },
          {
            label:"incomes",
              data: [sumIncomes],
              backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
      ],
              borderColor: [
              "rgba(255, 99, 132, 1)",
      ],
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

    this.billsService.billsChanged$
    .subscribe (
      (bills: Bill[]) => 
      this.bills = bills  
    );
    
}
ngOnDestroy () {
  this.subscription?.unsubscribe();
}
}

 