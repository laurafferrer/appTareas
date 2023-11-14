import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-usuario-edit-routed',
  templateUrl: './admin-usuario-edit-routed.component.html',
  styleUrls: ['./admin-usuario-edit-routed.component.css']
})
export class AdminUsuarioEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
