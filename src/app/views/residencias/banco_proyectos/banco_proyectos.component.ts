/* tslint:disable:max-line-length */

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-banco_proyectos',
  templateUrl: './banco_proyectos.component.html'
 // styleUrls: ['./banco_proyectos.component.css']
})
export class BancoProyectosComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient) {super(http); }

   nombre = this.nombre;
   opcionSeleccionado = this.opcionSeleccionado;
   empresa = this.empresa;
   comentario = this.comentario;
   usuario = sessionStorage.getItem('IdUsuario');

   const; header = 'Access-Control-Allow-Origin: *';

  ngOnInit() {
  }

  onSubmit() {
      this.http.post(GenericServicesService.API_ENDPOINT + 'Anteproyecto', {
        'Nombre': this.nombre.toString(),
        'AreaAcademica': this.opcionSeleccionado.toString(),
        'Empresa': this.empresa.toString(),
        'Comentario': this.comentario,
         'Autor': this.usuario.toString()
      }, GenericServicesService.HEADERS).subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
}
