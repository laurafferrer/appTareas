import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IProyecto, IProyectoPage} from 'src/app/model/model.interfaces';
import { AdminProyectoDetailUnroutedComponent } from '../admin-proyecto-detail-unrouted/admin-proyecto-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-user-proyecto-plist-unrouted',
  templateUrl: './user-proyecto-plist-unrouted.component.html',
  styleUrls: ['./user-proyecto-plist-unrouted.component.css']
})

export class UserProyectoPlistUnroutedComponent implements OnInit {

  @Output() proyecto_selection = new EventEmitter<IProyecto>();

  activeOrder: boolean = true; //true=new false=popular always desc
  activeProyecto: IProyecto | null = null;

  oPage: IProyectoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 50, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProyectoToRemove: IProyecto | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    public oSessionService: SessionAjaxService,
    private oProyectoAjaxService: ProyectoAjaxService,
  ) { }

  ngOnInit() {
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByTareasNumberDesc();
    }
  }

  getPage(): void {
    this.oProyectoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
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
      this.getPageByTareasNumberDesc();
    }
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
      this.getPageByTareasNumberDesc();
    }
  }

  getPageByTareasNumberDesc(): void {
    this.oProyectoAjaxService.getPageByTareasNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page, 0).subscribe({
      next: (data: IProyectoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}