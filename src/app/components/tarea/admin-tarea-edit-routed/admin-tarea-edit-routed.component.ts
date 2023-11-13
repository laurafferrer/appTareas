import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './admin-tarea-edit-routed.component.html',
  styleUrls: ['./admin-tarea-edit-routed.component.css']
})
export class AdminTareaEditRoutedComponent implements OnInit{

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }
}
