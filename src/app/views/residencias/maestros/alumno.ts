import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IAlumnos} from './proyectoMaestro.service';

@Injectable()
export class Alumno {
    constructor(private http: HttpClient) {}
    getAlumno(id): Observable<IAlumnos[]> {
        return this.http.get<IAlumnos[]>('http://127.0.0.1:8000/api/ProyectoAlumno/' + id);
    }
}
