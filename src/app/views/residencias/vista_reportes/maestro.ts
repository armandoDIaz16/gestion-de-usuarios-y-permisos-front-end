import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IDocentes} from './maestro.service';
import {GenericServicesService} from '../../../services/generic-services.service';

@Injectable()
export class Maestro extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getMaestro(id): Observable<IDocentes[]> {
        return this.http.get<IDocentes[]>(GenericServicesService.API_ENDPOINT + 'Docente/' + id, GenericServicesService.HEADERS);
    }
}
