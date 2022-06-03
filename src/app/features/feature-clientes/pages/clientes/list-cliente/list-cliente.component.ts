import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '@app/features/feature-clientes/services/cliente.service';
import { Subscription } from 'rxjs';
import { ClienteModule } from '../cliente/cliente.module';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

suscription: Subscription;
  clientes!: ClienteModule[];
  /*= [
    { id: 11, cedula: '1065',primerNombre:'Micheel',segundoNombre:'Tati',primerApellido:'Rojas',segundoApellido:'Hoyos',correo:'mi@gmail.com',
  
     telefono:'311', direccion:'mz 13',estado:'Activo'},
     { id: 13, cedula: '5323',primerNombre:'Isma',segundoNombre:'Antonio',primerApellido:'Rodrigez',segundoApellido:'Hoyos',correo:'mi@gmail.com',
  
     telefono:'311', direccion:'mz 13',estado:'Activo'}
  
  ];*/
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
  constructor(private clienteService : ClienteService) {
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
   this.ConsultarClientesidad();

  }
  ConsultarClientesidad() {
   this.clienteService.GetCliente().valueChanges.subscribe(t=>{
    var result = t.data.allClientes
    this.dataSource.data= result
   });
    //this.dataSource.data     
  }
  Eliminar(cedula: string) {
    console.log ("Eliminado cliente con cedula: "+ cedula );
    this.clienteService.DisableCliente(cedula).subscribe(t=>{
      this.ConsultarClientesidad();
      var result =t
    });
    
  }
}
