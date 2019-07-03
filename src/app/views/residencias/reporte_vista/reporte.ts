import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IReportes} from './reporte.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Reportes extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getAnteproyectos(id): Observable<IReportes[]> {
        return this.http.get<IReportes[]>(GenericServicesService.API_ENDPOINT + 'Reporte/' + id, GenericServicesService.HEADERS);
    }
}
