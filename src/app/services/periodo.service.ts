import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

export interface Periodo{
    fechaInicial: string,
    fechaFinal: string
}

@Injectable()
export class PeriodoService{  
    constructor(private http: HttpClient){}
    addPeriodo(fechas){
        return this.http.post('http://127.0.0.1:8000/api/Periodo?token='+sessionStorage.getItem('token'), fechas
            ).subscribe(
                (response) => {
                    //response;
            }
        );
    } 
/*     updatePeriodo(fechas,idPeriodo){
        return this.http.patch('http://127.0.0.1:8000/api/Periodo/'+idPeriodo, fechas
            ).subscribe(
                (response) => {
                    //console.log(response);
            }
        );
    } */
    getPeriodo():Observable<Periodo>{
        return this.http.get<Periodo>('http://127.0.0.1:8000/api/Periodo');
    }
}