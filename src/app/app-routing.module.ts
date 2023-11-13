import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipeasPipe } from './pipeas.pipe';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
    "PipeasPipe"
  ]
})
export class AppRoutingModule { }
