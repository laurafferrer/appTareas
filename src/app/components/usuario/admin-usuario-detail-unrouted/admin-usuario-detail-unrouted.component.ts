import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from '../../../service/usuario.ajax.service';

@Component({
  selector: 'app-admin-usuario-detail-unrouted',
  templateUrl: './admin-usuario-detail-unrouted.component.html',
  styleUrls: ['./admin-usuario-detail-unrouted.component.css']
})
export class AdminUsuarioDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oUsuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    @Optional() public ref:DynamicDialogRef,
    @Optional() public config:DynamicDialogConfig
  ) {     
    if (config){
      if (config.data){
        this.id = config.data.id;
      }
    }    
  }

  ngOnInit() {
    console.log(this.id);
    this.getOne();
  }

  getOne(): void {
    this.oUsuarioAjaxService.getOne(this.id).subscribe({    
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
