import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@core/core.module').then((m) => m.CoreModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { 
      relativeLinkResolution: 'legacy' 
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
