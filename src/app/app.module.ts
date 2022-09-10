import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {ChartsModule} from 'ng2-charts';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideDatabase, getDatabase} from '@angular/fire/database';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {MatIconModule} from "@angular/material/icon";
import {NewBillModule} from "./pages/bills/new-bill/new-bill.module";
import {BillsModule} from "./pages/bills/bills.module";
import {BillEditModule} from "./pages/bills/bill-edit/bill-edit.module";
import {HeaderModule} from "./pages/header/header.module";
import {IncomesModule} from "./pages/incomes/incomes.module";
import {SummaryModule} from "./pages/summary/summary.module";
import {AuthModule} from "./pages/auth/auth.module";


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
export class AppModule {
}
