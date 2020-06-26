import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceConferencia} from '../../../models/tutorias/ConferenciaModel';

@Injectable({
    providedIn: 'root'
})
export class ConferenciasServiceService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    /* INICIO CAPTURISTAS */
    agrega_capturista(pk_usuario, pk_conferencia) {
        const body = {
            pk_usuario: pk_usuario,
            pk_conferencia: pk_conferencia
        };

        return <any>this.http.post(
            GenericServicesService.API_ENDPOINT + 'capturistas',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_capturistas(query_params?: string) {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'capturistas' + query_params,
            GenericServicesService.HEADERS
        );
    }

    eliminar_capturista(pk_capturista) {
        return <any>this.http.delete(
            GenericServicesService.API_ENDPOINT + 'capturistas/' + pk_capturista,
            GenericServicesService.HEADERS
        );
    }
    /* FIN CAPTURISTAS */

    /* INICIO CONFERENCIAS */
    guardar(body): any {
        return <any>this.http.post(
            GenericServicesService.API_ENDPOINT + 'conferencias',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_conferencias(query_params?: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'conferencias' + query_params,
            GenericServicesService.HEADERS
        );
    }

    get_conferencia(query_params?: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'conferencias' + query_params,
            GenericServicesService.HEADERS
        );
    }

    actualizar(body, pk_conferencia) {
        return <any>this.http.put(
            GenericServicesService.API_ENDPOINT + 'conferencias/' + pk_conferencia,
            body,
            GenericServicesService.HEADERS
        );
    }

    eliminar(pk_conferencia: number) {
        return <any>this.http.delete(
            GenericServicesService.API_ENDPOINT + 'conferencias/' + pk_conferencia,
            GenericServicesService.HEADERS
        );
    }
    /* FIN CONFERENCIAS */
}
