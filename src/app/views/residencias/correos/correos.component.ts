import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss']
})
export class CorreosComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient) { super(http); }

  dia = this.dia;
  hora = this.hora;
  lugar = this.lugar;
  persona = this.persona;

  ngOnInit() {
  }

  onSubmit() {
    this.http.post(GenericServicesService.API_ENDPOINT + 'CreditosSiia', {
      'Dia': this.dia.toString(),
      'Hora': this.hora.toString(),
      'Lugar': this.lugar.toString(),
      'Persona': this.persona.toString()
    }, GenericServicesService.HEADERS).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
