import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';

@Component({
  selector: 'app-admin-usuario-selection-unrouted',
  templateUrl: './admin-usuario-selection-unrouted.component.html',
  styleUrls: ['./admin-usuario-selection-unrouted.component.css']
})

export class AdminUsuarioSelectionUnroutedComponent implements OnInit {

  oPage: IUsuarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUsuarioToRemove: IUsuario | null = null;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
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

  onSelectUsuario(oUsuario: IUsuario) {
    this.oDynamicDialogRef.close(oUsuario);
  }


}