import { ITarea, ITareaPage } from 'src/app/model/model.interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-tarea-selection-unrouted',
  templateUrl: './admin-tarea-selection-unrouted.component.html',
  styleUrls: ['./admin-tarea-selection-unrouted.component.css']
})
export class AdminTareaSelectionUnroutedComponent implements OnInit {

  @Input() id_usuario: number = 0;
  oPage: ITareaPage | undefined;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oTareaToRemove: ITarea | null = null;

  constructor(

    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef,
    private TareaAjaxService: TareaAjaxService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.TareaAjaxService.getPage(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      this.orderDirection, this.id_usuario).subscribe({
        next: (data: ITareaPage) => {
          this.oPage = data;
          this.oPaginatorState.pageCount = data.totalPages;
          console.log(this.oPaginatorState);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
  }

  onPageChange(event: PaginatorState) {
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


  onSelectTarea(tarea: ITarea) {
    this.oDynamicDialogRef.close(tarea);
  }
}