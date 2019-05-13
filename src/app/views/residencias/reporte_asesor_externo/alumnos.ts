import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IAlumnos} from './alumnos.service';

@Injectable()
export class Alumnos {
    constructor(private http: HttpClient) {}
    getAnteproyectos(id): Observable<IAlumnos[]> {
        return this.http.get<IAlumnos[]>('http://127.0.0.1:8000/api/Alumnor/' + id);
    }
}
