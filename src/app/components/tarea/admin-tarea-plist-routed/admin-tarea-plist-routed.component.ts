import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';

@Component({
  selector: 'app-admin-tarea-plist-routed',
  templateUrl: './admin-tarea-plist-routed.component.html',
  styleUrls: ['./admin-tarea-plist-routed.component.css']
})
export class AdminTareaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_usuario: number;
  id_proyecto: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTareaAjaxService: TareaAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_usuario = parseInt(this.oActivatedRoute.snapshot.paramMap.get("idusuario") ?? "0");
    this.id_proyecto = parseInt(this.oActivatedRoute.snapshot.paramMap.get("idproyecto") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oTareaAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " replies", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating replies: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty() {
    this.oTareaAjaxService.empty().subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " replies", '', { duration: 2000 });
        this.bLoading = false;
        this.forceReload.next(true);
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error emptying replies: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }


}
