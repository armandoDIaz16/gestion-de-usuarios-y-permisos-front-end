/* tslint:disable:max-line-length */

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-banco_proyectos',
  templateUrl: './banco_proyectos.component.html',
  providers: [ValidarModuloService]
})
export class BancoProyectosComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) {super(http); }

    public mostrarModulo = false;
   nombre = this.nombre;
   opcionSeleccionado = this.opcionSeleccionado;
   empresa = this.empresa;
   comentario = this.comentario;
   usuario = sessionStorage.getItem('IdUsuario');

   const; header = 'Access-Control-Allow-Origin: *';

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Banco Proyectos');
      if (!this.mostrarModulo) {
          return;
      }
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
          alert(response);
        }
      );
  }
}
