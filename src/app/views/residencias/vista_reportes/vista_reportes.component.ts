import { Component, OnInit } from '@angular/core';
import {Maestro} from './maestro';
import {Reporte} from './reporte';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista_reportes.component.html',
  styleUrls: ['./vista_reportes.component.scss'],
  providers: [Maestro, Reporte]
})
export class Vista_reportesComponent implements OnInit {
    public maestrosLista = [];
    public reporteLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = {};
  constructor(private reporte: Reporte, private maestro: Maestro, private http: HttpClient) { }

  ngOnInit() {
      this.maestro.getMaestro(this.usuario).subscribe( data => this.maestrosLista = data);
  }

    cargarReportes(opcion) {
        this.reporte.getReporte(opcion).subscribe(data => this.reporteLista = data);
    }
}
