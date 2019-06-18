import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.scss']
})
export class PeriodosComponent extends GenericServicesService implements OnInit {
    fini = this.fini;
    ffin = this.ffin;
    opcionSeleccionado = this.opcionSeleccionado;
  constructor(private http: HttpClient) { super(http); }

  ngOnInit() {
  }

  cargarFechas() {
      confirm('Hola mijo');
      if (this.fini < this.ffin) {
         this.http.post(GenericServicesService.API_ENDPOINT + 'PeriodoR', {
             'FK_AREA_ACADEMICA': 5,
             'ID_PROCESO': this.opcionSeleccionado.toString(),
             'FECHA_INICIO': this.fini.toString(),
             'FECHA_FIN': this.ffin.toString()
         }, GenericServicesService.HEADERS).subscribe(
             (response) => {
                 console.log(response);
             }
         );
      } else {
          console.log('Error en la selección de fechas');
      }
  }

}
