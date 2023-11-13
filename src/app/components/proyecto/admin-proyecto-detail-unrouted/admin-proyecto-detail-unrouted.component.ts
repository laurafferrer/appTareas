import { Component, OnInit, Input, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProyecto } from 'src/app/model/model.interfaces';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';

@Component({
  selector: 'app-admin-proyecto-detail-unrouted',
  templateUrl: './admin-proyecto-detail-unrouted.component.html',
  styleUrls: ['./admin-proyecto-detail-unrouted.component.css']
})

export class AdminProyectoDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oProyecto: IProyecto = { nombre: {} } as IProyecto;
  status: HttpErrorResponse | null = null;

  constructor(
    private oProyectoAjaxService: ProyectoAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oProyectoAjaxService.getOne(this.id).subscribe({
      next: (data: IProyecto) => {
        this.oProyecto = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
