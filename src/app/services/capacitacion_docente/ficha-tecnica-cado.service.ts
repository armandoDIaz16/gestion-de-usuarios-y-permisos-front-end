import { Injectable } from '@angular/core';
import { GenericServicesService } from '../generic-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaCadoService extends GenericServicesService {

  constructor(private http: HttpClient) {
      super(http);
  }

    busca_participante_por_pk(pk_participante) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_participante_por_pk/' + pk_participante,
            GenericServicesService.HEADERS
        );
    }


    guarda_comentario(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guarda_comentario',
            body,
            GenericServicesService.HEADERS
        );
    }
    registra_foto_curso(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'registra_foto_curso',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_descripcion_servicio(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_descripcion_servicio',
            body,
            GenericServicesService.HEADERS
        );
    }
    crear_actualizar_ficha(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'crear_actualizar_ficha',
            body,
            GenericServicesService.HEADERS
        );
    }

    guardar_elementos_didacticos(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_elementos_didacticos',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_informacion_servicio(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_informacion_servicio',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_criterios_evaluacion(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_criterios_evaluacion',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_competencias(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_competencias',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_fuentes_informacion(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_fuentes_informacion',
            body,
            GenericServicesService.HEADERS
        );
    }
    guardar_contenidos_tematicos(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'guardar_contenidos_tematicos',
            body,
            GenericServicesService.HEADERS
        );
    }
    registra_archivo_adjunto(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'registra_archivo_adjunto',
            body,
            GenericServicesService.HEADERS
        );
    }
    elimina_archivo_por_pk(pk_archivo, pk_ficha) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'elimina_archivo_por_pk/' + pk_archivo + '/' + pk_ficha,
            GenericServicesService.HEADERS
        );
    }

}
