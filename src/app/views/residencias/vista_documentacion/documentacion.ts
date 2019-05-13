import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IDocumentacion} from './documentacion.service';


@Injectable()
export class Documentacion {
    constructor(private http: HttpClient) {}
    getDocumentos(id): Observable<IDocumentacion[]> {
        return this.http.get<IDocumentacion[]>('http://127.0.0.1:8000/api/Documentacion/' + id);
    }
}
