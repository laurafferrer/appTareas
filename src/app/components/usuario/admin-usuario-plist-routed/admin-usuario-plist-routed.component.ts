import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-usuario-plist-routed',
  templateUrl: './admin-usuario-plist-routed.component.html',
  styleUrls: ['./admin-usuario-plist-routed.component.css']
})
export class AdminUsuarioPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oUsuarioAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " usuarios", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating usuarios: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Are you sure that you want to remove all the usuarios?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oUsuarioAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " usuarios", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying usuarios: " + oError.message, '', { duration: 2000 });
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
