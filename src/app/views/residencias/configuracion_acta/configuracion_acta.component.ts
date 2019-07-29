import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion_acta.component.html',
  styleUrls: ['./configuracion_acta.component.scss'],
  providers: [ValidarModuloService]
})
export class Configuracion_actaComponent extends GenericServicesService implements OnInit {
    folio = this.folio;
    fecha = this.fecha;
    public mostrarModulo = false;
  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Configuracion acta');
      if (!this.mostrarModulo) {
          return;
      }
  }

  guardarInformacion() {
      this.http.post(GenericServicesService.API_ENDPOINT + 'ConfiguracionE', {
          'FOLIO': this.folio,
          'FECHA': this.fecha
      }, GenericServicesService.HEADERS).subscribe(
         data => alert(data)
      );
  }

  asignarFolios() {
    this.http.get(GenericServicesService.API_ENDPOINT + 'InfoActaR', GenericServicesService.HEADERS).subscribe(data => alert(data));
  }
}
