import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProyecto, IProyectoPage } from '../model/model.interfaces';

@Injectable()
export class ProyectoAjaxService {

  sUrl: string = "http://localhost:8083/proyecto";
  constructor(
    private oHttpCliente: HttpClient
  ) { }

  getOne(id: number): Observable<IProyecto> {
    return this.oHttpCliente.get<IProyecto>(this.sUrl + "/" + id);
  }

  create(proyecto: IProyecto): Observable<IProyecto> {
    return this.oHttpCliente.post<IProyecto>(this.sUrl, proyecto);
  }

  update(proyecto: IProyecto): Observable<IProyecto> {
      return this.oHttpCliente.put<IProyecto>(this.sUrl, proyecto);
  }

  removeOne(id: number | undefined): Observable<number> {
      if (id) {
          return this.oHttpCliente.delete<number>(this.sUrl + "/" + id);
      } else {
          return new Observable<number>();
      }
  }

  empty(): Observable<number> {
    return this.oHttpCliente.delete<number>(this.sUrl + "/empty");
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_tarea: number): Observable<IProyectoPage> {
    if (!size) size = 10;
    if (!page) page = 0;
  
    let strUrlTarea = "";
    if (id_tarea > 0) {
        strUrlTarea = "&tarea=" + id_tarea;
    }

    return this.oHttpCliente.get<IProyectoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection  + strUrlTarea);
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

  generateRandom(amount: number): Observable<number> {
    return this.oHttpCliente.post<number>(this.sUrl + "/populate/" + amount, null);
  }

}
