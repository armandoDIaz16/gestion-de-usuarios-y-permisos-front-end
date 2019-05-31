import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ISiia} from './informacion.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class InfoSiia extends GenericServicesService {
    constructor(private http: HttpClient) { super(http); }
    getInfoSiia(): Observable<ISiia[]> {
        return this.http.get<ISiia[]>(GenericServicesService.API_ENDPOINT + 'BaseResidencias/1', GenericServicesService.HEADERS);
    }
}
