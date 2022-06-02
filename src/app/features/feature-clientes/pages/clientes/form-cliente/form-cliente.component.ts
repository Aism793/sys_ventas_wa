import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,) { }
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
