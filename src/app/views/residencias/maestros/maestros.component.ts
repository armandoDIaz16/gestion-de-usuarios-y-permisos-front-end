import { Component, OnInit } from '@angular/core';
import {Proyecto} from './proyectoMaestro';
import {Maestro} from './maestroMaestro';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss'],
    providers: [Proyecto , Maestro]
})
export class MaestrosComponent implements OnInit {
    public anteproyectosLista = [];
    public maestrosLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = {};
    // opcion = { 'hola' : String , 'hola2' : String , 'hola3' : String };
  constructor(private proyecto: Proyecto , private maestro: Maestro , private http: HttpClient) {
      this.proyecto.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
      const aux = this.anteproyectosLista.length;
      for (let i = 0; i < aux; i++) {
          this.opcion[i] = 'opcion' + i;
      }
  }

  ngOnInit() {
      this.maestro.getMaestro(this.usuario).subscribe( data => this.maestrosLista = data);
  }

  asignarMaestro(id, as) {
      this.http.put('http://127.0.0.1:8000/api/proyecto/' + id  , {
          'Maestro': as.toString()
      }).subscribe(
          (response) => {
              console.log(response);
          }
      );
  }
}
