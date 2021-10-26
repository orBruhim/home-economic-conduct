import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './bills/bills.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'header/bills', pathMatch: 'full' },
    { path: 'header', component: HeaderComponent, children: [
        { path: 'incomes', loadChildren: () => import (
            './incomes/incomes.module'
        ).then (m => m.IncomesModule)},
        { path: 'summary', loadChildren: () => import (
            './summary/summary.module'
        ).then (m => m.SummaryModule)},
        { path: 'bills', loadChildren: () => import (
            './bills/bills.module'
        ).then (m => m.BillsModule)},
        { path: 'new-bill', loadChildren: () => import (
            './new-bill/new-bill.module'
        ).then (m => m.NewBillModule)},
        { path: 'bill-edit/:id', loadChildren: () => import (
            './bill-edit/bill-edit.module'
        ).then (m => m.BillEditModule)}
    ]},
    {path: 'not-found', component:NotFoundComponent},
    {path:'**', redirectTo: '/not-found', pathMatch: 'full'}
    
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}