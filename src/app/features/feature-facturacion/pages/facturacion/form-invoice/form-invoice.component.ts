import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { ListClienteComponent } from '@app/features/feature-clientes/pages/clientes/list-cliente/list-cliente.component';
import { InvoiceService } from '@app/features/feature-facturacion/services/invoice.service';
import { ListProductoComponent } from '@app/features/feature-productos/pages/productos/list-producto/list-producto.component';
import { MensajesModule } from '@app/mensajes/mensajes.module';
import { InvoiceDetailModule } from '../invoice-detail/invoice-detail.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Component({
  selector: 'app-form-invoice',
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.css'],

})
export class FormInvoiceComponent implements OnInit {
  idCliente: number;
  invoice: InvoiceModule = new InvoiceModule();
  productosAVender: InvoiceDetailModule[]=[];
  constructor(private fb: FormBuilder,
    public matDialog: MatDialog, private invoiceSercvice:InvoiceService, private mensaje:MensajesModule
  ) { }
  formGroup = this.fb.group({
    clientId: ['', [Validators.required]],
    nombre: ['', ],
   
  });
  ngOnInit(): void {
  }
  
  get clientId() {
    return this.formGroup.get('clientId');
  }
  get nombre() {
    return this.formGroup.get('nombre');
  }
  save(){

    let date= formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.invoice.clientId= this.idCliente;
    this.invoice.details= this.productosAVender;
    this.invoice.date= date;
    console.table(this.invoice);
    if (this.formGroup.valid && this.invoice.details.length!=0) {
      this.invoiceSercvice.PostInvoice(this.invoice).subscribe(t=>{
        var result= t
        this.mensaje.mensajeAlertaCorrecto("Factura Guardado Correctamente")
        this.limpiarFormulario(),
        error => this.mensaje.mensajeAlertaError( error.error.toString())
      })
    }else{
      this.mensaje.mensajeAlertaError('Registro no valido');
    }
  }
 

  openDialogClients() {
    const dialogRef = this.matDialog.open(ListClienteComponent, {
      data: {dialog: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.idCliente= result.data.id;
      this.formGroup.patchValue({
        clientId: result.data.cedula,
        nombre: result.data.primerNombre+ " "+ result.data.primerApellido,
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
  limpiarFormulario(){
    this.idCliente=0;
    this.productosAVender= [];
    this.formGroup.patchValue({
      clientId: '',
      nombre: '',
      });
  }
}
