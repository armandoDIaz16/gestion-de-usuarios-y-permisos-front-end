import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IReporteE} from './maestro.service';
import {GenericServicesService} from '../../../services/generic-services.service';

@Injectable()
export class ReporteE extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getReporteE(id): Observable<IReporteE[]> {
        return this.http.get<IReporteE[]>(GenericServicesService.API_ENDPOINT + 'Repexterno/' + id, GenericServicesService.HEADERS);
    }
}
