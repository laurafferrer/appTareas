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

  threadForm!: FormGroup;
  oProyecto: IProyecto = {  nombre: { id: 0 } } as IProyecto;
  status: HttpErrorResponse | null = null;



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
    this.threadForm = this.formBuilder.group({
      id: [oProyecto.id],
      nombre: [oProyecto.nombre, [Validators.required, Validators.minLength(10), Validators.maxLength(2048)]],
      fecha_inicio: [oProyecto.fechaInicio],
      fecha_fin: [oProyecto.fechaFin],
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
    return this.threadForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.threadForm.valid) {
      if (this.operation === 'NEW') {
        this.oProyectoAjaxService.newOne(this.threadForm.value).subscribe({
          next: (data: IProyecto) => {
            this.oProyecto = { "nombre": {} } as IProyecto;
            this.initializeForm(this.oProyecto); //el id se genera en el servidor
            this.oMatSnackBar.open('Thread has been created.', '', { duration: 2000 });
            this.oDynamicDialogRef.close(data);  
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to create thread.', '', { duration: 2000 });
          }
        });
      } else {
        this.oProyectoAjaxService.updateOne(this.threadForm.value).subscribe({
          next: (data: IProyecto) => {
            this.oProyecto = data;
            this.initializeForm(this.oProyecto);
            this.oMatSnackBar.open('Thread has been updated.', '', { duration: 2000 });
            this.oDynamicDialogRef.close(data);  
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to update thread.', '', { duration: 2000 });
          }
        });
      }
    }
  }

}