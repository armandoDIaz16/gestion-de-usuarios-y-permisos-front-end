import { Component, OnInit } from '@angular/core';
import {AnteproyectosAprobacion} from './anteproyectosAprobacion';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-banco-aprobacion',
  templateUrl: './banco_aprobacion.component.html',
  styleUrls: ['./banco_aprobacion.component.scss'],
    providers: [AnteproyectosAprobacion]
})
export class BancoAprobacionComponent extends GenericServicesService implements OnInit {

    public anteproyectosLista = [];
    usuario = sessionStorage.getItem('IdUsuario');

  constructor(private anteproyectosService: AnteproyectosAprobacion, private http: HttpClient) { super(http); }

  ngOnInit() {
      this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
  }

  aprobarProyecto(id) {
      this.http.put(GenericServicesService.API_ENDPOINT + 'Anteproyecto/' + id, {'Estatus': '2'},
          GenericServicesService.HEADERS).subscribe((response) => {
          console.log(response);
      });
  }
  crearProyecto(id) {
      this.http.post(GenericServicesService.API_ENDPOINT + 'proyecto', {'id': id.toString()}
      , GenericServicesService.HEADERS).subscribe((response) => {
          console.log(response);
      });
  }
  rechazarProyecto(id) {
      this.http.put( GenericServicesService.API_ENDPOINT + 'Anteproyecto/' + id, {'Estatus': '3'}
      , GenericServicesService.HEADERS).subscribe((response) => {
          console.log(response);
      });
  }
}
