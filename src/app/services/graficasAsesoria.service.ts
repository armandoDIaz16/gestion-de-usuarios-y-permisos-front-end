import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IGraficaAsesorados, IGraficaMaterias, IGraficaNoAsesorados } from './graficasAsesoria';
import { GenericServicesService } from './generic-services.service';

@Injectable()
export class GraficasAsesoriaService extends GenericServicesService{
    constructor(private http: HttpClient,
    private genericServicesService: GenericServicesService ){ super(http); }
  
    private baseUrl = GenericServicesService.API_ENDPOINT;

    getGraficaAsesorados(): Observable<IGraficaAsesorados[]> {
        return this.http.get<IGraficaAsesorados[]>(this.baseUrl+'GraficaAsesorados/');
    }
    getGraficaNoAsesorados(): Observable<IGraficaNoAsesorados[]> {
        return this.http.get<IGraficaNoAsesorados[]>(this.baseUrl+'GraficaNoAsesorados/');
    }
    getGraficaMaterias(): Observable<IGraficaMaterias[]> {
        return this.http.get<IGraficaMaterias[]>(this.baseUrl+'GraficaMaterias/');
    }
}