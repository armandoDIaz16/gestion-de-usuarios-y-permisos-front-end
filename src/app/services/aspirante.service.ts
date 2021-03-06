import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IAspirante, IAspirantes, IEstatus, IGraficaEstatus, IGraficaCarreras, IGraficaCampus, IGrupos, IListaGrupos } from './aspirante';
import { GenericServicesService } from './generic-services.service';

@Injectable()
export class AspiranteService extends GenericServicesService {

    constructor(private http: HttpClient,
        private genericServicesService: GenericServicesService) { super(http); }

    private baseUrl = GenericServicesService.API_ENDPOINT;
    private headers = GenericServicesService.HEADERS;

    async addAspirante(datos) {
        return this.http.post(this.baseUrl + 'Aspirante', datos, this.headers).toPromise();
    }
    getAspirante(): Observable<IAspirante[]> {
        return this.http.get<IAspirante[]>(this.baseUrl + 'Aspirante/' + sessionStorage.getItem('IdUsuario'), this.headers
            // +sessionStorage.getItem('sistema')
        );
    }
    getEditAspirante(pk_usuario): Observable<IAspirante[]> {
        return this.http.get<IAspirante[]>(this.baseUrl + 'Aspirante/' + pk_usuario, this.headers
            // +sessionStorage.getItem('sistema')
        );
    }
    getAspirantes(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(this.baseUrl + 'Aspirantes/' + pk_periodo, this.headers
        );
    }
    getAspirantes2(pk_periodo, fechaInicio, fechaFin): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(
            this.baseUrl + 'Aspirantes2?PK_PERIODO=' + pk_periodo + '&FECHA_INICIO=' + fechaInicio + '&FECHA_FIN=' + fechaFin,
            this.headers
        );
    }
    getAspirantes3(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(this.baseUrl + 'Aspirantes3/' + pk_periodo, this.headers
        );
    }
    getReferenciasPagadas(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(this.baseUrl + 'ReferenciasPagadas/' + pk_periodo, this.headers
        );
    }
    getGrupos(pk_periodo, grupo, tipoAplicacion): Observable<IGrupos[]> {
        return this.http.get<IGrupos[]>(
            this.baseUrl + 'ListaGrupo?FK_PERIODO=' + pk_periodo + '&FK_GRUPO=' + grupo + '&TIPO_APLICACION=' + tipoAplicacion,
            this.headers
        );
    }
    getListaGrupos(pk_periodo): Observable<IListaGrupos[]> {
        return this.http.get<IListaGrupos[]>(this.baseUrl + 'ListasGrupos/' + pk_periodo, this.headers
        );
    }
    getListaGruposIngles(pk_periodo): Observable<IListaGrupos[]> {
        return this.http.get<IListaGrupos[]>(this.baseUrl + 'ListasGruposIngles/' + pk_periodo, this.headers
        );
    }
    getEstatus(): Observable<IEstatus[]> {
        return this.http.get<IEstatus[]>(this.baseUrl + 'EstatusAspirante/', this.headers
        );
    }
    getGraficaEstatus(pk_periodo): Observable<IGraficaEstatus[]> {
        return this.http.get<IGraficaEstatus[]>(this.baseUrl + 'GraficaEstatus/' + pk_periodo, this.headers
        );
    }
    getGraficaCarreras(pk_periodo): Observable<IGraficaCarreras[]> {
        return this.http.get<IGraficaCarreras[]>(this.baseUrl + 'GraficaCarreras/' + pk_periodo, this.headers
        );
    }
    getGraficaCampus(pk_periodo): Observable<IGraficaCampus[]> {
        return this.http.get<IGraficaCampus[]>(this.baseUrl + 'GraficaCampus/' + pk_periodo, this.headers
        );
    }
    getPlantillaSIIA(periodo) {
        return this.http.get(this.baseUrl + 'PlantillaSIIA/' + periodo, this.headers
        );
    }
    async addPagos(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'CargarArchivoBanco/' + pk_periodo, datos, this.headers).toPromise();
    }
    async addPreRegistrados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'CargarArchivoPreRegistroCENEVAL/' + pk_periodo, datos, this.headers).toPromise();
    }
    async addRegistrados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'CargarArchivoRegistroCENEVAL/' + pk_periodo, datos, this.headers).toPromise();
    }
    async addResultados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'CargarArchivoResultados/' + pk_periodo, datos, this.headers).toPromise();
    }
    async addAceptados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'CargarArchivoAceptados/' + pk_periodo, datos, this.headers).toPromise();
    }
    async addAsistencia(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'CargarArchivoAcistencia/' + pk_periodo, datos, this.headers).toPromise();
    }
    async updateAspirante(datos) {
        return this.http.post(this.baseUrl + 'Aspirante2/', datos, this.headers).toPromise();
    }
    enviarCorreo(datos) {
        return this.http.post(this.baseUrl + 'EnviarCorreos/', datos, this.headers
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    async addDocumento(datos, pk_periodo) {
        return this.http.post(this.baseUrl + 'GuardarDocumento/' + pk_periodo, datos, this.headers).toPromise();
    }
    getDocumento(pk_usuario, nombre) {
        return this.http.get(this.baseUrl + 'ObtenerDocumento?PK_USUARIO=' + pk_usuario + '&ARCHIVO=' + nombre, this.headers
        );
    }
}
