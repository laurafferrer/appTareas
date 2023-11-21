import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IProyecto, IProyectoPage } from 'src/app/model/model.interfaces';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';

@Component({
  selector: 'app-admin-proyecto-selection-unrouted',
  templateUrl: './admin-proyecto-selection-unrouted.component.html',
  styleUrls: ['./admin-proyecto-selection-unrouted.component.css']
})

export class AdminProyectoSelectionUnroutedComponent implements OnInit {

  @Input() usuario_id: number = 0; //filter by usuario_id

  oPage: IProyectoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProyectoToRemove: IProyecto | null = null;

  constructor(
    private oProyectoAjaxService: ProyectoAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oProyectoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IProyectoPage) => {
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

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  onSelectProyecto(oProyecto: IProyecto) {
    this.oDynamicDialogRef.close(oProyecto);
  }

}
