import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericServicesService} from '../../../services/generic-services.service';
import {InterfaceDatosCodigoPostal, InterfaceEstadoCivil, InterfaceSituacionResidencia} from '../../_models/GeneralModels';
import {InterfacePerfil} from '../_models/PerfilModel';

@Injectable({
    providedIn: 'root'
})
export class PerfilService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    async get_perfil(id_usuario: number) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'perfil/' + id_usuario,
            GenericServicesService.HEADERS
        ).toPromise();
    }

    public guardar_perfil(body) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'perfil',
            body,
            GenericServicesService.HEADERS
        );
    }

    async get_estados_civiles() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'Estado_Civil',
            GenericServicesService.HEADERS
        ).toPromise();
    }

    async get_situaciones_residencia() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'situacion_residencia',
            GenericServicesService.HEADERS
        ).toPromise();
    }

    async procesa_codigo_postal(codigo_postal: string) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'procesa_codigo_postal',
            {
                codigo_postal: codigo_postal
            },
            GenericServicesService.HEADERS
        ).toPromise();
    }
}
