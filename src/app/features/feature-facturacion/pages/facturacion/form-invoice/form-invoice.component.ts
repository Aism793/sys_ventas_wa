import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { ListClienteComponent } from '@app/features/feature-clientes/pages/clientes/list-cliente/list-cliente.component';
import { InvoiceModule } from '../invoice/invoice.module';

@Component({
  selector: 'app-form-invoice',
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.css'],

})
export class FormInvoiceComponent implements OnInit {
  startDate = new Date(2022, 0, 1);
  
  constructor(private fb: FormBuilder,
    public matDialog: MatDialog,
  ) { }
  formGroup = this.fb.group({
    date: ['', [Validators.required]],
    clienteId: ['', [Validators.required]],
   
  });
  ngOnInit(): void {
  }
  get date() {
    return this.formGroup.get('date');
  }
  get clienteId() {
    return this.formGroup.get('clienteId');
  }
  save(){
    let invoice: InvoiceModule = Object.assign({}, this.formGroup.value);
    console.table(invoice);
  }
 

  openDialogClients() {
    const dialogRef = this.matDialog.open(ListClienteComponent, {
      data: {dialog: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.data);
      this.formGroup.patchValue({
        clienteId: result.data
        });
    });
  
  }
}
