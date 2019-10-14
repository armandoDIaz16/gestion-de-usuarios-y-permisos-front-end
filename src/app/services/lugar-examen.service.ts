import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITurno, IEspacio, ITipoEspacio, IEdificio, ITurno2, IGrupo } from './lugar-examen';
import { GenericServicesService } from './generic-services.service';
import { subscribeToPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class LugarExamenService  extends GenericServicesService {

    constructor(private http: HttpClient){ super(http);}

    private baseUrl = GenericServicesService.API_ENDPOINT;
    private headers = GenericServicesService.HEADERS;

    getTurno(pkPeriodo): Observable<ITurno[]> {
        return this.http.get<ITurno[]>(this.baseUrl+'Turno/'+pkPeriodo, this.headers);
    }
    getTurno2(pkPeriodo): Observable<ITurno2[]> {
        return this.http.get<ITurno2[]>(this.baseUrl+'Turno2/'+pkPeriodo, this.headers);
    }
    getGrupo(pkPeriodo): Observable<IGrupo[]> {
        return this.http.get<IGrupo[]>(this.baseUrl+'Grupo/'+pkPeriodo, this.headers);
    }
    getGrupoEscrito(pkPeriodo): Observable<IGrupo[]> {
        return this.http.get<IGrupo[]>(this.baseUrl+'GrupoEscrito/'+pkPeriodo, this.headers);
    }
    getEspacio(pkPeriodo): Observable<IEspacio[]> {
        return this.http.get<IEspacio[]>(this.baseUrl+'Espacio2/'+pkPeriodo, this.headers);
    }
    getTipoEspacio(): Observable<ITipoEspacio[]> {
        return this.http.get<ITipoEspacio[]>(this.baseUrl+'TipoEspacio/', this.headers);
    }
    getEdificio(): Observable<IEdificio[]> {
        return this.http.get<IEdificio[]>(this.baseUrl+'Edificio', this.headers);
    }    
    addTurnoExamen(datos) {
        return this.http.post(this.baseUrl+'AgregarTurno', datos, this.headers).toPromise();
    }   
    addEspacioExamen(datos) {
        return this.http.post(this.baseUrl+'AgregarEspacio', datos, this.headers).toPromise();
    }
    addGrupoExamen(datos) {
        return this.http.post(this.baseUrl+'AgregarGrupo', datos, this.headers).toPromise();
    }
    addGrupoExamenEscrito(datos) {
        return this.http.post(this.baseUrl+'AgregarGrupoEscrito', datos, this.headers).toPromise();
    }
    updateTurnoExamen(datos) {
        return this.http.post(this.baseUrl+'ModificarTurno', datos, this.headers).toPromise();
    }   
    updateEspacioExamen(datos) {
        return this.http.post(this.baseUrl+'ModificarEspacio', datos, this.headers).toPromise();
    }
    updateGrupoExamen(datos) {
        return this.http.post(this.baseUrl+'ModificarGrupo', datos, this.headers).toPromise();
    }
    updateGrupoExamenEscrito(datos) {
        return this.http.post(this.baseUrl+'ModificarGrupoEscrito', datos, this.headers).toPromise();
    }
}