import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GruposSeguimientoService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }
}
