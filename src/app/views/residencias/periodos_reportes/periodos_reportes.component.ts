import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-periodos-reportes',
  templateUrl: './periodos_reportes.component.html',
  styleUrls: ['./periodos_reportes.component.scss']
})
export class Periodos_reportesComponent extends GenericServicesService implements OnInit {
    fini = this.fini;
    ffin = this.ffin;
    opcionSeleccionado = this.opcionSeleccionado;
    usuario = sessionStorage.getItem('IdUsuario');
  constructor(private http: HttpClient) { super(http); }

  ngOnInit() {
  }

    cargarFechas() {
        if (this.fini < this.ffin) {
            this.http.post(GenericServicesService.API_ENDPOINT + 'PeriodoR', {
                'FK_AREA_ACADEMICA': this.usuario.toString(),
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
