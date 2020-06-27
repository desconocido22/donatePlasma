// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
// import { BaseComponent } from './views/theme/base/base.component';
// Auth
// import { AuthGuard } from './core/auth';
import { DonorComponent } from './views/pages/donate/donor/donor.component';
import { HomeComponent } from './views/pages/donate/home/home.component';
import {ReceptorComponent} from './views/pages/donate/receptor/receptor.component';
import {ReceptorsComponent} from './views/pages/donate/receptors/receptors.component';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'error', loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule)},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'donate', component: DonorComponent},
  {path: 'receptor', component: ReceptorComponent},
  {path: 'receptors', component: ReceptorsComponent},
  {path: '**', redirectTo: 'error/404', pathMatch: 'full'},
  {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
