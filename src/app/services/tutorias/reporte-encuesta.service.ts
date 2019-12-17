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

    get_reporte_encuesta(pk_aplicacion_encuesta: number): Observable<InterfaceEncuestaCompleta> {
        return this.http.get<InterfaceEncuestaCompleta>(
            GenericServicesService.API_ENDPOINT + 'get_reporte_encuesta/' + pk_aplicacion_encuesta,
            GenericServicesService.HEADERS
        );
    }
}
