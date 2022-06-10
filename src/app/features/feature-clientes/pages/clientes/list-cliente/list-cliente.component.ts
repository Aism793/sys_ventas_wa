import {Component,  Inject, OnDestroy, OnInit, Optional,  ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {ClienteService} from '@app/features/feature-clientes/services/cliente.service';
import {MensajesModule} from '@app/mensajes/mensajes.module';
import {ClienteModule} from '../cliente/cliente.module';
import { Subscription} from "rxjs";

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit, OnDestroy {
  clientes!: ClienteModule[];
  dialog: boolean = false;
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private getClientes: Subscription;

  constructor(private clienteService: ClienteService,
              private mensaje: MensajesModule,
              private router: Router,
              @Optional() private matDialogRef?: MatDialogRef<ListClienteComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public dataRecieved?: any
  ) {
  }

  ngOnDestroy(): void {
    this.getClientes.unsubscribe();
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
    this.ConsultarClientes();

  }

  verifyDataRecieved(): void {
    if (!this.dataRecieved) return;
    this.dialog = this.dataRecieved.dialog;
  }

  ConsultarClientes() {
    this.getClientes = this.clienteService.GetCliente().valueChanges.subscribe(t => {
      this.clientes = t.data.allClientes
      this.dataSource.data = this.clientes
      this.renderizarTabla(),
        error => this.mensaje.mensajeAlertaError(error.error.toString())
    })
  }

  Eliminar(cedula: string) {
    console.log("Eliminado cliente con cedula: " + cedula);
    this.clienteService.DisableCliente(cedula).subscribe(t => {
      var result = t;
      this.ConsultarClientes()
      this.mensaje.mensajeAlertaCorrecto("Cliente desahabilitado Correctamente"),
        error => this.mensaje.mensajeAlertaError(error.error.toString())
    });

  }

  Editar(id: number) {
    var edit = "editar";
    this.router.navigate(["/a/clientes/editarCliente/" + edit + "/" + id]);
  }

  sendId(cliente: ClienteModule) {
    this.matDialogRef.close({data: cliente});
  }

  private renderizarTabla() {
    this.dataSource = new MatTableDataSource(this.clientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
