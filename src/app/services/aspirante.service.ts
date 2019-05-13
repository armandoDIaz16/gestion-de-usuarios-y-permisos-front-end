import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IAspirante, IReferencia, IAspirantes, IEstatus, IGraficaEstatus, IGraficaCarreras, IGraficaCampus, IGrupos } from './aspirante';

@Injectable()
export class AspiranteService {
    constructor(private http: HttpClient) { }

    addAspirante(datos) {
        return this.http.post('http://127.0.0.1:8000/api/Aspirante', datos
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
        return this.http.get<IAspirante[]>('http://localhost:8000/api/Aspirante/'+sessionStorage.getItem('IdUsuario')
            //+sessionStorage.getItem('sistema')
        );
    }    
    getEditAspirante(pk_usuario): Observable<IAspirante[]> {
        return this.http.get<IAspirante[]>('http://localhost:8000/api/Aspirante/'+pk_usuario
            //+sessionStorage.getItem('sistema')
        );
    }
    getReferencia(preficha): Observable<IReferencia[]> {
        return this.http.get<IReferencia[]>('http://127.0.0.1:8000/api/Referencia/' + preficha
        );
    }
/*     getFicha(preficha){
        return this.http.get('http://127.0.0.1:8000/api/Ficha/' + preficha
        );
    } */
    getAspirantes(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>('http://127.0.0.1:8000/api/Aspirantes/' + pk_periodo
        );
    }    
    getAspirantes2(pk_periodo,fechaInicio,fechaFin): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>('http://127.0.0.1:8000/api/Aspirantes2?PK_PERIODO=' + pk_periodo + '&FECHA_INICIO=' + fechaInicio+ '&FECHA_FIN=' + fechaFin
        );
    }
    getAspirantes3(pk_periodo): Observable<IAspirantes[]> {
        return this.http.get<IAspirantes[]>('http://127.0.0.1:8000/api/Aspirantes3/' + pk_periodo
        );
    }
    getGrupos(pk_espacio,dia,hora): Observable<IGrupos[]> {
        return this.http.get<IGrupos[]>('http://127.0.0.1:8000/api/Grupo?PK_ESPACIO=' + pk_espacio + '&DIA=' + dia+ '&HORA=' + hora
        );
    } 
    getEstatus(): Observable<IEstatus[]> {
        return this.http.get<IEstatus[]>('http://127.0.0.1:8000/api/EstatusAspirante/'
        );
    }
    getGraficaEstatus(pk_periodo): Observable<IGraficaEstatus[]> {
        return this.http.get<IGraficaEstatus[]>('http://127.0.0.1:8000/api/GraficaEstatus/' + pk_periodo
        );
    }
    getGraficaCarreras(pk_periodo): Observable<IGraficaCarreras[]> {
        return this.http.get<IGraficaCarreras[]>('http://127.0.0.1:8000/api/GraficaCarreras/' + pk_periodo
        );
    }
    getGraficaCampus(pk_periodo): Observable<IGraficaCampus[]> {
        return this.http.get<IGraficaCampus[]>('http://127.0.0.1:8000/api/GraficaCampus/' + pk_periodo
        );
    }
    addPagos(datos,pk_periodo) {
        return this.http.post('http://127.0.0.1:8000/api/CargarArchivoBanco/'+pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    addPreRegistrados(datos,pk_periodo) {
        return this.http.post('http://127.0.0.1:8000/api/CargarArchivoPreRegistroCENEVAL/'+pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }   
    addRegistrados(datos,pk_periodo) {
        return this.http.post('http://127.0.0.1:8000/api/CargarArchivoRegistroCENEVAL/'+pk_periodo, datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
    updateAspirante(datos) {
        return this.http.post('http://127.0.0.1:8000/api/Aspirante2/', datos
        ).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
}