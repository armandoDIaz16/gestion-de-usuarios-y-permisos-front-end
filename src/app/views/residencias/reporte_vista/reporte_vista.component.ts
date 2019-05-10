import { Component, OnInit } from '@angular/core';
import {Maestro} from './maestro';
import {Reportes} from './reporte';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reporte-vista',
  templateUrl: './reporte_vista.component.html',
  styleUrls: ['./reporte_vista.component.scss'],
  providers: [Maestro, Reportes]
})
export class ReporteVistaComponent implements OnInit {
    public maestrosLista = [];
    public reporteLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = {};
    constructor(private reporteService: Reportes, private maestro: Maestro, private http: HttpClient) {

    }

  ngOnInit() {
      this.maestro.getMaestro(this.usuario).subscribe( data => this.maestrosLista = data);
  }
    cargarReportes(opcion) {
        this.reporteService.getAnteproyectos(opcion).subscribe(data => this.reporteLista = data);
    }
}
