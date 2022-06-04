import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Invoice} from "@features/feature-facturacion/models/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }
  getInvoices(): Observable<Invoice[]>
  {
    return this.httpClient.get<Invoice[]>("http://localhost:5286/api/invoice");
  }
}
