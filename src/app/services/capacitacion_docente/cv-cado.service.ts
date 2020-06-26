import { Injectable } from '@angular/core';
import { GenericServicesService } from '../generic-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CvCadoService extends GenericServicesService {

  constructor(private http: HttpClient) {
      super(http);
  }



    busca_participante_cv(pk_participante) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_participante_por_pk/' + pk_participante,
            GenericServicesService.HEADERS
        ).toPromise();
    }

    crear_actualizar_cv(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'crear_actualizar_cv',
            body,
            GenericServicesService.HEADERS
        );
    }

    guardar_datos_personales(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_datos_personales',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_formacion_academica(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_formacion_academica',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_seccion_experiencia_docente(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_seccion_experiencia_docente',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_productos_academicos(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_productos_academicos',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_seccion_participacion_instructor(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_seccion_participacion_instructor',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_experiencia_laboral(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_experiencia_laboral',
            body,
            GenericServicesService.HEADERS
        );
    }
    carga_tipos_formacion() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'carga_tipos_formacion',
            GenericServicesService.HEADERS
        );
    }





}
