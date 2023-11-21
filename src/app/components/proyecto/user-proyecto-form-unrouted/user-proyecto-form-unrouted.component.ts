import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProyecto, IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';

@Component({
  selector: 'app-user-proyecto-form-unrouted',
  templateUrl: './user-proyecto-form-unrouted.component.html',
  styleUrls: ['./user-proyecto-form-unrouted.component.css']
})

export class UserProyectoFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  proyectoForm!: FormGroup;
  oProyecto: IProyecto = { fechaInicio: new Date(Date.now()), fechaFin: new Date(Date.now()), usuario: { id: 0 } } as IProyecto;  status: HttpErrorResponse | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private oProyectoAjaxService: ProyectoAjaxService,
    private oMatSnackBar: MatSnackBar,
    public oDynamicDialogRef: DynamicDialogRef,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oProyecto);
  }

  initializeForm(oProyecto: IProyecto) {
    this.proyectoForm = this.formBuilder.group({
      id: [oProyecto.id],
      nombre: [oProyecto.nombre, [Validators.required, Validators.minLength(10), Validators.maxLength(2048)]],
      fechaInicio: [new Date(oProyecto.fechaInicio), [Validators.required]],
      fechaFin: [new Date(oProyecto.fechaFin), [Validators.required]],
      usuario: this.formBuilder.group({
        id: [oProyecto.usuario.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oProyectoAjaxService.getOne(this.id).subscribe({
        next: (data: IProyecto) => {
          this.oProyecto = data;
          this.initializeForm(this.oProyecto);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading proyecto from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oProyecto);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.proyectoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.proyectoForm.valid) {
      if (this.operation === 'NEW') {
        this.oProyectoAjaxService.newOne(this.proyectoForm.value).subscribe({
          next: (data: IProyecto) => {
            this.oProyecto = { "usuario": {} } as IProyecto;
            this.initializeForm(this.oProyecto); //el id se genera en el servidor
            this.oMatSnackBar.open('Proyecto has been created.', '', { duration: 2000 });
            this.oDynamicDialogRef.close(data);  
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to create proyecto.', '', { duration: 2000 });
          }
        });
      } else {
        this.oProyectoAjaxService.updateOne(this.proyectoForm.value).subscribe({
          next: (data: IProyecto) => {
            this.oProyecto = data;
            this.initializeForm(this.oProyecto);
            this.oMatSnackBar.open('Proyecto has been updated.', '', { duration: 2000 });
            this.oDynamicDialogRef.close(data);  
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to update proyecto.', '', { duration: 2000 });
          }
        });
      }
    }
  }

}