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
   area = this.area;
   empresa = this.empresa;
  especialidad = this.especialidad;

   const; header = 'Access-Control-Allow-Origin: *';

  ngOnInit() {
  }

  onSubmit(){
      this.http.post('http://127.0.0.1/api/Documentacion',{
        "Nombre": this.nombre.toString(),
        "AreaAcademica": this.area.toString(),
        "Empresa": this.empresa.toString(),
        "TipoEspecialidad": this.especialidad.toString()
      }).subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
}
