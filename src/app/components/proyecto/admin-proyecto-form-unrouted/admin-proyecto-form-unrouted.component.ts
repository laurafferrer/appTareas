import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProyecto, formOperation } from 'src/app/model/model.interfaces';
import { AdminUsuarioSelectionUnroutedComponent } from '../../usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';

@Component({
  selector: 'app-admin-proyecto-form-unrouted',
  templateUrl: './admin-proyecto-form-unrouted.component.html',
  styleUrls: ['./admin-proyecto-form-unrouted.component.css']
})

export class AdminProyectoFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  proyectoForm!: FormGroup;
  oProyecto: IProyecto = { nombre: {} } as IProyecto;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private oProyectoAjaxService: ProyectoAjaxService,
    private router: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oProyecto);
  }

  initializeForm(oProyecto: IProyecto) {
    this.proyectoForm = this.formBuilder.group({
      id: [oProyecto.id],
      title: [oProyecto.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]],
      fechaInicio: [oProyecto.fechaInicio],
      fechaFin: [oProyecto.fechaFin]
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
            this.oProyecto = { "nombre": {} } as IProyecto;
            this.initializeForm(this.oProyecto); //el id se genera en el servidor
            this.oMatSnackBar.open('Proyecto has been created.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'proyecto', 'view', data]);
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
            this.router.navigate(['/admin', 'proyecto', 'view', this.oProyecto.id]);
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
