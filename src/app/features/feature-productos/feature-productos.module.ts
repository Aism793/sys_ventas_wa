import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureProductosComponent } from './feature-productos.component';
import { FeatureProductosRoutingModule } from './feature-productos-routing.module';

import { CoreModule } from '@app/core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

// import for forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import for locales
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import for SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { InternationalizationModule } from '@app/internationalization.module';
import { CategoryComponent } from './pages/categorys/category/category.component';
import { FormProductoComponent } from './pages/productos/form-producto/form-producto.component';

@NgModule({
  declarations: [
    FeatureProductosComponent,
    CategoryComponent,
    FormProductoComponent
  ],
  imports: [
    CommonModule,
    InternationalizationModule,
    SweetAlert2Module,
    FeatureProductosRoutingModule,
    CoreModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  exports: []
})
export class FeatureProductosModule { }
