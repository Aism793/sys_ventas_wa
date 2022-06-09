import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InvoiceDetailModule { 
  productId: number;
  quantity: number;
  price: number;
}
