import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IComentarios} from './reporte.service';


@Injectable()
export class Comentarios {
    constructor(private http: HttpClient) {}
    getComentarios(id): Observable<IComentarios[]> {
        return this.http.get<IComentarios[]>('http://127.0.0.1:8000/api/Comentario/' + id);
    }
}
