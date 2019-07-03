import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ITotal} from './proyectos.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class Totalp extends GenericServicesService {
    constructor(private http: HttpClient) {super(http); }
    getTotalProyectos(): Observable<ITotal> {
        return this.http.get<ITotal> (GenericServicesService.API_ENDPOINT + 'Totalp', GenericServicesService.HEADERS);
    }
}
