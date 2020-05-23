import { Injectable } from '@angular/core';
import { GenericServicesService } from '../generic-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CursoCadoService extends GenericServicesService {

  constructor(private http: HttpClient) {
      super(http);
  }

     async busca_curso_por_pk(pk_curso) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_curso_por_pk/' + pk_curso,
            GenericServicesService.HEADERS
        ).toPromise();
    }


    eliminar_curso(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'eliminar_curso',
            body,
            GenericServicesService.HEADERS
        );
    }

    busca_curso_misma_hora(fecha_inicio, hora_inicio ) {
       /* return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_curso_misma_hora/' + fecha_inicio + '/' + hora_inicio ,
            GenericServicesService.HEADERS
        );*/
    }

    busca_instructor(pk_participante) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_instructor/' + pk_participante,
            GenericServicesService.HEADERS
        );
    }

    consulta_cursos_instructor(pk_participante) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_cursos_instructor/' + pk_participante,
            GenericServicesService.HEADERS
        );
    }
    consulta_cursos_coordinador() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_cursos_coordinador',
            GenericServicesService.HEADERS
        );
    }

    carga_convocatoria_cursos() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'carga_convocatoria_cursos',
            GenericServicesService.HEADERS
        );
    }

    modifica_curso(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'modifica_curso',
            body,
            GenericServicesService.HEADERS
        );
    }

    registra_curso(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'registro_curso',
            body,
            GenericServicesService.HEADERS
        );
    }

    carga_estados_curso() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'carga_estados_curso',
            GenericServicesService.HEADERS
        );
    }

    actualiza_estatus_curso( pk_curso , estatus) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'actualiza_estatus_curso/' + pk_curso + '/' + estatus,
            GenericServicesService.HEADERS
        );

    }

    consulta_area_academica() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_area_academica',
            GenericServicesService.HEADERS
        );
    }
    consulta_edificios() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_edificios',
            GenericServicesService.HEADERS
        );
    }
    consulta_institutos() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_institutos',
            GenericServicesService.HEADERS
        );
    }
    filtro_docente(valor) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'filtro_docente/' + valor,
            GenericServicesService.HEADERS
        );

    }

    consulta_participante(noControl) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_participante/' + noControl,
            GenericServicesService.HEADERS
        );
    }
}
