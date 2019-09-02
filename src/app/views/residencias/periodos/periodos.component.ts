import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.scss'],
  providers: [ValidarModuloService]
})
export class PeriodosComponent extends GenericServicesService implements OnInit {

    public mostrarModulo = false;
    fini = this.fini;
    ffin = this.ffin;
    opcionSeleccionado = this.opcionSeleccionado;
  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Periodos');
      if (!this.mostrarModulo) {
          return;
      }
  }

  cargarFechas() {
      confirm('¿La información es correcta?');
      if (this.fini < this.ffin) {
         this.http.post(GenericServicesService.API_ENDPOINT + 'PeriodoR', {
             'FK_AREA_ACADEMICA': 5,
             'ID_PROCESO': this.opcionSeleccionado.toString(),
             'FECHA_INICIO': this.fini.toString(),
             'FECHA_FIN': this.ffin.toString()
         }, GenericServicesService.HEADERS).subscribe(
             (response) => {
                 alert(response);
             }
         );
      } else {
          alert('Error en la selección de fechas');
      }
  }

}
