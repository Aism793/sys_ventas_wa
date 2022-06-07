import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModule } from '@app/features/feature-clientes/pages/clientes/cliente/cliente.module';
import { ClienteService } from '@app/features/feature-clientes/services/cliente.service';
import { Product } from '@app/features/feature-productos/models/product';
import { ProductoService } from '@app/features/feature-productos/services/producto.service';
import { MensajesModule } from '@app/mensajes/mensajes.module';


@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  modoEdicion: boolean = false;
  id:number;
  edit: string = "";
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private mensaje : MensajesModule ) { }
  formGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    unidad: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    categoria: ['', [Validators.required]]
  });
  save() {
    let producto: Product = Object.assign({}, this.formGroup.value);
    console.table(producto); 
    if (!this.modoEdicion) {
    if (this.formGroup.valid) {
      this.productoService.PostProducto(producto).subscribe(t=>{
        var result =t
        this.mensaje.mensajeAlertaCorrecto("Producto Guardado Correctamente")
        this.LimpiarFormulario(),
        error => this.mensaje.mensajeAlertaError( error.error.toString())
      });
    }else{
      this.mensaje.mensajeAlertaError('Registro no valido');
    }
    console.log("Guardando...");
  }
  else{
    console.table(producto); 
    if (this.formGroup.valid) {
      this.productoService.UpdateProducto(producto.id,producto).subscribe(t=>{
        var result = t
        this.mensaje.mensajeAlertaCorrecto("Producto Actualizado Correctamente");
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
      this.edit = params.edit;
      this.modoEdicion = true;
      this.id = params["id"];
      this.productoService.ProductoById(this.id).valueChanges.subscribe(t=>{
        var result= t.data.productoById
        this.cargarFormulario(result),
        error => this.mensaje.mensajeAlertaError(error.error.toString())
       });
    });

  }


  cargarFormulario(producto: Product) {

    this.formGroup.patchValue({
     nombre:producto.id,
     descripcion:producto.descripcion,
     unidad:producto.unidad,
     cantidad:producto.cantidad,
     precio:producto.precio,
     categoria:producto.categoria,
    });
   
  }
  LimpiarFormulario() {
    this.formGroup.patchValue({
     nombre:'',
     descripcion:'',
     unidad:'',
     cantidad:'',
     precio:'',
     categoria:'',
    });
  }
  get nombre() {
    return this.formGroup.get('nombre');
  }
  get descripcion() {
    return this.formGroup.get('descripcion');
  }
  get unidad() {
    return this.formGroup.get('unidad');
  }
  get cantidad() {
    return this.formGroup.get('cantidad');
  }
  get precio() {
    return this.formGroup.get('precio');
  }
  get categoria() {
    return this.formGroup.get('categoria');
  }

}
