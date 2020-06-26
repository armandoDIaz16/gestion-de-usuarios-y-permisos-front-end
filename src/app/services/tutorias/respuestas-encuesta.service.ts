import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RespuestasEncuestaService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_respuestas(query_params?: string) {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'respuestas_encuesta' + query_params,
            GenericServicesService.HEADERS
        );
    }
}
