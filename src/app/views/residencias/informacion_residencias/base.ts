import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IBase} from './informacion.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Base extends GenericServicesService {
    constructor(private http: HttpClient) { super(http); }
    getBase(): Observable<IBase[]> {
        return this.http.get<IBase[]>(GenericServicesService.API_ENDPOINT + 'BaseResidencias', GenericServicesService.HEADERS);
    }
}
