import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'bills', pathMatch: 'full' },
    {
        path: 'auth', loadChildren: () => import(
            './pages/auth/auth.module'
        ).then(m => m.AuthModule)
    },
    {
        path: '', component: HeaderComponent, children: [
            {
                path: 'incomes', loadChildren: () => import(
                    './pages/incomes/incomes.module'
                ).then(m => m.IncomesModule)
            },
            {
                path: 'summary', loadChildren: () => import(
                    './pages/summary/summary.module'
                ).then(m => m.SummaryModule)
            },
            {
                path: 'bills', loadChildren: () => import(
                    './pages/bills/bills.module'
                ).then(m => m.BillsModule)
            },
            {
                path: 'new-bill', loadChildren: () => import(
                    './pages/bills/new-bill/new-bill.module'
                ).then(m => m.NewBillModule)
            },
            {
                path: 'bill-edit/:id', loadChildren: () => import(
                    './pages/bills/bill-edit/bill-edit.module'
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
