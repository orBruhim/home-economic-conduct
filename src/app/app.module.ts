import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { BillsModule } from './bills/bills.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewBillModule } from './bills/new-bill/new-bill.module';
import { BillEditModule } from './bills/bill-edit/bill-edit.module';
import { HeaderModule } from './header/header.module';
import { IncomesModule } from './incomes/incomes.module';
import { SummaryModule } from './summary/summary.module';
import { ChartsModule } from 'ng2-charts';
import { AuthModule } from './auth/auth.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        AppRoutingModule,

        MatToolbarModule,
        ReactiveFormsModule,
        ChartsModule,

        NewBillModule,
        BillsModule,
        BillEditModule,
        HeaderModule,
        IncomesModule,
        SummaryModule,
        AuthModule,
        environment.production ? [] : AkitaNgDevtools.forRoot({name: 'store', maxAge: 25}),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
