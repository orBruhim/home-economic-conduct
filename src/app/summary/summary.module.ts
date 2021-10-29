import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { 
	IgxPieChartModule,
	IgxLegendModule,
	IgxItemLegendModule
 } from "igniteui-angular-charts";





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    FormsModule,
    IgxPieChartModule,
    IgxLegendModule,
    IgxItemLegendModule,
    ChartsModule

  ]
})
export class SummaryModule { }
