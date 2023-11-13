import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IProyecto, IProyectoPage } from 'src/app/model/model.interfaces';
import { AdminProyectoDetailUnroutedComponent } from '../admin-proyecto-detail-unrouted/admin-proyecto-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-proyecto-plist-unrouted',
  templateUrl: './admin-proyecto-plist-unrouted.component.html',
  styleUrls: ['./admin-proyecto-plist-unrouted.component.css']
})

export class AdminProyectoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IProyectoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProyectoToRemove: IProyecto | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oProyectoAjaxService: ProyectoAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getPage(): void {
    this.oProyectoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IProyectoPage) => {
        this.oPage = data;
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

  doView(u: IProyecto) {
    this.ref = this.oDialogService.open(AdminProyectoDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of proyecto',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IProyecto) {
    this.oProyectoToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The proyecto has been removed.", '', { duration: 2000 });
        this.oProyectoAjaxService.removeOne(this.oProyectoToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The proyecto hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The proyecto hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

}