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
    alumnosLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    cal = this.cal;
  constructor(private http: HttpClient, private alumnosService: Alumnos) {
      this.alumnosService.getAnteproyectos(this.usuario).subscribe( data => this.alumnosLista = data);
  }

  ngOnInit() {
  }

    guardarCalificacion() {
        this.http.post('http://127.0.0.1:8000/api/Informe', {
            'CALIFICACION': this.cal.toString(),
            'FK_ALUMNO': this.opcion.toString(),
            'FK_DOCENTE': this.usuario.toString()
        }).subscribe(
            (response) => {
                console.log(response);
            });
    }
}
