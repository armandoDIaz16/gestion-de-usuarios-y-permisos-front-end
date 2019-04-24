import { Component, OnInit } from '@angular/core';
import {AnteproyectosSeleccion} from './anteproyectosSeleccion';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-banco-seleccion',
  templateUrl: './banco_seleccion.component.html',
  styleUrls: ['./banco_seleccion.component.scss'],
  providers: [AnteproyectosSeleccion]
})
export class Banco_seleccionComponent implements OnInit {

  public anteproyectosLista = [];
  ID_ANTEPROYECTO = this.ID_ANTEPROYECTO;
  usuario = sessionStorage.getItem('IdUsuario');

  constructor(private anteproyectosService: AnteproyectosSeleccion, private http: HttpClient) {}

  ngOnInit() {
    this.anteproyectosService.getAnteproyectos().subscribe(data => this.anteproyectosLista = data);
  }

  uploadFile(id) {
    console.log(id);
    console.log(this.usuario);
    this.http.put('http://127.0.0.1:8000/api/Anteproyecto/' + id, {'Alumno': this.usuario.toString()}).subscribe((response) => {
      console.log(response);
    });
  }

}
