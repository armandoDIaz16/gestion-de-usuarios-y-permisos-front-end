import { Component, OnInit } from '@angular/core';
import {AnteproyectosAprobacion} from './anteproyectosAprobacion';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-banco-aprobacion',
  templateUrl: './banco_aprobacion.component.html',
  styleUrls: ['./banco_aprobacion.component.scss'],
    providers: [AnteproyectosAprobacion]
})
export class BancoAprobacionComponent implements OnInit {

    public anteproyectosLista = [];

  constructor(private anteproyectosService: AnteproyectosAprobacion, private http: HttpClient) { }

  ngOnInit() {
      this.anteproyectosService.getAnteproyectos().subscribe(data => this.anteproyectosLista = data);
  }

  aprobarProyecto(id) {
      this.http.put('http://127.0.0.1:8000/api/Anteproyecto/' + id, {'Estatus': '2'}).subscribe((response) => {
          console.log(response);
      });
  }
  crearProyecto(id) {
      this.http.post('http://127.0.0.1:8000/api/proyecto', {'id': id.toString()}).subscribe((response) => {
          console.log(response);
      });
  }
  rechazarProyecto(id) {
      this.http.put('http://127.0.0.1:8000/api/Anteproyecto/' + id, {'Estatus': '3'}).subscribe((response) => {
          console.log(response);
      });
  }
}
