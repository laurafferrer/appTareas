import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionAjaxService } from './service/session.ajax.service';
import { CryptoService } from './service/crypto.service';
import { UsuarioAjaxService } from './service/usuario.ajax.service';
import { ProyectoAjaxService } from './service/proyecto.ajax.service';
import { TareaAjaxService } from './service/tarea.ajax.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SessionAjaxService,
    CryptoService,
    UsuarioAjaxService,
    ProyectoAjaxService,
    TareaAjaxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
