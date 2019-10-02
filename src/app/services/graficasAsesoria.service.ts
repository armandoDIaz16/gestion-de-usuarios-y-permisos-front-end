import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IGraficaAsesorados, IGraficaMaterias, IGraficaNoAsesorados,IGraficaMotivos } from './graficasAsesoria';
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
    getGraficaMotivos(mate): Observable<IGraficaMotivos[]> {
        return this.http.get<IGraficaMotivos[]>(this.baseUrl+'GraficaMotivosMaterias?materia=' + mate);
    }
    getMateria(){
        return this.http.get(this.baseUrl+'Materias');
    }
    getInstitucion(){
        return this.http.get(this.baseUrl+'Institucion');
    }
    getCarrera(){
        return this.http.get(this.baseUrl+'CarreraMot');
    }
    getMotivosInstuticion(id){
        return this.http.get(this.baseUrl+'GraficaMotivosInstitucion?tecnologico=' + id);
    }
    getMotivosCarrera(id){
        return this.http.get(this.baseUrl+'GraficaMotivosCarera?carrera=' + id);
    }
    getGeneralEvalSemestre(){
        return this.http.get(this.baseUrl+'GraficaGeneralEvalSemestre');
    }
    getGeneralEvalCarrera(){
        return this.http.get(this.baseUrl+'GraficaGeneralEvalCarrera');
    }
    getGeneralEvalMateria(){
        return this.http.get(this.baseUrl+'GraficaGeneralEvalMateria');
    }
    getIntegralEval(){
        return this.http.get(this.baseUrl+'GraficaIntegralEval');
    }
    getIntegralMate(){
        return this.http.get(this.baseUrl+'GraficaIntegralMate');
    }
    getIntegralCarre(){
        return this.http.get(this.baseUrl+'GraficaIntegralCarre');
    }
    getGeneralSol(){
        return this.http.get(this.baseUrl+'GraficaGeneralSol');
    }
    getGeneralSolMat(){
        return this.http.get(this.baseUrl+'GraficaGeneralSolMat');
    }
    getGeneralSolCar(){
        return this.http.get(this.baseUrl+'GraficaGeneralSolCar');
    }
    getGeneralSolCarMat(){
        return this.http.get(this.baseUrl+'GraficaGeneralSolCarMat');
    }
    getGeneralAprRep(){
        return this.http.get(this.baseUrl+'GraficaGeneralAproRep');
    }
    getGeneralAprRepMat(){
        return this.http.get(this.baseUrl+'GraficaGeneralAproRepMat');
    }
    getGeneralAprRepCar(){
        return this.http.get(this.baseUrl+'GraficaGeneralAproRepCar');
    }
    getGeneralAprRepCarMat(){
        return this.http.get(this.baseUrl+'GraficaGeneralAproRepCarMat');
    }
}