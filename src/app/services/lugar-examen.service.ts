import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITurno, IEspacio, ITipoEspacio, IEdificio, ITurno2 } from './lugar-examen';

@Injectable()
export class LugarExamenService {
    constructor(private http: HttpClient) { }

    getTurno(): Observable<ITurno[]> {
        return this.http.get<ITurno[]>('http://127.0.0.1:8000/api/Turno');
    }
    getTurno2(): Observable<ITurno2[]> {
        return this.http.get<ITurno2[]>('http://127.0.0.1:8000/api/Turno2');
    }
    getEspacio(): Observable<IEspacio[]> {
        return this.http.get<IEspacio[]>('http://127.0.0.1:8000/api/Espacio');
    }
    getTipoEspacio(): Observable<ITipoEspacio[]> {
        return this.http.get<ITipoEspacio[]>('http://127.0.0.1:8000/api/TipoEspacio');
    }
    getEdificio(): Observable<IEdificio[]> {
        return this.http.get<IEdificio[]>('http://127.0.0.1:8000/api/Edificio');
    }    
    addTurnoExamen(datos) {
        return this.http.post('http://127.0.0.1:8000/api/AgregarTurno/', datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }   
    addEspacioExamen(datos) {
        return this.http.post('http://127.0.0.1:8000/api/AgregarEspacio/', datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    addGrupoExamen(datos) {
        return this.http.post('http://127.0.0.1:8000/api/AgregarGrupo/', datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
}