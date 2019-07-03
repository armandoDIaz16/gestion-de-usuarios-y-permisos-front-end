import { Component, OnInit } from '@angular/core';
import {Proyecto} from './proyectoMaestro';
import {Maestro} from './maestroMaestro';
import {Externo} from './externoMaestro';
import {Alumno} from './alumno';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss'],
    providers: [Proyecto , Maestro, Externo, Alumno, ValidarModuloService]
})
export class MaestrosComponent extends GenericServicesService implements OnInit {

    public mostrarModulo = false;
    public anteproyectosLista = [];
    public maestrosLista = [];
    public externoLista = [];
    public alumnoLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    alumnos = this.alumnos;
    opcion = {};
    opcion2 = {};
    // opcion = { 'hola' : String , 'hola2' : String , 'hola3' : String };
  constructor(private proyecto: Proyecto , private maestro: Maestro , private externo: Externo,
              private http: HttpClient, private alumno: Alumno,
              private validarModuloService: ValidarModuloService) {
      super(http);
      this.proyecto.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
      const aux = this.anteproyectosLista.length;
      for (let i = 0; i < aux; i++) {
          this.opcion[i] = 'opcion' + i;
          this.opcion2[i] = 'opcion' + i;
      }
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Maestros');
      if (!this.mostrarModulo) {
          return;
      }
      this.maestro.getMaestro(this.usuario).subscribe( data => this.maestrosLista = data);
      this.externo.getExterno().subscribe(data => this.externoLista = data);
  }

  asignarMaestro(id, as, ex) {
      this.http.put(GenericServicesService.API_ENDPOINT + 'proyecto/' + id  , {
          'Maestro': as,
          'Externo': ex
      }, GenericServicesService.HEADERS).subscribe(
          (response) => {
              console.log(response);
          }
      );
  }

  buscarAlumno() {
      this.alumno.getAlumno(this.alumnos).subscribe(data => this.alumnoLista = data);
  }
}
