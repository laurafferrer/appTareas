import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProyectoAjaxService } from 'src/app/service/proyecto.ajax.service';
import { TareaAjaxService } from 'src/app/service/tarea.ajax.service';
import { ITarea } from 'src/app/model/model.interfaces';
import { Observer } from 'rxjs';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})

export class HomeRoutedComponent implements OnInit {
  strUserName: string = '';
  totalTareas: number = 0;
  totalTareasEnStock: number = 0;
  tareas: ITarea[] = [];
  categoriasConCantidad: { categoria: string, cantidad: number }[] = [];

  constructor(
    private http: HttpClient,
    private proyectoService: ProyectoAjaxService,
    private tareaService : TareaAjaxService,
    private oSessionService: SessionAjaxService
  ) { }

  ngOnInit() {
    this.strUserName = this.oSessionService.getUsername();
  }

}




