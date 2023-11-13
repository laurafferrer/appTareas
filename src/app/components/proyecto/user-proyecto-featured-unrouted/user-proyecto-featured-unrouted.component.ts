import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IProyecto, IProyectoPage } from 'src/app/model/model.interfaces';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-user-proyecto-featured-unrouted',
  templateUrl: './user-proyecto-featured-unrouted.component.html',
  styleUrls: ['./user-proyecto-featured-unrouted.component.css']
})

export class UserProyectoFeaturedUnroutedComponent implements OnInit {

  oPage: IProyectoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProyectoToRemove: IProyecto | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    public oSessionService: SessionAjaxService,
    private oProyectoAjaxService: ProyectoAjaxService,
    public oDialogService: DialogService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
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