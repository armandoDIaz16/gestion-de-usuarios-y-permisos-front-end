import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IAspirante, IAspirantes, IEstatus, IGraficaEstatus, IGraficaCarreras, IGraficaCampus, IGrupos } from './aspirante';

@Injectable()
export class AspiranteService {

    private baseUrl = 'http://10.0.31.11/backend_swiitl/server.php/api';

    constructor(private http: HttpClient) { }

    addAspirante(datos) {
        return this.http.post(this.baseUrl + '/Aspirante', datos
        ).subscribe(
            (response) => {
                switch (response) {
                    case 1:
                        alert("YA ESTA REGISTRADA ESA CURP EN ESTE PERIODO");
                        break;
                    case 2:
                        alert("YA ESTA REGISTRADO ESE CORREO A OTRO USUARIO");
                        break;
                    case 3:
                        alert("SE ACTUALIZO USUARIO Y SE REGISTRO LA PREFICHA");
                        break;
                    case 4:
                        alert("YA ESTA REGISTRADO ESE CORREO A OTRO USUARIO");
                        break;
                    case 5:
                        alert("SE REGISTRO CORRECTAMENTE");
                        break;
                }
                //alert(response);
                //alert(response[0].RESPUESTA);
                //console.log(response);
            }
        );
    }
    getAspirante(): Observable<IAspirante[]> {
        return this.http.get<IAspirante[]>(this.baseUrl + '/Aspirante/' + sessionStorage.getItem('IdUsuario')
            //+sessionStorage.getItem('sistema')
        );
    }
    getEditAspirante(pk_usuario): Observable<IAspirante[]> {
        return this.http.get<IAspirante[]>(this.baseUrl + '/Aspirante/' + pk_usuario
            //+sessionStorage.getItem('sistema')
        );
    }
    getAspirantes(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(this.baseUrl + '/Aspirantes/' + pk_periodo
        );
    }
    getAspirantes2(pk_periodo, fechaInicio, fechaFin): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(this.baseUrl + '/Aspirantes2?PK_PERIODO=' + pk_periodo + '&FECHA_INICIO=' + fechaInicio + '&FECHA_FIN=' + fechaFin
        );
    }
    getAspirantes3(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>(this.baseUrl + '/Aspirantes3/' + pk_periodo
        );
    }
    getGrupos(pk_espacio, dia, hora): Observable<IGrupos[]> {
        return this.http.get<IGrupos[]>(this.baseUrl + '/Grupo?PK_ESPACIO=' + pk_espacio + '&DIA=' + dia + '&HORA=' + hora
        );
    }
    getEstatus(): Observable<IEstatus[]> {
        return this.http.get<IEstatus[]>(this.baseUrl + '/EstatusAspirante/'
        );
    }
    getGraficaEstatus(pk_periodo): Observable<IGraficaEstatus[]> {
        return this.http.get<IGraficaEstatus[]>(this.baseUrl + '/GraficaEstatus/' + pk_periodo
        );
    }
    getGraficaCarreras(pk_periodo): Observable<IGraficaCarreras[]> {
        return this.http.get<IGraficaCarreras[]>(this.baseUrl + '/GraficaCarreras/' + pk_periodo
        );
    }
    getGraficaCampus(pk_periodo): Observable<IGraficaCampus[]> {
        return this.http.get<IGraficaCampus[]>(this.baseUrl + '/GraficaCampus/' + pk_periodo
        );
    }
    addPagos(datos, pk_periodo) {
        return this.http.post(this.baseUrl + '/CargarArchivoBanco/' + pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    addPreRegistrados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + '/CargarArchivoPreRegistroCENEVAL/' + pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    addRegistrados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + '/CargarArchivoRegistroCENEVAL/' + pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    addAceptados(datos, pk_periodo) {
        return this.http.post(this.baseUrl + '/CargarArchivoAceptados/' + pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    updateAspirante(datos) {
        return this.http.post(this.baseUrl + '/Aspirante2/', datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    enviarCorreo(datos) {
        return this.http.post(this.baseUrl + '/EnviarCorreos/', datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
}