/* tslint:disable:max-line-length */

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-banco_proyectos',
  templateUrl: './banco_proyectos.component.html'
 // styleUrls: ['./banco_proyectos.component.css']
})
export class BancoProyectosComponent implements OnInit {

  constructor(private http: HttpClient) {}

   nombre = this.nombre;
   opcionSeleccionado = this.opcionSeleccionado;
   empresa = this.empresa;
   opcionSeleccionadoEsp = this.opcionSeleccionadoEsp;

   const; header = 'Access-Control-Allow-Origin: *';

  ngOnInit() {
  }

  onSubmit() {
      this.http.post('http://127.0.0.1:8000/api/Anteproyecto',{
        "Nombre": this.nombre.toString(),
        "AreaAcademica": this.opcionSeleccionado.toString(),
        "Empresa": this.empresa.toString(),
        "TipoEspecialidad": this.opcionSeleccionadoEsp.toString()
      }).subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
}
