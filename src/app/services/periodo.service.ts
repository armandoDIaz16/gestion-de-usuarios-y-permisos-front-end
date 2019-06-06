import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { GenericServicesService } from './generic-services.service';

export interface Periodo{
    fechaInicial: string,
    fechaFinal: string
}


@Injectable()
export class PeriodoService extends GenericServicesService{ 

    constructor(private http: HttpClient,
        private genericServicesService: GenericServicesService ){ super(http); }
        
    addPeriodo(fechas){
        this.genericServicesService.post('Periodo',fechas);
    }

    addPeriodo2(fechas){
        return this.http.post(GenericServicesService.API_ENDPOINT + 'Periodo', fechas, GenericServicesService.HEADERS
            ).subscribe(
                (response) => {
                    //response;
            }
        );
    } 

    getPeriodo():Observable<Periodo>{
        return this.http.get<Periodo>(GenericServicesService.API_ENDPOINT + 'Periodo');
    }
}