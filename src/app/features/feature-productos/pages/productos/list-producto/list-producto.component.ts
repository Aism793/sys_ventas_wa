import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListClienteComponent } from '@app/features/feature-clientes/pages/clientes/list-cliente/list-cliente.component';
import { InvoiceDetailModule } from '@app/features/feature-facturacion/pages/facturacion/invoice-detail/invoice-detail.module';
import { Product } from '@app/features/feature-productos/models/product';
import { ProductoService } from '@app/features/feature-productos/services/producto.service';
import { MensajesModule } from '@app/mensajes/mensajes.module';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  productos: Product[]=[
    {id:1,nombre:"limon",descripcion:"limon dulce", unidad:"unitario", cantidad:100, precio:100, categoria:"1"},
    {id:2,nombre:"mango",descripcion:"mago dulce", unidad:"unitario", cantidad:100, precio:100, categoria:"1"},
    {id:3,nombre:"pc",descripcion:"pc imbux", unidad:"unitario", cantidad:100, precio:1000, categoria:"2"}
  ];
  cantidad:number=0;
  productosEnviar:InvoiceDetailModule[]=[];
  dialog: boolean = false;
  displayedColumns: string[] = [
    'id',
    'nombre',
    'precio',
    'options'];
  dataSource = new MatTableDataSource<Product>(this.productos);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private productoService : ProductoService, 
    private mensaje: MensajesModule, 
    private router: Router, 
    @Optional() private matDialogRef?: MatDialogRef<ListProductoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dataRecieved?: any
    ) {
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
    this.verifyDataRecieved();
    this.ConsultarProductos();

  }

  verifyDataRecieved(): void {
    if(!this.dataRecieved) return;
    this.dialog = this.dataRecieved.dialog;
  }
  ConsultarProductos() {
     this.dataSource.data= this.productos;
     this.renderizarTabla(),
     error => this.mensaje.mensajeAlertaError(error.error.toString())
   }

   selecionarProducto(producto: Product) {
    
   this.CantidadAComprar(producto);

  
  }
  onNoClick(): void {
    this.productosEnviar= null;
    this.matDialogRef.close();
  }
  save(){
    if (this.productosEnviar.length!=0){
      this.matDialogRef.close({ data: this.productosEnviar });
    }
    else{
      this.matDialogRef.close();
    }
   
  }
   private renderizarTabla() {
    this.dataSource = new MatTableDataSource(this.productos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
CantidadAComprar(producto:Product ) {
  Swal.fire({
    title: '¿Que cantidad de '+producto.nombre +' desea?',
    input: 'number',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      this.productosEnviar.push({ productId: producto.id, quantity:Number(result.value.login), price: producto.precio, total:0 });
      this.mensaje.mensajeAlertaCorrecto("Se ha añadido el producto:  "+producto.nombre+ " con una cantidad de:  "+ result.value.login+ " Correctamente")
    }
    
  })
 
}

}
