import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IAnteproyectos} from './anteproyectos.service';


@Injectable()
export class AnteproyectosSeleccion {
    constructor(private http: HttpClient) {}
    getAnteproyectos($id): Observable<IAnteproyectos[]> {
        return this.http.get<IAnteproyectos[]>('http://127.0.0.1:8000/api/Anteproyecto/' + $id);
    }
}
