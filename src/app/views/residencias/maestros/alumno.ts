import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IAlumnos} from './proyectoMaestro.service';
import {GenericServicesService} from '../../../services/generic-services.service';

@Injectable()
export class Alumno extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getAlumno(id): Observable<IAlumnos[]> {
        return this.http.get<IAlumnos[]>(GenericServicesService.API_ENDPOINT + 'ProyectoAlumno/' + id, GenericServicesService.HEADERS);
    }
}
