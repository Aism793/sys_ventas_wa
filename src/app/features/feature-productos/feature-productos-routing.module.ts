import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FeatureProductosComponent } from './feature-productos.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductosComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FeatureProductosRoutingModule { }
