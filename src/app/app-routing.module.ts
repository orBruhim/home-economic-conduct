import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { BillsComponent } from './bills/bills.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'bills', pathMatch: 'full' },
    {
        path: 'auth', loadChildren: () => import(
            './auth/auth.module'
        ).then(m => m.AuthModule)
    },
    {
        path: '', component: HeaderComponent, children: [
            {
                path: 'incomes', loadChildren: () => import(
                    './incomes/incomes.module'
                ).then(m => m.IncomesModule)
            },
            {
                path: 'summary', loadChildren: () => import(
                    './summary/summary.module'
                ).then(m => m.SummaryModule)
            },
            {
                path: 'bills', loadChildren: () => import(
                    './bills/bills.module'
                ).then(m => m.BillsModule)
            },
            {
                path: 'new-bill', loadChildren: () => import(
                    './bills/new-bill/new-bill.module'
                ).then(m => m.NewBillModule)
            },
            {
                path: 'bill-edit/:id', loadChildren: () => import(
                    './bills/bill-edit/bill-edit.module'
                ).then(m => m.BillEditModule)
            }
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }