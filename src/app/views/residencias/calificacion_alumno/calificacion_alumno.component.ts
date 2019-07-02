import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Alumnos} from './alumnos';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-calificacion-alumno',
  templateUrl: './calificacion_alumno.component.html',
  styleUrls: ['./calificacion_alumno.component.scss'],
    providers: [Alumnos, ValidarModuloService]
})
export class Calificacion_alumnoComponent extends GenericServicesService implements OnInit {
    opcion = this.opcion;
    opcion2 = this.opcion2;
    observaciones = this.observaciones;
    alumnosLista = [];
    public mostrarModulo = false;
    usuario = sessionStorage.getItem('IdUsuario');
    cal = this.cal;
  constructor(private http: HttpClient, private alumnosService: Alumnos, private validarModuloService: ValidarModuloService) {
      super(http);
      this.alumnosService.getAnteproyectos(this.usuario).subscribe( data => this.alumnosLista = data);
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Calificacion alumno');
      if (!this.mostrarModulo) {
          return;
      }
  }

    guardarCalificacion() {
        this.http.post(GenericServicesService.API_ENDPOINT + 'CalificacionR', {
            'CALIFICACION': this.cal,
            'FK_ALUMNO': this.opcion,
            'FK_DOCENTE': this.usuario,
            'TITULACION': this.opcion2,
            'OBSERVACIONES': this.observaciones
        }, GenericServicesService.HEADERS).subscribe(
            (response) => {
                console.log(response);
            });
    }

    generarActa() {
        var win = window.open(GenericServicesService.API_ENDPOINT + 'ActaResidencias/' + this.opcion, '_blank');
        win.focus();
    }
}
