import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ITarea, ITareaPage, IProyecto, IUsuario } from 'src/app/model/model.interfaces';
import { AdminTareaDetailUnroutedComponent } from '../admin-tarea-detail-unrouted/admin-tarea-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';


@Component({
  providers: [ConfirmationService],
  selector: 'app-user-tarea-plist-unrouted',
  templateUrl: './user-tarea-plist-unrouted.component.html',
  styleUrls: ['./user-tarea-plist-unrouted.component.css']
})

export class UserTareaPlistUnroutedComponent implements OnInit {

  @Input()
  set id_usuario(value: number) {
    if (value) {
      this.id_usuario_filter = value;
    } else {
      this.id_usuario_filter = 0;
    }
    this.getPage();
  }
  get id_usuario(): number {
    return this.id_usuario_filter;
  }

  @Input()
  set id_proyecto(value: number) {
    if (value) {
      this.id_proyecto_filter = value;
    } else {
      this.id_proyecto_filter = 0;
    }
    this.getPage();
  }
  get id_proyecto(): number {
    return this.id_proyecto_filter;
  }

  id_proyecto_filter: number = 0; //filter by proyecto
  id_usuario_filter: number = 0; //filter by usuario

  oPage: ITareaPage | undefined;
  oUsuario: IUsuario | null = null; // data of usuario if id_usuario is set for filter
  oProyecto: IProyecto | null = null; // data of proyecto if id_proyecto is set for filter
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oTareaToRemove: ITarea | null = null;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    public oSessionService: SessionAjaxService,
    private oProyectoAjaxService: ProyectoAjaxService,
    private oTareaAjaxService: TareaAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_usuario > 0) {
      this.getUsuario();
    }
    if (this.id_proyecto > 0) {
      this.getProyecto();
    }
  }

  getPage(): void {
    this.oTareaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_usuario_filter, this.id_proyecto_filter).subscribe({
      next: (data: ITareaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  

  ref: DynamicDialogRef | undefined;

  doView(u: ITarea) {
    this.ref = this.oDialogService.open(AdminTareaDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of tarea',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: ITarea) {
    this.oTareaToRemove = u;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The tarea has been removed.", '', { duration: 2000 });
        this.oTareaAjaxService.removeOne(this.oTareaToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The tarea hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The tarea hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

  getUsuario(): void {
    this.oUsuarioAjaxService.getOne(this.id_usuario).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  getProyecto(): void {
    this.oProyectoAjaxService.getOne(this.id_proyecto).subscribe({
      next: (data: IProyecto) => {
        this.oProyecto = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }


}
