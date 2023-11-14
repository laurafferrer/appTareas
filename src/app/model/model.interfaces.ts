import { HttpErrorResponse } from "@angular/common/http";

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number,
}

export interface IUsuario extends IEntity {
    nombre: string,
    apellidos: string,
    username: string,
    puesto: boolean,
    proyectos: number,
    tareas: number
}

export interface IUsuarioPage extends IPage<IUsuario> {
}

export interface IProyecto extends IEntity {
    nombre: string,
    fechaInicio: Date,
    fechaFin: Date
}

export interface IProyectoPage extends IPage<IProyecto> {
}

export interface ITarea extends IEntity {
    nombre: string,
    usuario: IUsuario,
    proyecto: IProyecto
}

export interface ITareaPage extends IPage<ITarea> {
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}