import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../modal/cliente';
import { ClienteViewModal } from '../modal/cliente-view-modal';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteColection  = 'clientes';

  constructor( private db:AngularFirestore) {}

  getClientes():Observable<firebase.firestore.QuerySnapshot> {
      return this.db.collection<Cliente>(this.clienteColection,ref=>ref.orderBy('Nome','asc'))
             .get();
  }
  
  salvarClientes(cliente:Cliente): Promise<DocumentReference>{
     return this.db.collection(this.clienteColection).add(cliente);
  }
   editarClientes(cliente:ClienteViewModal): Promise<void>{
         return this.db.collection(this.clienteColection).doc(cliente.id).update(cliente);
   }
  
   editarClientesParcial(id:string ,obj: Object): Promise<void>{
     return this.db.collection(this.clienteColection).doc(id).update(obj);
   }
   deletarCliente(id:string): Promise<void>{
      return this.db.collection(this.clienteColection).doc(id).delete();
   }
 

}
