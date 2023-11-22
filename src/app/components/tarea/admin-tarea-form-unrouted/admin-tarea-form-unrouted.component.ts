import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITarea, IProyecto, IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { AdminUsuarioSelectionUnroutedComponent } from '../../usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { AdminProyectoSelectionUnroutedComponent } from '../../proyecto/admin-proyecto-selection-unrouted/admin-proyecto-selection-unrouted.component';

@Component({
  selector: 'app-admin-tarea-form-unrouted',
  templateUrl: './admin-tarea-form-unrouted.component.html',
  styleUrls: ['./admin-tarea-form-unrouted.component.css']
})

export class AdminTareaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  tareaForm!: FormGroup;
  oTarea: ITarea = { id: 0, nombre: '' };
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private oTareaAjaxService: TareaAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oTarea);
  }

  initializeForm(oTarea: ITarea) {
    this.tareaForm = this.formBuilder.group({
      id: [oTarea.id],
      nombre: [oTarea.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
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
          this.matSnackBar.open("Error reading tarea from server.", '', { duration: 2000 });
        }
      });
    } else {
      this.initializeForm(this.oTarea);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.tareaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      if (this.operation == 'NEW') {
        this.oTareaAjaxService.newOne(this.tareaForm.value).subscribe({
          next: (data: ITarea) => {
            this.oTarea = { id: 0, nombre: '' };
            this.initializeForm(this.oTarea);
            this.matSnackBar.open("Tarea has been created.", '', { duration: 2000 });
            this.router.navigate(['/admin', 'tarea', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't create tarea.", '', { duration: 2000 });
          }
        });
      } else {
        this.oTareaAjaxService.updateOne(this.tareaForm.value).subscribe({
          next: (data: ITarea) => {
            this.oTarea = data;
            this.initializeForm(this.oTarea);
            this.matSnackBar.open("Tarea has been updated.", '', { duration: 2000 });
            this.router.navigate(['/admin', 'tarea', 'view', this.oTarea.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't update tarea.", '', { duration: 2000 });
          }
        });
      }
    }
  }

}