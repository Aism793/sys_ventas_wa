import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceDetailModule } from '../invoice-detail/invoice-detail.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InvoiceModule { 
  id: number;
  clientId: number;
  date: String;
  status: String;
  total: number;
  details: [InvoiceDetailModule]
}
