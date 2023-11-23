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

@Component({
  providers: [ConfirmationService],
  selector: 'app-user-tarea-plist-unrouted',
  templateUrl: './user-tarea-plist-unrouted.component.html',
  styleUrls: ['./user-tarea-plist-unrouted.component.css']
})

export class UserTareaPlistUnroutedComponent implements OnInit {
  @Input() id_usuario: number = 0; //filter by user
  @Output() tarea_selection = new EventEmitter<ITarea>();

  activeOrder: boolean = true; //true=new false=popular always desc
  activeTarea: ITarea | null = null;

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
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByTareasNumberDesc();
    }
    if (this.id_usuario > 0) {
      this.getUsuario();
    }
  }

  getPage(): void {
    this.oTareaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_usuario).subscribe({
      next: (data: ITareaPage) => {
        this.oPage = data;
        if (this.oPage.content.length > 0) {
          this.activeTarea = this.oPage.content[0];
          this.tarea_selection.emit(this.activeTarea);
        }
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByTareasNumberDesc();
    }
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

  doShowReplies(oTarea: ITarea) {
    this.tarea_selection.emit(oTarea);
    this.activeTarea = oTarea;
    return false;
  }


  onOrderChange(event: any) {
    this.activeOrder = !this.activeOrder;
    this.orderDirection = "desc";
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByTareasNumberDesc();
    }
  }

  getPageByTareasNumberDesc(): void {
    this.oTareaAjaxService.getPageByTareasNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page, 0).subscribe({
      next: (data: ITareaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.activeTarea = this.oPage.content[0];
        this.tarea_selection.emit(this.activeTarea);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}