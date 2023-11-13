import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-proyecto-edit-routed',
  templateUrl: './admin-proyecto-edit-routed.component.html',
  styleUrls: ['./admin-proyecto-edit-routed.component.css']
})
export class AdminProyectoEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
