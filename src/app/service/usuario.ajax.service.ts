import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario, IUsuarioPage } from '../model/model.interfaces';

@Injectable()
export class UsuarioAjaxService {

  sUrl: string = "http://localhost:8083/usuario";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IUsuario> {
    return this.oHttpClient.get<IUsuario>(this.sUrl + "/" + id);
  }

  getByUsername(username: string): Observable<IUsuario> {
    return this.oHttpClient.get<IUsuario>(this.sUrl + "/byusername/" + username);
}

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IUsuarioPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpClient.get<IUsuarioPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  removeOne(id: number | undefined): Observable<number> {
    if (id) {
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  editOne(usuario: IUsuario): Observable<IUsuario> {
    return this.oHttpClient.put<IUsuario>(this.sUrl, usuario);
  }

  create(usuario: IUsuario): Observable<IUsuario> {
    return this.oHttpClient.post<IUsuario>(this.sUrl, usuario);
  }

  empty(): Observable<number> {
    return this.oHttpClient.delete<number>(this.sUrl + "/empty");
  }

  getPageByTareasNumberDesc(size: number | undefined, page: number | undefined): Observable<IUsuarioPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpClient.get<IUsuarioPage>(this.sUrl + "/byTareasNumberDesc?size=" + size + "&page=" + page);
  }

  generateRandom(amount: number): Observable<number> {
    return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
  }

}
