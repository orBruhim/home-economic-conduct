import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    ChartsModule,
    FormsModule
  ]
})
export class SummaryModule { }
