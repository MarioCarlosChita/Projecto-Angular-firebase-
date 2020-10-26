import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { MenuComponent } from './menu/menu.component';
import { ProdutosComponent } from './produtos/produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteFormComponent,
    MenuComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule , 
    ReactiveFormsModule ,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule ,   
    NgbModule , 
    FormsModule, 

  ],
  providers: [],
  bootstrap: [AppComponent] , 
  entryComponents:[ClienteFormComponent]

})
export class AppModule { }
 