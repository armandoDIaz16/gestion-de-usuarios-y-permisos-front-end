import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ITotal} from './proyectos.service';



@Injectable()
export class Totalp {
    constructor(private http: HttpClient) {}
    getTotalProyectos(): Observable<ITotal> {
        return this.http.get<ITotal> ('http://127.0.0.1:8000/api/Totalp');
    }
}
