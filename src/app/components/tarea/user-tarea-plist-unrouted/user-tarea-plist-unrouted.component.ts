import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { UserProyectoFormUnroutedComponent } from '../../proyecto/user-proyecto-form-unrouted/user-proyecto-form-unrouted.component';
import { UserTareaFormUnroutedComponent } from '../user-tarea-form-unrouted/user-tarea-form-unrouted.component';


@Component({
  providers: [ConfirmationService],
  selector: 'app-user-tarea-plist-unrouted',
  templateUrl: './user-tarea-plist-unrouted.component.html',
  styleUrls: ['./user-tarea-plist-unrouted.component.css']
})

export class UserTareaPlistUnroutedComponent implements OnInit {

  @Input()
  set usuario_id(value: number) {
    if (value) {
      this.usuario_id_filter = value;
    } else {
      this.usuario_id_filter = 0;
    }
    this.getPage();
  }
  get usuario_id(): number {
    return this.usuario_id_filter;
  }

  @Input()
  set proyecto_id(value: number) {
    if (value) {
      this.proyecto_id_filter = value;
    } else {
      this.proyecto_id_filter = 0;
    }
    this.getPage();
  }
  get proyecto_id(): number {
    return this.proyecto_id_filter;
  }

  @Output() tarea_change = new EventEmitter<Boolean>();

  proyecto_id_filter: number = 0; //filter by thread
  usuario_id_filter: number = 0; //filter by thread

  oPage: ITareaPage | undefined;
  oUser: IUsuario | null = null; // data of user if usuario_id is set for filter
  oThread: IProyecto | null = null; // data of thread if proyecto_id is set for filter
  orderField: string = "id";
  orderDirection: string = "desc";
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
    if (this.usuario_id > 0) {
      this.getUsuario();
    }
    if (this.proyecto_id > 0) {
      this.getProyecto();
    }
  }

  getPage(): void {
    this.oTareaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.usuario_id_filter, this.proyecto_id_filter).subscribe({
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
            this.tarea_change.emit(true);
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
    this.oUsuarioAjaxService.getOne(this.usuario_id).subscribe({
      next: (data: IUsuario) => {
        this.oUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  getProyecto(): void {
    this.oProyectoAjaxService.getOne(this.proyecto_id).subscribe({
      next: (data: IProyecto) => {
        this.oThread = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  postNewTarea(): void {
    if (this.proyecto_id_filter > 0 && this.oSessionService.isSessionActive()) {

      this.ref = this.oDialogService.open(UserTareaFormUnroutedComponent, {
        data: {
          proyecto_id: this.proyecto_id_filter,
        },
        header: 'Post a new tarea',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });

      this.ref.onClose.subscribe((nTarea: number) => {
        this.getPage();
        this.tarea_change.emit(true);
      });
    }
  }



  postNewProyecto(): void {
    if (this.proyecto_id_filter > 0 && this.oSessionService.isSessionActive()) {

      this.ref = this.oDialogService.open(UserProyectoFormUnroutedComponent, {
        data: {
          proyecto_id: this.proyecto_id_filter,
        },
        header: 'Post a new proyecto',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });

      this.ref.onClose.subscribe((nThread: number) => {
        this.getPage();
        this.tarea_change.emit(true);
      });
    }
  }
}