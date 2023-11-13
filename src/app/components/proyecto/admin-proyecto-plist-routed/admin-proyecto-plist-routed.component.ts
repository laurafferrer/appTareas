import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';

@Component({
  selector: 'app-admin-proyecto-plist-routed',
  templateUrl: './admin-proyecto-plist-routed.component.html',
  styleUrls: ['./admin-proyecto-plist-routed.component.css']
})
export class AdminProyectoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProyectoAjaxService: ProyectoAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {  }

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

  doEmpty() {
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
  }

}

