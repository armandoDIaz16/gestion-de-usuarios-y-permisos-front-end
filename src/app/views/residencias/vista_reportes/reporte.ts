import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IReporte} from './maestro.service';

@Injectable()
export class Reporte {
    constructor(private http: HttpClient) {}
    getReporte(id): Observable<IReporte[]> {
        return this.http.get<IReporte[]>('http://127.0.0.1:8000/api/Repdocente/' + id);
    }
}
