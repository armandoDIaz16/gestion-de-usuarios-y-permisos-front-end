import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericServicesService} from '../generic-services.service';
import {InterfaceEncuestaAdmin, InterfaceEncuestaPendiente, InterfaceTipoAplicacion} from '../../models/tutorias/EncuestasModel';
import {InterfaceCarrera} from '../../models/general/CarreraModel';

@Injectable({
    providedIn: 'root'
})
export class EncuestasService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_encuestas_disponibles(): Observable<InterfaceEncuestaAdmin[]> {
        return this.http.get<InterfaceEncuestaAdmin[]>(
            GenericServicesService.API_ENDPOINT + 'get_encuestas_disponibles',
            GenericServicesService.HEADERS
        );
    }

    get_tipos_aplicacion(): Observable<InterfaceTipoAplicacion[]> {
        return this.http.get<InterfaceTipoAplicacion[]>(
            GenericServicesService.API_ENDPOINT + 'get_tipos_aplicacion',
            GenericServicesService.HEADERS
        );
    }

    get_carreras(): Observable<InterfaceCarrera[]> {
        return this.http.get<InterfaceCarrera[]>(
            GenericServicesService.API_ENDPOINT + 'get_carreras',
            GenericServicesService.HEADERS
        );
    }

    get_encuestas_historico(): Observable<InterfaceEncuestaAdmin[]> {
        return this.http.get<InterfaceEncuestaAdmin[]>(
            GenericServicesService.API_ENDPOINT + 'get_encuestas_historico',
            GenericServicesService.HEADERS);
    }

    get_encuestas(id_usuario: any): Observable<InterfaceEncuestaPendiente[]> {
        return this.http.get<InterfaceEncuestaPendiente[]>(
            GenericServicesService.API_ENDPOINT + 'cuestionarios_usuario/' + id_usuario,
            GenericServicesService.HEADERS
        );
    }

    aplicar_encuesta(body: object) {
        return this.http.post(GenericServicesService.API_ENDPOINT + 'aplicar_encuesta',
            body,
            GenericServicesService.HEADERS);
    }

    validar_numero_control(numero_control: string) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'valida_numero_control',
            {NUMERO_CONTROL: numero_control},
            GenericServicesService.HEADERS
        );
    }
}
