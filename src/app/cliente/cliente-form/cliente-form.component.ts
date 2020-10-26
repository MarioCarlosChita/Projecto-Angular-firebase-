import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import {FormBuilder, FormGroup ,RequiredValidator,Validator, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../modal/cliente';
import { ClienteViewModal } from '../modal/cliente-view-modal';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  clienteForm : FormGroup; 
  modalInsercao : boolean =  true;
  cliente:ClienteViewModal;

  constructor(
    private formbuilder:FormBuilder , 
    public activeModal: NgbActiveModal  , 
    private clienteservice:ClienteService
    ) {}

  carregarTudo(cliente){
     this.clienteForm.patchValue(cliente);
  }


  ngOnInit() {
    this.clienteForm  = this.formbuilder.group({
      Nome: ['' ,Validators.required], 
      Endereco: ['' ,Validators.required] , 
      Casado: false
   });

     if(!this.modalInsercao){
        this.carregarTudo(this.cliente); 
      }
      
  }

  saveCliente(){}


  salvarCliente(){

    if(this.clienteForm.invalid){return ;}
        if(this.modalInsercao){
          let cliente:Cliente=this.clienteForm.value;
          cliente.dataMod = new Date();
          cliente.datacad =  new Date();
          this.clienteservice.salvarClientes(cliente)
          .then(response=>this.handleSucessSave(response, cliente))
          .catch(err=>console.log(err));
          alert('salvo...');


        }else{
           let cliente:ClienteViewModal=this.clienteForm.value;
           cliente.id =  this.cliente.id;
           cliente.dataMod  =  new Date();
           this.clienteservice.editarClientes(cliente)
           .then(()=>this.handleSucessSaveEdit(cliente))
           .catch(err=>console.log(err));;
           alert('editar...');
        }
          

  }

  handleSucessSave(response: DocumentReference ,  cliente:Cliente){
        this.activeModal.dismiss({
             cliente:cliente ,
             id:response.id ,
             modalInsercao: true,           
        });     
  }
  
  handleSucessSaveEdit(cliente :ClienteViewModal){
       this.activeModal.dismiss({cliente:cliente , id:cliente.id ,modalInsercao: false});
  }
  

}
