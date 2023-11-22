import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario, SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';
import { UserUsuarioDetailUnroutedComponent } from '../../usuario/user-usuario-detail-unrouted/user-usuario-detail-unrouted.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUserName: string = "";
  oSessionUser: IUsuario | null = null;
  strUrl: string = "";

  constructor(
    private oSessionService: SessionAjaxService,
    public oDialogService: DialogService,
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oRouter: Router
  ) {
    
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })
    
    this.strUserName = oSessionService.getUsername();
    this.oUsuarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oSessionUser = oUsuario;
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
              this.oSessionUser = oUsuario;
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

  doSessionUserView($event: Event) {
    if (this.oSessionUser) {
      let ref: DynamicDialogRef | undefined;
      ref = this.oDialogService.open(UserUsuarioDetailUnroutedComponent, {
        data: {
          id: this.oSessionUser.id
        },
        header: 'View of usuario',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });
    }
    return false;
    //$event.preventDefault
  }

}


