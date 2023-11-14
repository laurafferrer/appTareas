import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { AdminUsuarioDetailUnroutedComponent } from '../admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';
import { Subject } from 'rxjs';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-usuario-plist-unrouted',
  templateUrl: './admin-usuario-plist-unrouted.component.html',
  styleUrls: ['./admin-usuario-plist-unrouted.component.css']
})

export class AdminUsuarioPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IUsuarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUsuarioToRemove: IUsuario | null = null;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oUsuarioAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IUsuarioPage) => {
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

  ref: DynamicDialogRef | undefined;

  doView(u: IUsuario) {
    this.ref = this.oDialogService.open(AdminUsuarioDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of usuario',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IUsuario) {
    this.oUsuarioToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The usuario has been removed.", '', { duration: 2000 });
        this.oUsuarioAjaxService.removeOne(this.oUsuarioToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The usuario hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The usuario hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

}
