import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericServicesService} from '../../../services/generic-services.service';
import {InterfaceEncuestaPendiente} from '../_models/EncuestasModel';

@Injectable({
    providedIn: 'root'
})
export class EncuestasService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_encuestas(id_usuario: number): Observable<InterfaceEncuestaPendiente[]> {
        return this.http.get<InterfaceEncuestaPendiente[]>(
            GenericServicesService.API_ENDPOINT + 'cuestionarios_usuario/' + id_usuario,
            GenericServicesService.HEADERS
        );
    }
}
