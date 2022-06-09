import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { InvoiceModule } from '../pages/facturacion/invoice/invoice.module';
const Get_Invoices = gql`
query{
    allInvoices {
      id,
      clientId,
      date,
      status,
      total,
    }
  }
  `;
const Post_Invoice = gql`
mutation createInvoice($invoiceInput:InvoiceInput! ) {
  createInvoice(invoice:$invoiceInput)
   {
    message
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apollo: Apollo) { }
  GetInvoices() {
    return this.apollo.watchQuery<any>({
      query: Get_Invoices,
      //pollInterval: 500,
    });
  }
  public PostInvoice( invoiceModule: InvoiceModule) {
    return  this.apollo.mutate({
      mutation:Post_Invoice,
      variables:{
        invoiceInput: invoiceModule  
      }
    })
  }
  
}
