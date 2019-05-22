import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IProyecto} from './proyectos.service';



@Injectable()
export class Proyectos {
    constructor(private http: HttpClient) {}
    getProyectos(): Observable<IProyecto> {
        return this.http.get<IProyecto> ('http://127.0.0.1:8000/api/Estadisticas');
    }
}
