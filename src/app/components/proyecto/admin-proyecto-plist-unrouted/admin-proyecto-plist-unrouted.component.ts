import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';


import { MatSnackBar } from '@angular/material/snack-bar';
import { IProyecto, ITarea, IProyectoPage } from 'src/app/model/model.interfaces';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { AdminProyectoDetailUnroutedComponent } from '../admin-proyecto-detail-unrouted/admin-proyecto-detail-unrouted.component';
import { Subject } from 'rxjs';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';



@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-proyecto-plist-unrouted',
  templateUrl: './admin-proyecto-plist-unrouted.component.html',
  styleUrls: ['./admin-proyecto-plist-unrouted.component.css']
})

export class AdminProyectoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_tarea: number = 0;

  oPage: IProyectoPage | undefined;
  oTarea: ITarea | null = null;
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
    private oMatSnackBar: MatSnackBar,
    private oTareaAjaxService: TareaAjaxService
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_tarea > 0) {
      this.getUsuario();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }


  getPage(): void {
    this.oProyectoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_tarea).subscribe({
      next: (data: IProyectoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
        this.oMatSnackBar.open("Error reading proyecto from server.", '', { duration: 1200 });
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
      header: 'Vista de proyecto',
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
        if (this.oProyectoToRemove) {
          this.oMatSnackBar.open('The proyecto has been removed.', '', {
            duration: 1200
          });
          this.oProyectoAjaxService
            .removeOne(this.oProyectoToRemove.id)
            .subscribe({
              next: () => {
                this.getPage();
              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
                this.oMatSnackBar.open(
                  "The proyecto hasn't been removed.",
                  '',
                  { duration: 1200 }
                );
              }
            });
        }
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open(
          "The proyecto hasn't been removed.",
          '',
          { duration: 1200 });
      }
    });
  }

  getUsuario(): void {
    this.oTareaAjaxService.getOne(this.id_tarea).subscribe({
      next: (data: ITarea) => {
        this.oTarea = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }
}
