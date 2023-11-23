import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITarea, IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { AdminUsuarioSelectionUnroutedComponent } from '../../usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';

@Component({
  selector: 'app-admin-tarea-form-unrouted',
  templateUrl: './admin-tarea-form-unrouted.component.html',
  styleUrls: ['./admin-tarea-form-unrouted.component.css']
})

export class AdminTareaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  tareaForm!: FormGroup;
  oTarea: ITarea = { usuario: {} } as ITarea;
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
    const userID = oTarea.usuario ? oTarea.usuario.id : null;
    this.tareaForm = this.formBuilder.group({
      id: [oTarea.id],
      nombre: [oTarea.nombre],
      usuario: this.formBuilder.group({
        id: [userID]
      })
    });
  }


  ngOnInit() {
    if (this.operation == 'EDIT') {
    console.log(this.operation)
      this.oTareaAjaxService.getOne(this.id).subscribe({
        next: (data: ITarea) => {
          console.log(data)
          this.oTarea = data;
          this.initializeForm(this.oTarea);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.matSnackBar.open("Error reading tarea from server.", '', { duration: 1200 });
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
        console.log(this.operation)
        this.oTareaAjaxService.create(this.tareaForm.value).subscribe({
          next: (data: ITarea) => {
        
           this.oTarea = data;
         
            this.initializeForm(this.oTarea); 
            console.log(this.oTarea)
            this.matSnackBar.open('tarea has been created.', '', { duration: 1200 });
            this.router.navigate(['/admin', 'tarea', 'view',  this.oTarea]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open('Failed to create tarea.', '', { duration: 1200 });
          }
        });
      } else {
        this.oTareaAjaxService.update(this.tareaForm.value).subscribe({
          next: (data: ITarea) => {
            this.oTarea = data;
            this.initializeForm(this.oTarea);
            this.matSnackBar.open('tarea has been updated.', '', { duration: 1200 });
            this.router.navigate(['/admin', 'tarea', 'view', this.oTarea.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open('Failed to update tarea.', '', { duration: 1200 });
          }
        });
      }
    }
  }

  onShowUsuariosSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminUsuarioSelectionUnroutedComponent, {
      header: 'Select a usuario',
      width: '85%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oUsuario: IUsuario) => {
      if (oUsuario) {
        console.log(oUsuario);
        this.oTarea.usuario = oUsuario;
        this.tareaForm.controls['usuario'].patchValue({ id: oUsuario.id });
      }
    });
  }
}