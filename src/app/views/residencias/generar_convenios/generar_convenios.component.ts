import { Component, OnInit } from '@angular/core';
import {Empresas} from './empresa';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-generar-convenios',
  templateUrl: './generar_convenios.component.html',
  styleUrls: ['./generar_convenios.component.scss'],
    providers: [Empresas]
})
export class Generar_conveniosComponent extends GenericServicesService implements OnInit {
   public empresasLista = [];
   opcion = this.opcion;
  constructor(private http: HttpClient, public empresa: Empresas) { super(http); }

  ngOnInit() {
      this.empresa.getAnteproyectos().subscribe(data => this.empresasLista = data);
  }

  generarConvenio(id) {
      var win = window.open(GenericServicesService.API_ENDPOINT + 'ConvenioContrato/' + id, '_blank');
      win.focus();
  }
}
