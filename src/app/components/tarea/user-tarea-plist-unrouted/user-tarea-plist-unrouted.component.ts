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

  @Output() tarea_change = new EventEmitter<Boolean>();

  oPage: ITareaPage | undefined;
  oUsuario: IUsuario | null = null; // data of usuario if usuario_id is set for filter
  oProyecto: IProyecto | null = null; // data of proyecto if proyecto_id is set for filter
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
  }

  getPage(): void {
    this.oTareaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
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

  postNewTarea(): void {
    if ( this.oSessionService.isSessionActive()) {

      this.ref = this.oDialogService.open(UserTareaFormUnroutedComponent, {
        data: {
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

}