import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from '@app/features/feature-clientes/services/cliente.service';
import { MensajesModule } from '@app/mensajes/mensajes.module';
import { Subscription } from 'rxjs';
import { ClienteModule } from '../cliente/cliente.module';

@Component({
  selector: 'app-list-cliente',
  template: `
  <button (click)="sendId(message)">Send Id</button>
`,
templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit{
  @Output() messageEvent = new EventEmitter<number>();
  message: number;
  suscription: Subscription;
  clientes!: ClienteModule[];
  displayedColumns: string[] = [
    'id',
    'cedula',
    'primerNombre',
    'primerApellido',
    'correo',
    'telefono',
    'direccion',
    'estado',
    'options'];
  dataSource = new MatTableDataSource<ClienteModule>(this.clientes);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private clienteService : ClienteService, private mensaje: MensajesModule, private router: Router) {
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
   this.ConsultarClientes();
  }
  
  ConsultarClientes() {
   this.clienteService.GetCliente().valueChanges.subscribe(t=>{
    this.clientes =t.data.allClientes
    this.dataSource.data= this.clientes
    this.renderizarTabla(),
    error => this.mensaje.mensajeAlertaError(error.error.toString())
   });
  }
  Eliminar(cedula: string) {
    console.log ("Eliminado cliente con cedula: "+ cedula );
    this.clienteService.DisableCliente(cedula).subscribe(t=>{
      var result =t;
      this.ConsultarClientes()
      this.mensaje.mensajeAlertaCorrecto("Cliente desahabilitado Correctamente"),
      error => this.mensaje.mensajeAlertaError(error.error.toString())
    });

  }
   Editar(id:number){
     var edit = "editar";
     this.router.navigate(  ["/a/clientes/editarCliente/"+edit+"/"+id]);
   }
   sendId(message: number) {
     this.message=message;
    this.messageEvent.emit(this.message);
    console.log(message);
  }
   private renderizarTabla() {
    this.dataSource = new MatTableDataSource(this.clientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  
 
}
