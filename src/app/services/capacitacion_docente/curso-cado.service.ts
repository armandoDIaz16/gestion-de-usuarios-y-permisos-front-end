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


    busca_curso_misma_hora(fecha_inicio) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_instructor/' + fecha_inicio,
            GenericServicesService.HEADERS
        );
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

    registra_curso(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'registro_curso',
            body,
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
