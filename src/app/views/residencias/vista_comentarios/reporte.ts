import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IReportes} from './reporte.service';


@Injectable()
export class Reportes {
    constructor(private http: HttpClient) {}
    getAnteproyectos(id): Observable<IReportes[]> {
        return this.http.get<IReportes[]>('http://127.0.0.1:8000/api/Reporte/' + id);
    }
}
