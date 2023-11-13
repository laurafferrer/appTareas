import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-proyecto-view-routed',
  templateUrl: './admin-proyecto-view-routed.component.html',
  styleUrls: ['./admin-proyecto-view-routed.component.css']
})

export class AdminProyectoViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(private oActivatedRoute: ActivatedRoute) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
