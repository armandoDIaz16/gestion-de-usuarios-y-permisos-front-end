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

      private baseUrl = GenericServicesService.API_ENDPOINT;
      private headers = GenericServicesService.HEADERS;
        
    addPeriodo(fechas){
        this.genericServicesService.post('Periodo',fechas);
    }

    addPeriodo2(fechas){
        return this.http.post(GenericServicesService.API_ENDPOINT + 'Periodo', fechas, GenericServicesService.HEADERS
            ).subscribe(
                (response) => {
                    console.log(response);
            }
        );
    }

    addPeriodoCurso(fechas){
        return this.http.post(GenericServicesService.API_ENDPOINT + 'PeriodoCurso', fechas, GenericServicesService.HEADERS
            ).subscribe(
                (response) => {
                    console.log(response);
            }
        );
    }

    addPeriodoInscripcion(fechas){
        return this.http.post(GenericServicesService.API_ENDPOINT + 'PeriodoInscripcion', fechas, GenericServicesService.HEADERS
            ).subscribe(
                (response) => {
                    console.log(response);
            }
        );
    }

    addPeriodoInscripcionCero(fechas){
        return this.http.post(GenericServicesService.API_ENDPOINT + 'PeriodoInscripcionCero', fechas, GenericServicesService.HEADERS
            ).subscribe(
                (response) => {
                    console.log(response);
            }
        );
    }

    addMontoPreficha(monto){
        return this.http.post(this.baseUrl + 'MontoPreficha',  monto, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    addMontoCurso(monto){
        return this.http.post(this.baseUrl + 'MontoCurso',  monto, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    addMontoInscripcion(monto){
        return this.http.post(this.baseUrl + 'MontoInscripcion',  monto, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    addMontoInscripcionCero(monto){
        return this.http.post(this.baseUrl + 'MontoInscripcionCero',  monto, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    publicarResultados(resultados){
        return this.http.post(this.baseUrl + 'PublicarResultados',  resultados, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    updateMenajes(mensajes){
        return this.http.post(this.baseUrl + 'MensajesAceptacion',  mensajes, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    getPeriodo():Observable<Periodo>{
        return this.http.get<Periodo>(GenericServicesService.API_ENDPOINT + 'Periodo');
    }
}