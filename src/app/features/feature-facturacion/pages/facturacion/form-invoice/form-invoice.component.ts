import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { ListClienteComponent } from '@app/features/feature-clientes/pages/clientes/list-cliente/list-cliente.component';
import { ListProductoComponent } from '@app/features/feature-productos/pages/productos/list-producto/list-producto.component';
import { InvoiceDetailModule } from '../invoice-detail/invoice-detail.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Component({
  selector: 'app-form-invoice',
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.css'],

})
export class FormInvoiceComponent implements OnInit {
  
  date:Date;
  productosAVender: InvoiceDetailModule[]=[];
  constructor(private fb: FormBuilder,
    public matDialog: MatDialog,
  ) { }
  formGroup = this.fb.group({
    clienteId: ['', [Validators.required]],
   
  });
  ngOnInit(): void {
  }
  
  get clienteId() {
    return this.formGroup.get('clienteId');
  }
  save(){
    this.date= new Date();
    let invoice: InvoiceModule = Object.assign({}, this.formGroup.value);
    invoice.details= this.productosAVender;
    invoice.date= this.date.toDateString();
    console.table(invoice);
    
  }
 

  openDialogClients() {
    const dialogRef = this.matDialog.open(ListClienteComponent, {
      data: {dialog: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.formGroup.patchValue({
        clienteId: result.data
        });
    });
  
  }
  openDialogProductos() {
    const dialogRef = this.matDialog.open(ListProductoComponent, {
      data: {dialog: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

  result.data.forEach(element => {
    this.productosAVender.push(element);
  });
    });
  
  }
}
