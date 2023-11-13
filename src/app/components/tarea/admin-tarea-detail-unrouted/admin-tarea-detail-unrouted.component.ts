import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITarea } from 'src/app/model/model.interfaces';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';

@Component({
  selector: 'app-admin-tarea-detail-unrouted',
  templateUrl: './admin-tarea-detail-unrouted.component.html',
  styleUrls: ['./admin-tarea-detail-unrouted.component.css']
})
export class AdminTareaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oTarea: ITarea = { usuario: {}, proyecto: {} } as ITarea;
  status: HttpErrorResponse | null = null;

  constructor(
    private oTareaAjaxService: TareaAjaxService,
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
    this.oTareaAjaxService.getOne(this.id).subscribe({
      next: (data: ITarea) => {
        this.oTarea = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
