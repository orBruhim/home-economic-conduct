import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBillRoutingModule } from './new-bill-routing.module';
import { NewBillComponent } from './new-bill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [NewBillComponent],
  imports: [
    CommonModule,
    NewBillRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class NewBillModule { }
