import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IExterno} from './maestro.service';
import {GenericServicesService} from '../../../services/generic-services.service';

@Injectable()
export class Externo extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getExterno(id): Observable<IExterno[]> {
        return this.http.get<IExterno[]>(GenericServicesService.API_ENDPOINT + 'ExternoR/' + id, GenericServicesService.HEADERS);
    }
}
