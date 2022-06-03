import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@app/features/feature-clientes/services/cliente.service';
import { ClienteModule } from '../cliente/cliente.module';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,private clienteService: ClienteService ) { }
  formGroup = this.fb.group({
    cedula: ['', [Validators.required]],
    primerNombre: ['', [Validators.required]],
    segundoNombre: ['', []],
    primerApellido: ['', [Validators.required]],
    segundoApellido: ['', []],
    correo: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  });
  save() {
    let cliente: ClienteModule = Object.assign({}, this.formGroup.value);
    console.table(cliente); 
    
    this.clienteService.PostCliente(cliente).subscribe(t=>{
      debugger
      var result =t
    });
   console.log("Guardando...");
  }
  ngOnInit(): void {
    
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
