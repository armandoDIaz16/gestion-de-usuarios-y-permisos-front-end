import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceAlumno} from '../../models/tutorias/AlumnoModel';

@Injectable({
    providedIn: 'root'
})
export class HorarioAlumnoService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_horario(alumno: any): Observable<InterfaceAlumno> {
        return this.http.get<InterfaceAlumno>(
            GenericServicesService.API_ENDPOINT + 'get_horario_alumno/' + alumno,
            GenericServicesService.HEADERS
        );
    }

}
