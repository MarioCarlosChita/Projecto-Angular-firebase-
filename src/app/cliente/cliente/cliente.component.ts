import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { ClienteViewModal } from '../modal/cliente-view-modal';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {



  clientes:ClienteViewModal [] = [] ;

  constructor(
    private modalService:NgbModal, 
    private clientesservice:ClienteService
    ) { }

  ngOnInit() {
        this.mostrarClientes();      
  }

  

  AddCliente(){
       const modal = this.modalService.open(ClienteFormComponent);
       modal.result.then(
         this.handleClienteFormComponent.bind(this) , 
         this.handleClienteFormComponent.bind(this)
         );

      this.mostrarClientes();
  }
  
  handleClienteFormComponent(response) {
      if(response === Object(response)){
         if(response.modoInsercao){
            response.cliente.id = response.id;
            this.clientes.unshift(response.cliente);
            
         }
      }else{
          let index = this.clientes.findIndex(value => value.id == response.id);
          this.clientes[index] = response.cliente;
          
      }
  }
  
  mostrarClientes(){
      this.clientesservice.getClientes().subscribe(Response =>{
           this.clientes = [];
           Response.docs.forEach(value =>{
             const data =  value.data();
             const id =   value.id;
             console.log(id);
             console.log(data.Nome);
             console.log(data.Casado);

             const cliente :ClienteViewModal ={
                 id: id , 
                 Nome:data.Nome,
                 Endereco:data.Endereco , 
                 Casado:data.Casado,
                 dataMod:data.dataMod.toDate()
             };
             this.clientes.push(cliente);
           });
      }) ;   
  }
  

  checkedCasado(index : number){
      
       this.clientes[index].Casado = !this.clientes[index].Casado;
       const obj   ={
          Casado: this.clientes[index].Casado
       };
      const id = this.clientes[index].id ;
      this.clientesservice.editarClientesParcial(id , obj);
  }
  

  EditarClick(cliente:ClienteViewModal){

  

    const modal = this.modalService.open(ClienteFormComponent);
    modal.result.then(this.handleClienteFormComponent.bind(this),this.handleClienteFormComponent.bind(this));   
    modal.componentInstance.modalInsercao = false;
    modal.componentInstance.cliente = cliente;
  
  }

  DeletarCliente(clienteId:string  , index:number){
      this.clientesservice.deletarCliente(clienteId)
      .then(()=> {this.clientes.splice(index, 1) ;})
      .catch(err => console.error(err));

  }
}
