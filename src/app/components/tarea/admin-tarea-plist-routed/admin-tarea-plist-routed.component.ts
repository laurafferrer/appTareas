import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-tarea-plist-routed',
  templateUrl: './admin-tarea-plist-routed.component.html',
  styleUrls: ['./admin-tarea-plist-routed.component.css']
})
export class AdminTareaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_usuario: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTareaService: TareaAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_usuario = parseInt(this.oActivatedRoute.snapshot.paramMap.get("iduser") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oTareaService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " tareas", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating tareas: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({

      target: $event.target as EventTarget,
      message: 'Are you sure that you want to remove all the tareas?',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.oTareaService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " tarea", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying tarea: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Empty Cancelled!", '', { duration: 2000 });
      }
    });
  }

}
