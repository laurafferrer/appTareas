import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IProyecto, IProyectoPage, ITarea, IUsuario} from 'src/app/model/model.interfaces';
import { AdminProyectoDetailUnroutedComponent } from '../admin-proyecto-detail-unrouted/admin-proyecto-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { Subject } from 'rxjs';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';

@Component({
  selector: 'app-user-proyecto-plist-unrouted',
  templateUrl: './user-proyecto-plist-unrouted.component.html',
  styleUrls: ['./user-proyecto-plist-unrouted.component.css']
})

export class UserProyectoPlistUnroutedComponent implements OnInit {

  @Input() id_tarea: number = 0; //filter by user
  @Input() reload: Subject<boolean> = new Subject<boolean>();
  @Output() proyecto_selection = new EventEmitter<IProyecto>();

  activeOrder: boolean = true; //true=new false=popular always desc
  activeProyecto: IProyecto | null = null;

  oPage: IProyectoPage | undefined;
  oTarea: ITarea | null = null; // data of user if id_user is set for filter
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 50, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProyectoToRemove: IProyecto | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oTareaService: TareaAjaxService,
    public oSessionService: SessionAjaxService,
    private oProyectoService: ProyectoAjaxService,
  ) { }

  ngOnInit() {
    this.reload.subscribe(response => {
      if (response) {
        this.getPage();
      }
    });
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByProyectoNumberDesc();
    }
    if (this.id_tarea > 0) {
      this.getTarea();
    }
  }

  getPage(): void {
    this.oProyectoService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_tarea).subscribe({
      next: (data: IProyectoPage) => {
        this.oPage = data;
        if (this.oPage.content.length > 0) {
          this.activeProyecto = this.oPage.content[0];
          this.proyecto_selection.emit(this.activeProyecto);
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
      this.getPageByProyectoNumberDesc();
    }
  }



  getTarea(): void {
    this.oTareaService.getOne(this.id_tarea).subscribe({
      next: (data: ITarea) => {
        this.oTarea = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  doShowTareas(oProyecto: IProyecto) {
    this.proyecto_selection.emit(oProyecto);
    this.activeProyecto = oProyecto;
    return false;
  }

  onOrderChange(event: any) {
    this.activeOrder = !this.activeOrder;
    this.orderDirection = "desc";
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByProyectoNumberDesc();
    }
  }

  getPageByProyectoNumberDesc(): void {
    this.oProyectoService.getPageByTareasNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page, 0).subscribe({
      next: (data: IProyectoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.activeProyecto = this.oPage.content[0];
        this.proyecto_selection.emit(this.activeProyecto);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }
}
