import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


import { ClientesComponent } from '@app/features/feature-clientes/pages/clientes/clientes.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductosComponent } from '@app/features/feature-productos/pages/productos/productos.component';
import { FacturacionComponent } from '@app/features/feature-facturacion/pages/facturacion/facturacion.component';
import { FormClienteComponent } from '@app/features/feature-clientes/pages/clientes/form-cliente/form-cliente.component';
import { ListClienteComponent } from '@app/features/feature-clientes/pages/clientes/list-cliente/list-cliente.component';
import { CategoryComponent } from '@app/features/feature-productos/pages/categorys/category/category.component';
import { FormProductoComponent } from '@app/features/feature-productos/pages/productos/form-producto/form-producto.component';
import { FormInvoiceComponent } from '@app/features/feature-facturacion/pages/facturacion/form-invoice/form-invoice.component';
import { LoginComponent } from './components/login/login.component';
import { ListInvoiceComponent } from '@app/features/feature-facturacion/pages/facturacion/list-invoice/list-invoice.component';
import { AuthGuard } from './components/login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'a',
    component: NavBarComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    data:{expectedRole:'Administrador'},
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'productos',
        children: [
          { path: 'productos', component: ProductosComponent, },
          { path: 'categorias', component: CategoryComponent, },
          { path: 'crear-producto', component: FormProductoComponent, },
          { path: '**', pathMatch: 'full', redirectTo: 'productos' },
        ],
      },
      {
        path: 'clientes',
        children: [
          { path: 'clientes', component: ClientesComponent, },
          { path: 'crearCliente', component: FormClienteComponent, },
          { path: 'listarClientes', component: ListClienteComponent, },
          { path: 'editarCliente/:edit/:id', component: FormClienteComponent, },
        ]
      },
      {
        path: 'facturacion',
        children: [
          { path: 'facturacion', component: FacturacionComponent, },
          { path: 'crearFactura', component: FormInvoiceComponent, },
          { path: 'listarFactura', component: ListInvoiceComponent, },
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
