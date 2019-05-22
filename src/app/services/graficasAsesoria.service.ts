import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IGraficaAsesorados, IGraficaMaterias, IGraficaNoAsesorados } from './graficasAsesoria';

@Injectable()
export class GraficasAsesoriaService {
    constructor(private http: HttpClient) { }

    getGraficaAsesorados(): Observable<IGraficaAsesorados[]> {
        return this.http.get<IGraficaAsesorados[]>('http://127.0.0.1:8000/api/GraficaAsesorados/');
    }
    getGraficaNoAsesorados(): Observable<IGraficaNoAsesorados[]> {
        return this.http.get<IGraficaNoAsesorados[]>('http://127.0.0.1:8000/api/GraficaNoAsesorados/');
    }
    getGraficaMaterias(): Observable<IGraficaMaterias[]> {
        return this.http.get<IGraficaMaterias[]>('http://127.0.0.1:8000/api/GraficaMaterias/');
    }
}