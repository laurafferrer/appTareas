import { IToken, IUsuario } from './../model/model.interfaces';
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { API_URL } from "src/environment/environment";
import { SessionEvent } from "../model/model.interfaces";
import { HttpClient } from "@angular/common/http";
import { UsuarioAjaxService } from "./usuario.ajax.service";

@Injectable()
export class SessionAjaxService {
    sUrl: string = API_URL + "/sesion";

    subjectSession = new Subject<SessionEvent>();

    constructor(
        private oHttpClient: HttpClient,
        private oUsuarioAjaxService: UsuarioAjaxService
    ) {}

    private parseJwt(token: string): IToken {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    login(sUsername: string, sContrasenya: string): Observable<string> {
        return this.oHttpClient.post<string>(this.sUrl, { username: sUsername, contrasenya: sContrasenya});
    }

    setToken(sToken: string): void {
        localStorage.setItem('token', sToken);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isSessionActive(): Boolean {
        let strToken: string | null = localStorage.getItem('token');
        if (strToken) {
            let oDecodedToken: IToken = this.parseJwt(strToken);
            if (Date.now() >= oDecodedToken.exp * 1000) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } 

    getUsername(): string {
        if (this.isSessionActive()) {
            let token: string | null = localStorage.getItem('token');
            if (!token) {
                return "";
            } else {
                return this.parseJwt(token).nombre;
            }
        } else {
            return "";
        }
    }

    on(): Observable<SessionEvent> {
        return this.subjectSession.asObservable();
    }

    emit(event: SessionEvent) {
        this.subjectSession.next(event);
    }

    getSessionUsuario(): Observable<IUsuario> | null {
        if (this.isSessionActive()) {
            return this.oUsuarioAjaxService.getByUsername(this.getUsername());
        } else {
            return null;
        }
    }
}