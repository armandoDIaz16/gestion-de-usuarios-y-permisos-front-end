import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IReporte} from './maestro.service';
import {GenericServicesService} from '../../../services/generic-services.service';

@Injectable()
export class Reporte extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getReporte(id): Observable<IReporte[]> {
        return this.http.get<IReporte[]>(GenericServicesService.API_ENDPOINT + 'Repdocente/' + id, GenericServicesService.HEADERS);
    }
}
