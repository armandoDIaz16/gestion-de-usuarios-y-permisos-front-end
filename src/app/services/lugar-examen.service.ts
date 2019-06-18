import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITurno, IEspacio, ITipoEspacio, IEdificio, ITurno2 } from './lugar-examen';
import { GenericServicesService } from './generic-services.service';

@Injectable()
export class LugarExamenService  extends GenericServicesService {

    constructor(private http: HttpClient){ super(http);}

    private baseUrl = GenericServicesService.API_ENDPOINT;
    private headers = GenericServicesService.HEADERS;

    getTurno(): Observable<ITurno[]> {
        return this.http.get<ITurno[]>(this.baseUrl+'Turno', this.headers);
    }
    getTurno2(): Observable<ITurno2[]> {
        return this.http.get<ITurno2[]>(this.baseUrl+'Turno2', this.headers);
    }
    getEspacio(): Observable<IEspacio[]> {
        return this.http.get<IEspacio[]>(this.baseUrl+'Espacio', this.headers);
    }
    getTipoEspacio(): Observable<ITipoEspacio[]> {
        return this.http.get<ITipoEspacio[]>(this.baseUrl+'TipoEspacio', this.headers);
    }
    getEdificio(): Observable<IEdificio[]> {
        return this.http.get<IEdificio[]>(this.baseUrl+'Edificio', this.headers);
    }    
    addTurnoExamen(datos) {
        return this.http.post(this.baseUrl+'AgregarTurno/', datos, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }   
    addEspacioExamen(datos) {
        return this.http.post(this.baseUrl+'AgregarEspacio/', datos, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    addGrupoExamen(datos) {
        return this.http.post(this.baseUrl+'AgregarGrupo/', datos, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
}