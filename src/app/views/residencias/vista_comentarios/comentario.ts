import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IComentarios} from './reporte.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Comentarios extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getComentarios(id): Observable<IComentarios[]> {
        return this.http.get<IComentarios[]>(GenericServicesService.API_ENDPOINT + 'Comentario/' + id, GenericServicesService.HEADERS);
    }
}
