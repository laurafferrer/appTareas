import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ITarea, ITareaPage, IUsuario } from 'src/app/model/model.interfaces';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminTareaDetailUnroutedComponent } from '../admin-tarea-detail-unrouted/admin-tarea-detail-unrouted.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-tarea-plist-unrouted',
  templateUrl: './admin-tarea-plist-unrouted.component.html',
  styleUrls: ['./admin-tarea-plist-unrouted.component.css']
})
export class AdminTareaPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_usuario: number = 0;

  oPage: ITareaPage | undefined;
  oUsuario: IUsuario | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oTareaToRemove: ITarea | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oTareaAjaxService: TareaAjaxService,
    private oUsuarioAjaxService: UsuarioAjaxService



  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_usuario > 0) {
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
    this.oTareaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_usuario).subscribe({

      next: (data: ITareaPage) => {
        console.log(this.id_usuario);
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
        this.oMatSnackBar.open("Error reading tarea from server.", '', { duration: 1200 });
      }
    });
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

  doView(u: ITarea) {
    this.ref = this.oDialogService.open(AdminTareaDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'Vista de tarea',
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
        if (this.oTareaToRemove) {
          this.oMatSnackBar.open('The producto has been removed.', '', {
            duration: 1200
          });
          this.oTareaAjaxService
            .removeOne(this.oTareaToRemove.id)
            .subscribe({
              next: () => {
                this.getPage();
              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
                this.oMatSnackBar.open(
                  "The producto hasn't been removed.",
                  '',
                  { duration: 1200 }
                );
              }
            });
        }
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open(
          "The producto hasn't been removed.",
          '',
          { duration: 1200 });
      }
    });
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
}