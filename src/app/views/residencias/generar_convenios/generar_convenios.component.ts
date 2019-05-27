import { Component, OnInit } from '@angular/core';
import {Empresas} from './empresa';

@Component({
  selector: 'app-generar-convenios',
  templateUrl: './generar_convenios.component.html',
  styleUrls: ['./generar_convenios.component.scss'],
    providers: [Empresas]
})
export class Generar_conveniosComponent implements OnInit {
   public empresasLista = [];
   opcion = this.opcion;
  constructor(public empresa: Empresas) { }

  ngOnInit() {
      this.empresa.getAnteproyectos().subscribe(data => this.empresasLista = data);
  }

  generarConvenio(id) {
      var win = window.open('http://127.0.0.1:8000/api/ConvenioContrato/' + id, '_blank');
      win.focus();
  }
}
