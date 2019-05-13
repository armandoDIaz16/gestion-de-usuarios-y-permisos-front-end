import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IDocentes} from './maestro.service';

@Injectable()
export class Maestro {
    constructor(private http: HttpClient) {}
    getMaestro(id): Observable<IDocentes[]> {
        return this.http.get<IDocentes[]>('http://127.0.0.1:8000/api/Docente/' + id);
    }
}
