import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceGruposTutoria} from '../_models/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos(pk_tutor: number): Observable<InterfaceGruposTutoria> {
        return this.http.get<InterfaceGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'grupos_tutoria/' + pk_tutor,
            GenericServicesService.HEADERS
        );
    }
}
