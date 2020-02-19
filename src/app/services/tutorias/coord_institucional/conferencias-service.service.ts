import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceConferencia} from '../../../models/tutorias/ConferenciaModel';

@Injectable({
    providedIn: 'root'
})
export class ConferenciasServiceService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    get_conferencias(): Observable<InterfaceConferencia[]> {
        return this.http.get<InterfaceConferencia[]>(
            GenericServicesService.API_ENDPOINT + 'get_conferencias',
            GenericServicesService.HEADERS
        );
    }
}
