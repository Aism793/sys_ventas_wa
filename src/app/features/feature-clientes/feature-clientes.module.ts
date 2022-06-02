import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

// import for forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientesComponent } from './pages/clientes/clientes.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// import for translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@app/core/core.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    CoreModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [

  ],
  exports: [
    CoreModule
  ]
})
export class FeatureClientesModule { }
