import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {InterfaceSeguimiento} from '../views/_models/GeneralModels';
import {GenericServicesService} from './generic-services.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SeguimientoServiceService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    seguimiento_alumno(pk_encriptada: string): Observable<InterfaceSeguimiento[]> {
        return this.http.post<InterfaceSeguimiento[]>(
            GenericServicesService.API_ENDPOINT + 'get_seguimiento',
            {pk_encriptada: pk_encriptada},
            GenericServicesService.HEADERS
        );
    }
}
