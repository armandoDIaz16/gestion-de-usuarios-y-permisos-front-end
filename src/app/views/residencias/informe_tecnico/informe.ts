import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IInformes} from './informe.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Informe extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getAnteproyectos(id): Observable<IInformes[]> {
        return this.http.get<IInformes[]>(GenericServicesService.API_ENDPOINT + 'Informe/' + id, GenericServicesService.HEADERS);
    }
}
