import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITarea, IProyecto, IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';

@Component({
  selector: 'app-user-tarea-form-unrouted',
  templateUrl: './user-tarea-form-unrouted.component.html',
  styleUrls: ['./user-tarea-form-unrouted.component.css']
})

export class UserTareaFormUnroutedComponent implements OnInit {

  replyForm!: FormGroup;
  oTarea: ITarea = { "usuario": { id: 0 }, "proyecto": { id: 0 } } as ITarea;
  status: HttpErrorResponse | null = null;
  //---
  id: number = 0;
  proyecto_id: number = 0;
  operation: formOperation = 'NEW'; // new or edit

  constructor(
    private formBuilder: FormBuilder,
    private oTareaAjaxService: TareaAjaxService,
    private matSnackBar: MatSnackBar,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef,
    public oDynamicDialogConfig: DynamicDialogConfig
  ) {
    if (oDynamicDialogConfig) {
      if (oDynamicDialogConfig.data) {
        if (oDynamicDialogConfig.data.id) {
          this.oTarea.id = oDynamicDialogConfig.data.id;
        } else {
          this.oTarea.id = 0;
        }
        if (oDynamicDialogConfig.data.proyecto_id) {
          this.oTarea.proyecto = { id: oDynamicDialogConfig.data.proyecto_id } as IProyecto;
        } else {
          this.oTarea.proyecto = {} as IProyecto;
        }
        if (oDynamicDialogConfig.data.operation) {
          this.operation = oDynamicDialogConfig.data.operation;
        } else {
          this.operation = 'NEW';
        }
      }
    }
    this.initializeForm(this.oTarea);

  }

  initializeForm(oTarea: ITarea) {
    this.replyForm = this.formBuilder.group({
      id: [oTarea.id],
      title: [oTarea.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      user: this.formBuilder.group({
        id: [oTarea.usuario.id, Validators.required]
      }),
      thread: this.formBuilder.group({
        id: [oTarea.proyecto.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oTareaAjaxService.getOne(this.id).subscribe({
        next: (data: ITarea) => {
          this.oTarea = data;
          this.initializeForm(this.oTarea);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.matSnackBar.open("Error reading reply from server.", '', { duration: 2000 });
        }
      });
    } else {
      this.initializeForm(this.oTarea);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.replyForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.replyForm.valid) {
      if (this.operation == 'NEW') {
        this.oTareaAjaxService.newOne(this.replyForm.value).subscribe({
          next: (data: ITarea) => {
            this.oTarea = { "usuario": {}, "proyecto": {} } as ITarea;
            this.initializeForm(this.oTarea);
            this.matSnackBar.open("Reply has been created.", '', { duration: 2000 });
            this.oDynamicDialogRef.close(data);            
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't create reply.", '', { duration: 2000 });
          }
        });
      } else {
        this.oTareaAjaxService.updateOne(this.replyForm.value).subscribe({
          next: (data: ITarea) => {
            this.oTarea = data;
            this.initializeForm(this.oTarea);
            this.matSnackBar.open("Reply has been updated.", '', { duration: 2000 });
            this.oDynamicDialogRef.close(data);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't update reply.", '', { duration: 2000 });
          }
        });
      }
    }
  }

}