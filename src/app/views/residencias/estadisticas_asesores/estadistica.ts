import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IBalance} from './estadistica.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Estadistica extends GenericServicesService {
    constructor(private http: HttpClient) { super(http); }
    getBalance(id): Observable<IBalance[]> {
        return this.http.get<IBalance[]>(GenericServicesService.API_ENDPOINT + 'GraficaMaestro/' + id, GenericServicesService.HEADERS);
    }
}
