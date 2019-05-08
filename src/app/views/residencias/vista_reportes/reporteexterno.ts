import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IReporteE} from './maestro.service';

@Injectable()
export class ReporteE {
    constructor(private http: HttpClient) {}
    getReporteE(id): Observable<IReporteE[]> {
        return this.http.get<IReporteE[]>('http://127.0.0.1:8000/api/Repexterno/' + id);
    }
}
