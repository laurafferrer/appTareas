import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IProyecto } from 'src/app/model/model.interfaces';


@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})

export class HomeRoutedComponent implements OnInit {

  proyecto_id: number = 0;
  reloadProyectos: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onProyectoChange(oProyecto: IProyecto) {
    this.proyecto_id = oProyecto.id;
  }

  onTareaChange(bTarea: Boolean) {
    this.reloadProyectos.next(true);
  }
}
