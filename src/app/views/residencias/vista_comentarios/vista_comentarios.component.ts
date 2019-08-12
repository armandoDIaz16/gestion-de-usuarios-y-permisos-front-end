import { Component, OnInit } from '@angular/core';
import {Reportes} from './reporte';
import {Comentarios} from './comentario';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-vista-comentarios',
  templateUrl: './vista_comentarios.component.html',
  styleUrls: ['./vista_comentarios.component.scss'],
  providers: [Reportes, Comentarios, ValidarModuloService]
})
export class VistaComentariosComponent extends GenericServicesService implements OnInit {

    public mostrarModulo = false;
    public comentarioLista = [];
    public reporteLista = [];
    ruta = GenericServicesService.ENDPOINT;
    usuario = sessionStorage.getItem('IdUsuario');
    comentario = {};
    comentario2 = {};
    reporte = {};

  constructor(private comentarioService: Comentarios, private reporteService: Reportes, private http: HttpClient,
              private validarModuloService: ValidarModuloService) {
      super(http);
      this.reporteService.getAnteproyectos(this.usuario.toString()).subscribe( data => this.reporteLista = data);
      const aux = this.reporteLista.length;
      for (let i = 0; i < aux; i++) {
          this.comentario[i] = 'opcion' + i;
      }

      /*const aux2 = this.comentarioLista.length;
      for (let i = 0; i < aux2; i++) {
          this.comentario2[i] = 'opcion' + i;
      }*/
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Vista comentarios');
      if (!this.mostrarModulo) {
          return;
      }
  }
    cargarComentario(numero) {
        this.comentarioService.getComentarios(numero).subscribe(data => this.comentarioLista = data);
    }
    enviarComentarios(numero, comentario) {
        this.http.post(GenericServicesService.API_ENDPOINT + 'Comentario', {
            'Numero': numero.toString(),
            'Comentario': comentario.toString(),
            'Usuario': this.usuario.toString()}, GenericServicesService.HEADERS
        ).subscribe((response) => {
            alert(response);
        });
    }
}
