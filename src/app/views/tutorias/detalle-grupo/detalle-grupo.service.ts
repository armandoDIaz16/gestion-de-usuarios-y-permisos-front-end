import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../_models/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class DetalleGrupoService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_detalle_grupo(pk_grupo: number): Observable<InterfaceGruposTutoria> {
        console.log(pk_grupo);
        return this.http.get<InterfaceGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'detalle_grupo/' + pk_grupo,
            GenericServicesService.HEADERS
        );
    }
}
