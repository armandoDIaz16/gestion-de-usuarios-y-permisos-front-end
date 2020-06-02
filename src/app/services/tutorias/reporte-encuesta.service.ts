import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceEncuestaCompleta} from '../../models/tutorias/EncuestasModel';

@Injectable({
    providedIn: 'root'
})
export class ReporteEncuestaService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_reporte(query_params): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'get_reporte_encuesta' + query_params,
            GenericServicesService.HEADERS
        );
    }

    get_periodos(query_params): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'periodos_tutoria' + query_params,
            GenericServicesService.HEADERS
        );
    }
}
