import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GruposCoordDepService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos_actuales(): Observable<InterfacecCarreraGruposTutoria> {
        const body = {
            pk_encriptada: sessionStorage['IdEncriptada']
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'get_grupos_coordinador_departamental',
            body,
            GenericServicesService.HEADERS
        );
    }
}
