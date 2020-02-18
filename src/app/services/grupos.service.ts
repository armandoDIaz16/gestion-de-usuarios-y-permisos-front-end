import {Injectable} from '@angular/core';
import {GenericServicesService} from './generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfacecCarreraGruposTutoria} from '../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos_tutor(): Observable<InterfacecCarreraGruposTutoria> {
        const body = {
            pk_grupo: JSON.parse(sessionStorage['permisos']).tutorias.pk_grupo
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'get_grupos_tutor',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_grupos(): Observable<InterfacecCarreraGruposTutoria> {
        let body = {
            permisos: JSON.parse(sessionStorage['permisos'])
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'grupos_tutoria',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_historico_grupos(): Observable<InterfacecCarreraGruposTutoria> {
        const body = {
            pk_encriptada: JSON.parse(sessionStorage['permisos']).pk_encriptada
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'get_historico_grupos_tutor',
            body,
            GenericServicesService.HEADERS
        );
    }
}
