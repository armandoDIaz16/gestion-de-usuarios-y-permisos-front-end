import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceEncuestaCompleta} from '../_models/EncuestasModel';

@Injectable({
    providedIn: 'root'
})
export class ResponderEncuestaService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_encuesta_completa(pk_aplicacion_encuesta: number): Observable<InterfaceEncuestaCompleta> {
        return this.http.get<InterfaceEncuestaCompleta>(
            GenericServicesService.API_ENDPOINT + 'get_encuesta_aplicacion/' + pk_aplicacion_encuesta,
            GenericServicesService.HEADERS
        );
    }

    guarda_respuestas_pasatiempos(pk_aplicacion_encuesta: number, pk_encuesta: number, array_respuestas) {
        var body = {
            PK_APLICACION: pk_aplicacion_encuesta,
            PK_ENCUESTA: pk_encuesta,
            RESPUESTAS: array_respuestas
        };

        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guarda_respuestas_encuesta',
            body,
            GenericServicesService.HEADERS,
        );
    }

    guarda_respuestas(body) {

        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guarda_respuestas_encuesta',
            body,
            GenericServicesService.HEADERS,
        );
    }
}
