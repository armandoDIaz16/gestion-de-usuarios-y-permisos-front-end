import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfacecCarreraGruposTutoria} from '../../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposInicialService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }
    /* VALIDADO */
    get_grupos(query_params?: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'grupos_inicial' + query_params,
            GenericServicesService.HEADERS
        );
    }
    /* VALIDADO */

    elimina_alumno_grupo(pk_detalle: number) {
        return this.http.delete(
            GenericServicesService.API_ENDPOINT + 'elimina_alumno_grupo/' + pk_detalle,
            GenericServicesService.HEADERS
        );
    }

    agrega_alumno(body): any {
        return this.http.post<any>(
            GenericServicesService.API_ENDPOINT + 'agrega_alumno_grupo',
            body,
            GenericServicesService.HEADERS
        );
    }

    crea_grupo_seguimiento(body) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guarda_grupo_seguimiento',
            body,
            GenericServicesService.HEADERS
        );
    }

    actualiza_grupo_seguimiento(body, pk_grupo: number) {
        return this.http.put(
            GenericServicesService.API_ENDPOINT + 'actualiza_grupo_seguimiento' + '/' + pk_grupo,
            body,
            GenericServicesService.HEADERS
        );
    }

    get_grupo_seguimiento(query_params: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'get_grupo_seguimiento' + query_params,
            GenericServicesService.HEADERS
        );
    }

    get_alumnos_grupo(query_params: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'get_alumnos_grupo' + query_params,
            GenericServicesService.HEADERS
        );
    }

    get_grupos_actuales(rol: string): Observable<InterfacecCarreraGruposTutoria> {
        const body = {
            pk_encriptada: sessionStorage['IdEncriptada'],
            rol: rol
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'get_grupos_admin',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_grupos_seguimiento(): any {
        const body = {
            pk_encriptada: sessionStorage['IdEncriptada']
        };

        return this.http.post<any>(
            GenericServicesService.API_ENDPOINT + 'grupos_seguimiento_admin',
            body,
            GenericServicesService.HEADERS
        );
    }

    elimina_grupo(pk_grupo: number): any {
        return this.http.delete<any>(
            GenericServicesService.API_ENDPOINT + 'elimina_grupo_seguimiento/' + pk_grupo,
            GenericServicesService.HEADERS
        );
    }
}
