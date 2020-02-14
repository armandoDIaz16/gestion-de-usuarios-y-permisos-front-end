import {Injectable} from '@angular/core';
import {GenericServicesService} from './generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfacecCarreraGruposTutoria} from '../models/tutorias/GrupoModel';

@Injectable({
    providedIn: 'root'
})
export class GruposService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_grupos(): Observable<InterfacecCarreraGruposTutoria> {
        let body = {
            permisos: JSON.parse(sessionStorage['permisos'])
        };

        return this.http.post<InterfacecCarreraGruposTutoria>(
            GenericServicesService.API_ENDPOINT + 'grupos_tutoria',
            body,
            GenericServicesService.HEADERS
        );
    }

    get_url_back(ruta: string): string {
        return GenericServicesService.ENDPOINT + ruta;
    }
}
