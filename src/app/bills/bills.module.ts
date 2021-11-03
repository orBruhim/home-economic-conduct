import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsComponent } from './bills.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BillsComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class BillsModule { }
