import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposInicialDetalleService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_detalle(query_params?: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'detalle_grupo' + query_params,
            GenericServicesService.HEADERS
        );
    }
}
