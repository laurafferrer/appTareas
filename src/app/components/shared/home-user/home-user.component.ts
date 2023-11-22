import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IProyecto, IProyectoPage, ITarea } from 'src/app/model/model.interfaces';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_tarea: number = 0;
  proyectosSeleccionados: IProyecto[] = [];
  oPage: IProyectoPage | undefined;
  oTarea: ITarea | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";

  productosPorPagina: number = 10;
  oPaginatorState = { first: 0, rows: this.productosPorPagina, page: 0, pageCount: 0 };

  status: HttpErrorResponse | null = null;
  oProductoToRemove: IProyecto | null = null;
  ref: DynamicDialogRef | undefined;
  strUserName: string = '';
  constructor(
    private oProyectoAjaxService: ProyectoAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oSessionService: SessionAjaxService,
    private oTareaAjaxService: TareaAjaxService
  ) { }

  ngOnInit() {
    this.strUserName = this.oSessionService.getUsername();
    this.getPage();
    if (this.id_tarea > 0) {
      this.getUser();
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
    this.oProyectoAjaxService
      .getPage(
        this.productosPorPagina,
        this.oPaginatorState.page,
        this.orderField,
        this.orderDirection,
        this.id_tarea
      )

      .subscribe({
        next: (data: IProyectoPage) => {
          this.oPage = data;
          this.oPaginatorState.pageCount = data.totalPages;
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        },
      });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = this.productosPorPagina;
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

  getUser(): void {
    this.oTareaAjaxService.getOne(this.id_tarea).subscribe({
      next: (data: ITarea) => {
        this.oTarea = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  addToCart(proyecto: IProyecto) {
    this.proyectosSeleccionados.push(proyecto);
    console.log(`Proyecto '${proyecto.nombre}' añadido.`);
  }

  cargarPagina(direccion: number) {
    const nuevaPagina = this.oPaginatorState.page + direccion;
    if (nuevaPagina >= 0 && nuevaPagina < this.oPaginatorState.pageCount) {
      this.oPaginatorState.page = nuevaPagina;
      console.log(nuevaPagina);
      this.getPage();
    } else {
      // Ajustar la página actual si intenta ir más allá de los límites
      if (nuevaPagina < 0) {
        this.oPaginatorState.page = 0;
      } else if (nuevaPagina >= this.oPaginatorState.pageCount) {
        this.oPaginatorState.page = this.oPaginatorState.pageCount - 1;
      }
    }
  }
}

