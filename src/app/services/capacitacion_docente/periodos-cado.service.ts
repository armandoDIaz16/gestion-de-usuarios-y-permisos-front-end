import { Injectable } from '@angular/core';
import { GenericServicesService } from '../generic-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// modelos
import { Periodo } from '../../models/capacitacion_docente/cado-model.model';
@Injectable({
  providedIn: 'root'
})
export class PeriodosCadoService extends GenericServicesService {

  constructor(private http: HttpClient,) {
    super(http);
   }
    busca_periodo_con_cursos(pk_periodo) {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'busca_periodo_con_cursos/' + pk_periodo,
            GenericServicesService.HEADERS
        );
    }


    consulta_periodos_activos() {
        return this.http.get(
            GenericServicesService.API_ENDPOINT + 'consulta_periodos_activos',
            GenericServicesService.HEADERS
        );
    }

   consulta_periodos() {
    return this.http.get(
      GenericServicesService.API_ENDPOINT + 'consulta_periodos',
      GenericServicesService.HEADERS
    );
   }

   registra_periodo(body: object) {
        return this.http.post(
            GenericServicesService.API_ENDPOINT + 'registro_periodo',
            body,
            GenericServicesService.HEADERS
        );
    }

   busca_un_periodo(pk_usuario) {
    return this.http.get(
      GenericServicesService.API_ENDPOINT + 'consulta_un_periodo/' + pk_usuario,
      GenericServicesService.HEADERS
    );
  }

  modificar_periodo(body: object) {
    return this.http.post(
      GenericServicesService.API_ENDPOINT + 'modificar_periodo',
      body,
      GenericServicesService.HEADERS
    );
  }

  eliminar_periodo(body: object) {
    return this.http.post(
      GenericServicesService.API_ENDPOINT + 'eliminar_periodo',
      body,
      GenericServicesService.HEADERS
    );
  }

}
