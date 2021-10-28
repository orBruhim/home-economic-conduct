import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillEditRoutingModule } from './bill-edit-routing.module';
import { BillEditComponent } from './bill-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [BillEditComponent],
  imports: [
    CommonModule,
    BillEditRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class BillEditModule { }
