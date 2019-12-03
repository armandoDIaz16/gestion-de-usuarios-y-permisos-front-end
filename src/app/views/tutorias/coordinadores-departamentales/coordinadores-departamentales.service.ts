import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceCoordinadoresDepartamentales} from '../_models/CoordinadoresModel';
import {InterfacePersona} from '../../_models/GeneralModels';

@Injectable({
    providedIn: 'root'
})
export class CoordinadoresDepartamentalesService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_coordinadores(): Observable<InterfaceCoordinadoresDepartamentales> {
        return this.http.get<InterfaceCoordinadoresDepartamentales>(
            GenericServicesService.API_ENDPOINT + 'coordinadores_departamentales',
            GenericServicesService.HEADERS
        );
    }

    get_coordinador_area(pk_area) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'coordinador_departamental',
            {pk_area_academica: pk_area},
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
            GenericServicesService.API_ENDPOINT + 'guarda_coordinador',
            body,
            GenericServicesService.HEADERS
        );
    }

    quita_rol_coordinador(pk_area_academica: number) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'elimina_rol_coordinador',
            {pk_area_academica: pk_area_academica},
            GenericServicesService.HEADERS
        );
    }

    get_url_back(url: string) {
        return GenericServicesService.API_ENDPOINT + url;
    }
}
