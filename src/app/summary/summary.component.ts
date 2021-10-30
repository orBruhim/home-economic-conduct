import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SummaryComponent implements OnInit, OnDestroy {
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