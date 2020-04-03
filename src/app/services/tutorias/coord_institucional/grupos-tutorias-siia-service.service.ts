import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceGrupoSiia} from '../../../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposTutoriasSiiaServiceService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos_siia(): Observable<InterfaceGrupoSiia[]> {
        return this.http.post<InterfaceGrupoSiia[]>(
            GenericServicesService.API_ENDPOINT + 'get_grupos_siia',
            [],
            GenericServicesService.HEADERS
        );
    }
}
