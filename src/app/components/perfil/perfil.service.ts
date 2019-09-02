import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {InterfaceEstadoCivil, InterfacePerfil} from './_models/PerfilModel';
import {GenericServicesService} from '../../services/generic-services.service';

@Injectable({
    providedIn: 'root'
})
export class PerfilService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    public get_perfil(id_usuario: number): Observable<InterfacePerfil> {
        return this.http.get<InterfacePerfil>(
            GenericServicesService.API_ENDPOINT + 'perfil/' + id_usuario,
            GenericServicesService.HEADERS
        );
    }

    public guardar_perfil(perfil: InterfacePerfil) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'perfil',
            perfil,
            GenericServicesService.HEADERS
        );
    }

    public get_estado_civiles(): Observable<InterfaceEstadoCivil[]> {
        return this.http.get<InterfaceEstadoCivil[]>(
            GenericServicesService.API_ENDPOINT + 'Estado_Civil',
            GenericServicesService.HEADERS
        );
    }
}
