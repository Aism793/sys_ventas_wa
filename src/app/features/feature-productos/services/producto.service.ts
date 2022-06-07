import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product';

const Get_Producto = gql`
query{
  allProductos {
    nombre,
    descripcion,
    unidad,
    cantidad,
    precio,
    categoria,
  }
}
`;
const Producto_ById = gql`
query productoById($id: Int!){
  productoById(id: $id) {
    id,
    nombre,
    descripcion,
    unidad,
    cantidad,
    precio,
    categoria
  }
}
`;
const Post_Producto = gql`
mutation createProducto($productoInput:ProductoInput! ) {
  createProducto(producto:$productoInput)
   {
   producto{
    id
  }
  }
}
`;
const Update_Producto = gql`
mutation updateProducto($id:Int!, $productoInput:ProductoInput! ) {
  updateProducto(id:$id,producto:$productoInput)
   {
   producto{
    id
  }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private apollo: Apollo) { }
 
  GetProducto() {
    return this.apollo.watchQuery<any>({
      query: Get_Producto,
      pollInterval: 500,
    });

  }
  ProductoById(id:number) {
    return this.apollo.watchQuery<any>({
      query: Producto_ById,
      variables:{
        id:id
      }
    });

  }
  public PostProducto( producto: Product) {
    return  this.apollo.mutate({
      mutation:Post_Producto,
      variables:{
        productoInput: producto
        
      }
    })
  }
  public UpdateProducto( id: number, producto: Product ) {
    return  this.apollo.mutate({
      mutation:Update_Producto,
      variables:{
        id: id,
        productoInput: producto
       
      }
      
    })
  }

}

