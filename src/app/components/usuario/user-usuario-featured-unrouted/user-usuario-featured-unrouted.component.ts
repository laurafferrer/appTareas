import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';

@Component({
  selector: 'app-user-usuario-featured-unrouted',
  templateUrl: './user-usuario-featured-unrouted.component.html',
  styleUrls: ['./user-usuario-featured-unrouted.component.css']
})

export class UserUsuarioFeaturedUnroutedComponent implements OnInit {

  oPage: IUsuarioPage | undefined;
  oPaginatorState: PaginatorState = { first: 0, rows: 100, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUsuarioToRemove: IUsuario | null = null;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oUsuarioAjaxService.getPageByTareasNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page).subscribe({
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

}
