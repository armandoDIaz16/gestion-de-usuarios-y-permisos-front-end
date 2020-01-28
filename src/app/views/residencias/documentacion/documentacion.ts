import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IBalance} from './documentacion.services';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Documento extends GenericServicesService {
    constructor(private http: HttpClient) { super(http); }
    getDocumento(id): Observable<IBalance[]> {
        return this.http.get<IBalance[]>(GenericServicesService.API_ENDPOINT + 'docresalu/' + id, GenericServicesService.HEADERS);
    }
}
