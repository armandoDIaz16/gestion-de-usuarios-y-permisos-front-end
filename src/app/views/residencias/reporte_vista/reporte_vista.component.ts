import { Component, OnInit } from '@angular/core';
import {Maestro} from './maestro';
import {Reportes} from './reporte';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reporte-vista',
  templateUrl: './reporte_vista.component.html',
  styleUrls: ['./reporte_vista.component.scss'],
  providers: [Maestro, Reportes, ValidarModuloService]
})
export class ReporteVistaComponent extends GenericServicesService implements OnInit {

    public mostrarModulo = false;
    public maestrosLista = [];
    public reporteLista = [];
    ruta = GenericServicesService.ENDPOINT;
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = {};
    constructor(private reporteService: Reportes, private maestro: Maestro,
                private validarModuloService: ValidarModuloService, private http: HttpClient,) {
        super(http);
    }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Reporte vista');
      if (!this.mostrarModulo) {
          return;
      }
      this.maestro.getMaestro(this.usuario).subscribe( data => this.maestrosLista = data);
  }
    cargarReportes(opcion) {
        this.reporteService.getAnteproyectos(opcion).subscribe(data => this.reporteLista = data);
    }
}
