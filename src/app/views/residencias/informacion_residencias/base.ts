import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IBase} from './informacion.service';


@Injectable()
export class Base {
    constructor(private http: HttpClient) {}
    getBase(): Observable<IBase[]> {
        return this.http.get<IBase[]>('http://127.0.0.1:8000/api/BaseResidencias');
    }
}
