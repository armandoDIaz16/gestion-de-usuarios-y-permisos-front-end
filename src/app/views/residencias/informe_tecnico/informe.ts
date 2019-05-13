import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IInformes} from './informe.service';


@Injectable()
export class Informe {
    constructor(private http: HttpClient) {}
    getAnteproyectos(id): Observable<IInformes[]> {
        return this.http.get<IInformes[]>('http://127.0.0.1:8000/api/Informe/' + id);
    }
}
