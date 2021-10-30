import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { 
	IgxPieChartModule,
	IgxLegendModule,
	IgxItemLegendModule
 } from "igniteui-angular-charts";
import { SummaryComponent } from './summary.component';
 
@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    FormsModule,
    IgxPieChartModule,
    IgxLegendModule,
    IgxItemLegendModule,
    ChartsModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class SummaryModule { }
