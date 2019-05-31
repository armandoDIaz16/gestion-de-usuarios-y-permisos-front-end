import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IProyecto} from './proyectos.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Proyectos extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getProyectos(): Observable<IProyecto> {
        return this.http.get<IProyecto> (GenericServicesService.API_ENDPOINT + 'Estadisticas', GenericServicesService.HEADERS);
    }
}
