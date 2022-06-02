import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


import { ClientesComponent } from '@app/features/feature-clientes/pages/clientes/clientes.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductosComponent } from '@app/features/feature-productos/pages/productos/productos.component';
import { FacturacionComponent } from '@app/features/feature-facturacion/pages/facturacion/facturacion.component';
import { FormClienteComponent } from '@app/features/feature-clientes/pages/clientes/form-cliente/form-cliente.component';

const routes: Routes = [
  { 
    path: '', 
    component: NavBarComponent
  },
  {
    path: 'a',
    component: NavBarComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'productos',
        children: [
          { path: 'productos', component: ProductosComponent, },
         { path: '**', pathMatch: 'full', redirectTo: 'productos' },
        ],
      },
      {
        path: 'clientes',
        children: [
          { path: 'clientes', component: ClientesComponent, },
          { path: 'crearCliente', component: FormClienteComponent, },
        ]
      },
      {
        path: 'facturacion',
        children: [
          { path: 'facturacion', component: FacturacionComponent, },
          ]
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
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
export class CoreRoutingModule { }
