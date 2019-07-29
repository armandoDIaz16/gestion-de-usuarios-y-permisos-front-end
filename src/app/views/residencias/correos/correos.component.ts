import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss'],
  providers: [ValidarModuloService]
})
export class CorreosComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  dia = this.dia;
  hora = this.hora;
  lugar = this.lugar;
  persona = this.persona;
  public mostrarModulo = false;

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Correos');
      if (!this.mostrarModulo) {
          return;
      }
  }

  onSubmit() {
    this.http.post(GenericServicesService.API_ENDPOINT + 'CreditosSiia', {
      'Dia': this.dia.toString(),
      'Hora': this.hora.toString(),
      'Lugar': this.lugar.toString(),
      'Persona': this.persona.toString()
    }, GenericServicesService.HEADERS).subscribe(
      (response) => {
        alert(response);
      }
    );
  }
}
