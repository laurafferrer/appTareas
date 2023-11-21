import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-proyecto-plist-routed',
  templateUrl: './admin-proyecto-plist-routed.component.html',
  styleUrls: ['./admin-proyecto-plist-routed.component.css']
})
export class AdminProyectoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  usuario_id: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProyectoAjaxService: ProyectoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.usuario_id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oProyectoAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " proyectos", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating proyectos: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Are you sure that you want to remove all the proyectos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oProyectoAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " proyectos", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying proyectos: " + oError.message, '', { duration: 2000 });
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