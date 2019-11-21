import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfacecCarreraGruposTutoria} from '../_models/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos(pk_tutor: number): Observable<InterfacecCarreraGruposTutoria> {
        return this.http.get<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'grupos_tutoria/' + pk_tutor,
            GenericServicesService.HEADERS
        );
    }

    get_url_back(url: string) {
        return GenericServicesService.API_ENDPOINT + url;
    }
}
