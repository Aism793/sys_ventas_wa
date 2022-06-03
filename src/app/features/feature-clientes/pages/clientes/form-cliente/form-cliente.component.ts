import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@app/features/feature-clientes/services/cliente.service';
import { MensajesModule } from '@app/mensajes/mensajes.module';
import { ClienteModule } from '../cliente/cliente.module';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  modoEdicion: boolean = false;
  id:number;
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,private clienteService: ClienteService, private mensaje : MensajesModule ) { }
  formGroup = this.fb.group({
    cedula: ['', [Validators.required]],
    primerNombre: ['', [Validators.required]],
    segundoNombre: ['', []],
    primerApellido: ['', [Validators.required]],
    segundoApellido: ['', []],
    correo: ['', [Validators.required,Validators.email]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  });
  save() {
    let cliente: ClienteModule = Object.assign({}, this.formGroup.value);
    console.table(cliente); 
    if (!this.modoEdicion) {
    if (this.formGroup.valid) {
      this.clienteService.PostCliente(cliente).subscribe(t=>{
        var result =t
        this.mensaje.mensajeAlertaCorrecto("Cliente Guardado Correctamente")
        this.LimpiarFormulario(),
        error => this.mensaje.mensajeAlertaError( error.error.toString())
      });
    }else{
      this.mensaje.mensajeAlertaError('Registro no valido');
    }
    console.log("Guardando...");
  }
  else{
    console.table(cliente); 
    if (this.formGroup.valid) {
      this.clienteService.UpdateCliente(cliente.cedula,cliente).subscribe(t=>{
        var result = t
        this.mensaje.mensajeAlertaCorrecto("Cliente Actualizado Correctamente");
        this.LimpiarFormulario(),
        error => this.mensaje.mensajeAlertaError( error.error.toString())

      })  
    } else {
      this.mensaje.mensajeAlertaError('Registro no valido');
    }

  }
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      this.id = params["id"];
      this.clienteService.ClienteById(this.id).valueChanges.subscribe(t=>{
        var result= t.data.clienteById
        this.cargarFormulario(result),
        error => this.mensaje.mensajeAlertaError(error.error.toString())
       });
    });
    
  }
  cargarFormulario(cliente: ClienteModule) {

    this.formGroup.patchValue({
     cedula:cliente.cedula,
     primerNombre:cliente.primerNombre,
     segundoNombre:cliente.segundoNombre,
     primerApellido:cliente.primerApellido,
     segundoApellido:cliente.segundoApellido,
     correo:cliente.correo,
     telefono:cliente.telefono,
     direccion:cliente.direccion,
    });
   
  }
  LimpiarFormulario() {
    this.formGroup.patchValue({
     cedula:'',
     primerNombre:'',
     segundoNombre:'',
     primerApellido:'',
     segundoApellido:'',
     correo:'',
     telefono:'',
     direccion:'',
    });
  }
  get cedula() {
    return this.formGroup.get('cedula');
  }
  get primerNombre() {
    return this.formGroup.get('primerNombre');
  }
  get segundoNombre() {
    return this.formGroup.get('segundoNombre');
  }
  get primerApellido() {
    return this.formGroup.get('primerApellido');
  }
  get segundoApellido() {
    return this.formGroup.get('segundoApellido');
  }
  get correo() {
    return this.formGroup.get('correo');
  }
  get telefono() {
    return this.formGroup.get('telefono');
  }
  get direccion() {
    return this.formGroup.get('direccion');
  }

}
