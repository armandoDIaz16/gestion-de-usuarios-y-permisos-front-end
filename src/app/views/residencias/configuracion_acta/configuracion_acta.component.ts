import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion_acta.component.html',
  styleUrls: ['./configuracion_acta.component.scss']
})
export class Configuracion_actaComponent extends GenericServicesService implements OnInit {
    folio = this.folio;
    fecha = this.fecha;
  constructor(private http: HttpClient) { super(http); }

  ngOnInit() {
  }

  guardarInformacion() {
      this.http.post(GenericServicesService.API_ENDPOINT + 'ConfiguracionE', {
          'FOLIO': this.folio,
          'FECHA': this.fecha
      }, GenericServicesService.HEADERS).subscribe(
         data => console.log(data)
      );
  }

  asignarFolios() {
    this.http.get(GenericServicesService.API_ENDPOINT + 'InfoActaR', GenericServicesService.HEADERS).subscribe(data => console.log(data));
  }
}
