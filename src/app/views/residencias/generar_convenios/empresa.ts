import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IEmpresas} from './empresa.service';


@Injectable()
export class Empresas {
    constructor(private http: HttpClient) {}
    getAnteproyectos(): Observable<IEmpresas[]> {
        return this.http.get<IEmpresas[]>('http://127.0.0.1:8000/api/Convenio');
    }
}
