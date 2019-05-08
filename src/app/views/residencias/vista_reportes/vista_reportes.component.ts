import { Component, OnInit } from '@angular/core';
import {Maestro} from './maestro';
import {Reporte} from './reporte';
import {Externo} from './externo';
import {ReporteE} from './reporteexterno';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista_reportes.component.html',
  styleUrls: ['./vista_reportes.component.scss'],
  providers: [Maestro, Reporte, Externo, ReporteE]
})
export class Vista_reportesComponent implements OnInit {
    public maestrosLista = [];
    public reporteLista = [];
    public externoLista = [];
    public repextLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = {};
    opcion2 = {};
  constructor(private reporte: Reporte, private maestro: Maestro, private externo: Externo, private repext: ReporteE) { }

  ngOnInit() {
      this.maestro.getMaestro(this.usuario).subscribe( data => this.maestrosLista = data);
      this.externo.getExterno(this.usuario).subscribe(data => this.externoLista = data);
  }

    cargarReportes(opcion) {
        this.reporte.getReporte(opcion).subscribe(data => this.reporteLista = data);
    }

    cargarReportes2(opcion) {
        this.repext.getReporteE(opcion).subscribe(data => this.repextLista = data);
    }
}
