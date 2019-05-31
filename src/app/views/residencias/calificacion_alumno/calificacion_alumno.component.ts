import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Alumnos} from './alumnos';

@Component({
  selector: 'app-calificacion-alumno',
  templateUrl: './calificacion_alumno.component.html',
  styleUrls: ['./calificacion_alumno.component.scss'],
    providers: [Alumnos]
})
export class Calificacion_alumnoComponent implements OnInit {
    opcion = this.opcion;
    opcion2 = this.opcion2;
    observaciones = this.observaciones;
    alumnosLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    cal = this.cal;
  constructor(private http: HttpClient, private alumnosService: Alumnos) {
      this.alumnosService.getAnteproyectos(this.usuario).subscribe( data => this.alumnosLista = data);
  }

  ngOnInit() {
  }

    guardarCalificacion() {
        this.http.post('http://127.0.0.1:8000/api/CalificacionR', {
            'CALIFICACION': this.cal,
            'FK_ALUMNO': this.opcion,
            'FK_DOCENTE': this.usuario,
            'TITULACION': this.opcion2,
            'OBSERVACIONES': this.observaciones
        }).subscribe(
            (response) => {
                console.log(response);
            });
    }

    generarActa() {
        var win = window.open('http://127.0.0.1:8000/api/ActaResidencias/' + this.opcion, '_blank');
        win.focus();
    }
}
