import { HttpHeaders } from "@angular/common/http";

export const API_URL: string = 'http://localhost:8083';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
    })
};

export const CALENDAR_ES = {
    firstDayOfWeek: 1,
    dyNames: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    dyNamesShort: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'],
    dyNamesMin: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Borrar',
    dateFormat: 'mm/dd/yyyy',
}