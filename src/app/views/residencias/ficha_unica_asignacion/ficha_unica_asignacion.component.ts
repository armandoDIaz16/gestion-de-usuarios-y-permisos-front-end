import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-ficha-unica-asignacion',
  templateUrl: './ficha_unica_asignacion.component.html',
  styleUrls: ['./ficha_unica_asignacion.component.scss']
})
export class FichaUnicaAsignacionComponent extends GenericServicesService implements OnInit {
    usuario = sessionStorage.getItem('IdUsuario');
  constructor(private http: HttpClient) { super(http); }

  ngOnInit() {
  }

  fichas() {
      var win = window.open(GenericServicesService.API_ENDPOINT + 'Pdf/' + this.usuario.toString(), '_blank');
      win.focus();
  }
}
