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
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private apollo: Apollo) { }
  public GetCliente() {
    return this.apollo.watchQuery<any>({
      query: Get_Cliente
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
}
