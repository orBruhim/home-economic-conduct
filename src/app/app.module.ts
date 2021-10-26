import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import { BillsComponent } from './bills/bills.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { BillsModule } from './bills/bills.module';
import { BillsRoutingModule } from './bills/bills-routing.module';
import { BillEditComponent } from './bill-edit/bill-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewBillModule } from './new-bill/new-bill.module';
import { HeaderComponent } from './header/header.component';
import { BillEditModule } from './bill-edit/bill-edit.module';
import { HeaderModule } from './header/header.module';
import { IncomesModule } from './incomes/incomes.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SummaryComponent } from './summary/summary.component';
import { SummaryModule } from './summary/summary.module';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   
    AppRoutingModule,
    
    MatToolbarModule,
    ReactiveFormsModule,

    NewBillModule,
    BillsModule,
    BillEditModule,
    HeaderModule,
    IncomesModule,
    SummaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
