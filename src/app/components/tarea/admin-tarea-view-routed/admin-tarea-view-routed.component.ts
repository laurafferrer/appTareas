import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface ITarea {
  id:number;
  nombre:string;
  id_usuario:number;
  id_proyecto:number;
}

@Component({
  selector: 'app-admin-tarea-view-routed',
  templateUrl: './admin-tarea-view-routed.component.html',
  styleUrls: ['./admin-tarea-view-routed.component.css']
})
export class AdminTareaViewRoutedComponent implements OnInit {

  id: number = 1;
  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
