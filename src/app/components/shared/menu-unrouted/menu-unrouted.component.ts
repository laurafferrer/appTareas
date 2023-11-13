import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUsuario, SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUserName: string = "";
  oSessionUsuario: IUsuario | null = null;

  constructor(
    private oSessionService: SessionAjaxService,
    private oUsuarioAjaxService: UsuarioAjaxService
  ) {
    this.strUserName = oSessionService.getUsername();
    this.oUsuarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oSessionUsuario = oUsuario;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strUserName = this.oSessionService.getUsername();
          this.oUsuarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oUsuario: IUsuario) => {
              this.oSessionUsuario = oUsuario;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
        if (data.type == 'logout') {
          this.strUserName = "";
        }
      }
    });


  }
}


