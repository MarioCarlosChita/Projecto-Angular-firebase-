import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
    {
      path:'' ,component:ClienteComponent
    } , 
     {
        path:'produtos' ,
         component:ProdutosComponent
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
