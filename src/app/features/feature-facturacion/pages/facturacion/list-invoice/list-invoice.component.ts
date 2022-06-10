import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '@app/features/feature-facturacion/services/invoice.service';
import { MensajesModule } from '@app/mensajes/mensajes.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {
  invoices!: InvoiceModule[];
  displayedColumns: string[] = [
    'id',
    'clientId',
    'date',
    'status',
    'total'];
  dataSource = new MatTableDataSource<InvoiceModule>(this.invoices);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private invoiceService : InvoiceService, 
    private mensaje: MensajesModule) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.ConsultarInvoices();
  }
  ConsultarInvoices() {
    this.invoiceService.GetInvoices().valueChanges.subscribe(t=>{
      this.invoices= t.data.allInvoices
      this.dataSource.data=this.invoices
      this.renderizarTabla(),
     error => this.mensaje.mensajeAlertaError(error.error.toString())
    });
  }
   private renderizarTabla() {
    this.dataSource = new MatTableDataSource(this.invoices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

}
