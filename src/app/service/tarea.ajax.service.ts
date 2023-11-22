import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITarea, ITareaPage } from '../model/model.interfaces';
import { API_URL } from 'src/environment/environment';

@Injectable()
export class TareaAjaxService {

    sUrl: string = API_URL + "/tarea";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<ITarea> {
        return this.oHttpClient.get<ITarea>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<ITareaPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ITareaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oTarea: ITarea): Observable<ITarea> {
        return this.oHttpClient.post<ITarea>(this.sUrl, oTarea);
    }

    updateOne(oTarea: ITarea): Observable<ITarea> {
        return this.oHttpClient.put<ITarea>(this.sUrl, oTarea);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }

}
