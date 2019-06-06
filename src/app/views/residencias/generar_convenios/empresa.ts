import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IEmpresas} from './empresa.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Empresas extends GenericServicesService {
    constructor(private http: HttpClient) { super(http); }
    getAnteproyectos(): Observable<IEmpresas[]> {
        return this.http.get<IEmpresas[]>(GenericServicesService.API_ENDPOINT + 'Convenio', GenericServicesService.HEADERS);
    }
}
