import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IExterno} from './maestro.service';

@Injectable()
export class Externo {
    constructor(private http: HttpClient) {}
    getExterno(id): Observable<IExterno[]> {
        return this.http.get<IExterno[]>('http://127.0.0.1:8000/api/ExternoR/' + id);
    }
}
