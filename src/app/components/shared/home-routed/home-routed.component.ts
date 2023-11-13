import { Component, OnInit } from '@angular/core';
import { IProyecto } from 'src/app/model/model.interfaces';




@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})

export class HomeRoutedComponent implements OnInit {

  id_proyecto: number = 17;
  

  constructor(

  ) { }

  ngOnInit() {
  }

  onProyectoChange(oProyecto: IProyecto) {
    this.id_proyecto = oProyecto.id;
  }

}





