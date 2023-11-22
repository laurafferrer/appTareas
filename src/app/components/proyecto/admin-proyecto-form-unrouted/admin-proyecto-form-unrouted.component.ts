import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProyecto, ITarea, IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { AdminUsuarioSelectionUnroutedComponent } from '../../usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { CALENDAR_ES } from 'src/environment/environment';

@Component({
  selector: 'app-admin-proyecto-form-unrouted',
  templateUrl: './admin-proyecto-form-unrouted.component.html',
  styleUrls: ['./admin-proyecto-form-unrouted.component.css']
})

export class AdminProyectoFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  es = CALENDAR_ES;

  proyectoForm!: FormGroup;
  oProyecto: IProyecto = { tarea: {} } as IProyecto;
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
    const tareaID = oProyecto.tarea ? oProyecto.tarea.id : null;
    this.proyectoForm = this.formBuilder.group({
      id: [oProyecto.id],
      nombre: [oProyecto.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      tarea: this.formBuilder.group({
        id: [tareaID]
      }),
      
      
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
      console.log(this.proyectoForm)
      if (this.operation == 'NEW') {
        this.oProyectoAjaxService.create(this.proyectoForm.value).subscribe({
          next: (data: IProyecto) => {
            this.oProyecto = data;
            this.initializeForm(this.oProyecto);
            this.matSnackBar.open("Proyecto has been created.", '', { duration: 1200 });
            this.router.navigate(['/admin', 'proyecto', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't create proyecto.", '', { duration: 1200 });
          }
        });
      } else {
        this.proyectoService.update(this.proyectoForm.value).subscribe({
          next: (data: IProyecto) => {
            this.oProyecto = data;
            this.initializeForm(this.oProyecto);
            this.matSnackBar.open("proyecto has been updated.", '', { duration: 1200 });
            this.router.navigate(['/admin', 'proyecto', 'view', this.oProyecto.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't update proyecto.", '', { duration: 1200 });
          }
        });
      }
    }
  }

  onShowTareaSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminUsuarioSelectionUnroutedComponent, {
      header: 'Select a Tarea',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oTarea: ITarea) => {
      if (oTarea) {
        this.oProyecto.tarea = oTarea;
        this.proyectoForm.controls['tarea'].patchValue({ id: oTarea.id })
      }
    });
  }

}