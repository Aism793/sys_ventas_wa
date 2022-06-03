import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { ClienteModule } from '../pages/clientes/cliente/cliente.module';
const Get_Cliente = gql`
query{
  allClientes {
     id,
     cedula,
     primerNombre,
     primerApellido,
     correo,
     telefono,
     direccion,
     estado,
  }
}
`;
const Cliente_ById = gql`
query clienteById($id: Int!){
  clienteById(id: $id) {
     id,
     cedula,
     primerNombre,
     segundoNombre,
     primerApellido,
     segundoApellido,
     correo,
     telefono,
     direccion
  }
}
`;
const Post_Cliente = gql`
mutation createCliente($clienteInput:ClienteInput! ) {
  createCliente(cliente:$clienteInput)
   {
   cliente{
    cedula
  }
  }
}
`;
const Disable_Cliente = gql`
mutation disableCliente($cedula:String! ) {
  disableCliente(cedula:$cedula)
   {
   cliente{
    cedula
  }
  }
}
`;
const Update_Cliente = gql`
mutation updateCliente($cedula:String!, $clienteInput:ClienteInput! ) {
  updateCliente(cedula:$cedula,cliente:$clienteInput)
   {
   cliente{
    cedula
  }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(private apollo: Apollo) { }
   
  GetCliente() {
    return this.apollo.watchQuery<any>({
      query: Get_Cliente
    });

  }
  ClienteById(id:number) {
    return this.apollo.watchQuery<any>({
      query: Cliente_ById,
      variables:{
        id:id
      }
    });

  }
  public PostCliente( clienteModule: ClienteModule) {
    return  this.apollo.mutate({
      mutation:Post_Cliente,
      variables:{
        clienteInput: clienteModule
        
      }
    })
  }
  public DisableCliente( cedula: String) {
    return  this.apollo.mutate({
      mutation:Disable_Cliente,
      variables:{
        cedula: cedula
        
      }
    })
  }
  public UpdateCliente( cedula:String,clienteModule: ClienteModule) {
    return  this.apollo.mutate({
      mutation:Update_Cliente,
      variables:{
        cedula:cedula,
        clienteInput: clienteModule
       
      }
      
    })
  }
}

