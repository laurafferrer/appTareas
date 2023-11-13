import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environment/environment';
import { IProyecto, IProyectoPage } from '../model/model.interfaces';

@Injectable()
export class ProyectoAjaxService {

  sUrl: string = API_URL + "/proyecto";

  constructor(
    private oHttpCliente: HttpClient
  ) { }

  getOne(id: number): Observable<IProyecto> {
    return this.oHttpCliente.get<IProyecto>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IProyectoPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpCliente.get<IProyectoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  removeOne(id: number | undefined): Observable<number> {
    if (id) {
      return this.oHttpCliente.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oProyecto: IProyecto) {
    return this.oHttpCliente.post<IProyecto>(this.sUrl, oProyecto);
  }

  updateOne(oProyecto: IProyecto): Observable<IProyecto> {
    return this.oHttpCliente.put<IProyecto>(this.sUrl, oProyecto);
  }

  generateRandom(amount: number): Observable<number> {
    return this.oHttpCliente.post<number>(this.sUrl + "/populate/" + amount, null);
  }

  getPageByTareasNumberDesc(size: number | undefined, page: number | undefined, id_usuario: number): Observable<IProyectoPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    let strUrlUsuario = "";
    if (id_usuario > 0) {
      strUrlUsuario = "&usuario=" + id_usuario;
    }
    return this.oHttpCliente.get<IProyectoPage>(this.sUrl + "/byTareasNumberDesc?size=" + size + "&page?" + page + strUrlUsuario);
  }

  empty(): Observable<number> {
    return this.oHttpCliente.delete<number>(this.sUrl + "/empty");
  }

}
