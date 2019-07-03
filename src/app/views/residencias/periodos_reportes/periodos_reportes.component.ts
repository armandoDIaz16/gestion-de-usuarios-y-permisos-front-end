import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-periodos-reportes',
  templateUrl: './periodos_reportes.component.html',
  styleUrls: ['./periodos_reportes.component.scss'],
  providers: [ValidarModuloService]
})
export class Periodos_reportesComponent extends GenericServicesService implements OnInit {

    public mostrarModulo = false;
    fini = this.fini;
    ffin = this.ffin;
    opcionSeleccionado = this.opcionSeleccionado;
    usuario = sessionStorage.getItem('IdUsuario');
  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Periodos reportes');
      if (!this.mostrarModulo) {
          return;
      }
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
