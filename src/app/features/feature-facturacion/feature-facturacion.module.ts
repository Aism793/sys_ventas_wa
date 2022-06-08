import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { InternationalizationModule } from '@app/internationalization.module';

// import for alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CoreModule } from '@app/core/core.module';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { NgChartsModule } from 'ng2-charts';
import { FormInvoiceComponent } from './pages/facturacion/form-invoice/form-invoice.component';
import { ListClienteComponent } from '../feature-clientes/pages/clientes/list-cliente/list-cliente.component';

@NgModule({
  declarations: [
    FacturacionComponent,
    FormInvoiceComponent,
  
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    CoreModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
    InternationalizationModule,
    NgChartsModule,
  ],
  providers: [
    DatePipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FeatureFacturacionModule { }
