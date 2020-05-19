import { Injectable } from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceCarrera} from '../../models/general/CarreraModel';

@Injectable({
    providedIn: 'root'
})
export class CarrerasService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_carreras(query_params: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'Carrera' + query_params
        );
    }
}
