import {Injectable} from '@angular/core';
import {GenericServicesService} from '../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class DetalleGrupoService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_detalle_grupo(pk_grupo: number): Observable<InterfaceGruposTutoria> {
        return this.http.get<InterfaceGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'detalle_grupo/' + pk_grupo,
            GenericServicesService.HEADERS
        );
    }
}
