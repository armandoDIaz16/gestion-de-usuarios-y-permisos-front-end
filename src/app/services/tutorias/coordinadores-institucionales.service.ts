import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceCoordinadoresDepartamentales} from '../../models/tutorias/CoordinadoresModel';
import {InterfacePersona} from '../../views/_models/GeneralModels';

@Injectable({
    providedIn: 'root'
})
export class CoordinadoresInstitucionalesService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_coordinadores(): Observable<InterfaceCoordinadoresDepartamentales[]> {
        return this.http.get<InterfaceCoordinadoresDepartamentales[]>(
            GenericServicesService.API_ENDPOINT + 'coordinadores_institucionales',
            GenericServicesService.HEADERS
        );
    }

    get_usuarios_nombre(nombre_coordinador: string): Observable<InterfacePersona[]> {
        return this.http.post<InterfacePersona[]>(
            GenericServicesService.API_ENDPOINT + 'get_usuarios_docentes',
            {nombre_coordinador: nombre_coordinador},
            GenericServicesService.HEADERS
        );
    }

    guarda_coordinador(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guarda_coordinador_institucional',
            body,
            GenericServicesService.HEADERS
        );
    }

    quita_rol_coordinador(pk_usuario: number) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'elimina_rol_coordinador_institucional',
            {pk_usuario: pk_usuario},
            GenericServicesService.HEADERS
        );
    }
}
