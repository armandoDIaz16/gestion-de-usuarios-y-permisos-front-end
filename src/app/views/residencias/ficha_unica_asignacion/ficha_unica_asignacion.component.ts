import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-ficha-unica-asignacion',
  templateUrl: './ficha_unica_asignacion.component.html',
  styleUrls: ['./ficha_unica_asignacion.component.scss'],
  providers: [ValidarModuloService]
})
export class FichaUnicaAsignacionComponent extends GenericServicesService implements OnInit {
    usuario = sessionStorage.getItem('IdUsuario');
    public mostrarModulo = false;
  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Ficha unica asignacion');
      if (!this.mostrarModulo) {
          return;
      }
  }

  fichas() {
      console.log(this.usuario);
      const url = [GenericServicesService.API_ENDPOINT + 'Pdf/' + this.usuario, GenericServicesService.HEADERS];
      // @ts-ignore
      const win = window.open(url, '_blank');
      win.focus();
  }
}
