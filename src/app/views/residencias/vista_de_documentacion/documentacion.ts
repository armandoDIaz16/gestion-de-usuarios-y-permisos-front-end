import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IDocumentacion} from './documentacion.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Documentacion extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getDocumentos(id): Observable<IDocumentacion[]> {
        return this.http.get<IDocumentacion[]>(GenericServicesService.API_ENDPOINT + 'Verdoc/' + id, GenericServicesService.HEADERS);
    }
}
