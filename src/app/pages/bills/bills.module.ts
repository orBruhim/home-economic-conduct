import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsComponent } from './bills.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BillsComponent],
  imports: [
    CommonModule,
    BillsRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BillsModule {}
