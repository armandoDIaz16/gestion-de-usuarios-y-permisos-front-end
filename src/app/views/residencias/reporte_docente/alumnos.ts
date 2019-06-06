import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IAlumnos} from './alumnos.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Alumnos extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getAnteproyectos(id): Observable<IAlumnos[]> {
        return this.http.get<IAlumnos[]>(GenericServicesService.API_ENDPOINT + 'Alumnor/' + id, GenericServicesService.HEADERS);
    }
}
