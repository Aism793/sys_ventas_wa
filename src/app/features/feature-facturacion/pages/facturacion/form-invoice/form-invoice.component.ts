import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InvoiceModule } from '../invoice/invoice.module';

@Component({
  selector: 'app-form-invoice',
  template: `
  Message: 
  <app-list-cliente (messageEvent)="receiveMessage($event)"></app-list-cliente>
`,
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.css'],

})
export class FormInvoiceComponent implements OnInit {
  startDate = new Date(2022, 0, 1);
  Message :number;
  constructor(private fb: FormBuilder,) { }
  formGroup = this.fb.group({
    date: ['', [Validators.required]],
   
  });
  ngOnInit(): void {
  }
  get date() {
    return this.formGroup.get('date');
  }
  save(){
    let invoice: InvoiceModule = Object.assign({}, this.formGroup.value);
    console.table(invoice);
  }
  receiveMessage($event) {
    this.Message = $event
    console.log(this.Message);
  }
}
