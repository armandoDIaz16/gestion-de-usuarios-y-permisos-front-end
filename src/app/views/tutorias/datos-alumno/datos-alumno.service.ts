import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceAlumno} from '../_models/AlumnoModel';

@Injectable({
    providedIn: 'root'
})
export class DatosAlumnoService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_perfil(pk_usuario: number): Observable<InterfaceAlumno> {
        return this.http.get<InterfaceAlumno>(
            GenericServicesService.API_ENDPOINT + 'get_horario_alumno/' + pk_usuario,
            GenericServicesService.HEADERS
        );
    }
}
