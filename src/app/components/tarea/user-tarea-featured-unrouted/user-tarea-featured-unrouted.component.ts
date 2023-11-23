import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ITarea, ITareaPage, IUsuario } from 'src/app/model/model.interfaces';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-user-tarea-featured-unrouted',
  templateUrl: './user-tarea-featured-unrouted.component.html',
  styleUrls: ['./user-tarea-featured-unrouted.component.css']
})
export class UserTareaFeaturedUnroutedComponent implements OnInit {

  oPage: ITareaPage | undefined;
  oUsuario: IUsuario | null = null; // data of user if id_user is set for filter
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oTareaToRemove: ITarea | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    public oSessionService: SessionAjaxService,
    private oTareaService:  TareaAjaxService,
    public oDialogService: DialogService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oTareaService.getPageByTareasNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page, 0).subscribe({
      next: (data: ITareaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }



}
