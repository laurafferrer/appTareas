import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environment/environment';
import { ITarea, ITareaPage } from '../model/model.interfaces';

@Injectable()
export class TareaAjaxService {

  sUrl: string = API_URL + "/tarea";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<ITarea> {
    return this.oHttpClient.get<ITarea>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_usuario: number, id_proyecto: number): Observable<ITareaPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    let strUrlUsuario = "";
    if (id_usuario > 0) {
      strUrlUsuario = "&usuario=" + id_usuario;
    }
    let strUrlProyecto = "";
    if (id_proyecto > 0) {
      strUrlProyecto = "&proyecto=" + id_proyecto;
    }

    return this.oHttpClient.get<ITareaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlUsuario + strUrlProyecto);
  }

  removeOne(id: number | undefined): Observable<number> {
    if (id) {
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oProyecto: ITarea): Observable<ITarea> {
    return this.oHttpClient.post<ITarea>(this.sUrl, oProyecto);
  }

  updateOne(oProyecto: ITarea): Observable<ITarea> {
    return this.oHttpClient.put<ITarea>(this.sUrl, oProyecto);
  }

  generateRandom(amount: number): Observable<number> {
    return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
  }

  empty(): Observable<number> {
    return this.oHttpClient.delete<number>(this.sUrl + "/empty");
  }
}
