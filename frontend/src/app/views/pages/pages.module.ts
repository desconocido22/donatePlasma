// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Partials
import {PartialsModule} from '../partials/partials.module';
// Pages
import {CoreModule} from '../../core/core.module';
import {DonorComponent} from './donate/donor/donor.component';
import {HomeComponent} from './donate/home/home.component';
import {ReceptorComponent} from './donate/receptor/receptor.component';
import {RouterModule} from '@angular/router';
import {ReceptorsComponent} from './donate/receptors/receptors.component';
import {HeaderPlasmaComponent} from './donate/header-plasma/header-plasma.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [DonorComponent, HomeComponent, ReceptorComponent, ReceptorsComponent, HeaderPlasmaComponent],
  exports: [],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
        PartialsModule,
        RouterModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        SweetAlert2Module,
    ],
  providers: []
})
export class PagesModule {
}
