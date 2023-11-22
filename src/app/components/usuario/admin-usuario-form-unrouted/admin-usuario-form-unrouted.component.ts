import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service';

@Component({
  selector: 'app-admin-usuario-form-unrouted',
  templateUrl: './admin-usuario-form-unrouted.component.html',
  styleUrls: ['./admin-usuario-form-unrouted.component.css']
})
export class AdminUsuarioFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  userForm!: FormGroup;
  oUsuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;

  constructor(
    private oFormBuilder: FormBuilder,
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oUsuario);
  }

  initializeForm(oUsuario: IUsuario) {
    this.userForm = this.oFormBuilder.group({
      id: [oUsuario.id],
      nombre: [oUsuario.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellidos: [oUsuario.apellidos, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      username: [oUsuario.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      pouesto: [oUsuario.puesto, Validators.required]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oUsuarioAjaxService.getOne(this.id).subscribe({
        next: (data: IUsuario) => {
          this.oUsuario = data;
          this.initializeForm(this.oUsuario);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading usuario from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oUsuario);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.operation == 'NEW') {
        this.oUsuarioAjaxService.create(this.userForm.value).subscribe({
          next: (data: IUsuario) => {
            this.oUsuario = data;
            this.initializeForm(this.oUsuario);
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("Usuario has been created.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'usuario', 'view', this.oUsuario]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create usuario.", '', { duration: 2000 });
          }
        })

      } else {
        this.oUsuarioAjaxService.editOne(this.userForm.value).subscribe({
          next: (data: IUsuario) => {
            this.oUsuario = data;
            this.initializeForm(this.oUsuario);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("Usuario has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'usuario', 'view', this.oUsuario.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't update usuario.", '', { duration: 2000 });
          }
        })
      }
    }
  }

}
