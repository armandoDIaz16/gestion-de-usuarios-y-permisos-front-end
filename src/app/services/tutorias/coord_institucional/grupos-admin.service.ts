import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposAdminService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos_actuales(): Observable<InterfacecCarreraGruposTutoria> {
        const body = {
            pk_encriptada: sessionStorage['IdEncriptada']
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'get_grupos_admin',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_grupos_seguimiento(): Observable<InterfacecCarreraGruposTutoria> {
        const body = {
            pk_encriptada: sessionStorage['IdEncriptada']
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'grupos_seguimiento_admin',
            body,
            GenericServicesService.HEADERS
        );
    }
}
