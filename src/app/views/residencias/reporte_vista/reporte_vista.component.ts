import { Component, OnInit } from '@angular/core';
import {Reportes} from './reporte';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reporte-vista',
  templateUrl: './reporte_vista.component.html',
  styleUrls: ['./reporte_vista.component.scss'],
  providers: [Reportes]
})
export class ReporteVistaComponent implements OnInit {

    public reporteLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    comentario = {};
    constructor(private reporteService: Reportes, private http: HttpClient) {
        this.reporteService.getAnteproyectos(this.usuario.toString()).subscribe( data => this.reporteLista = data);
        const aux = this.reporteLista.length;
        for (let i = 0; i < aux; i++) {
            this.comentario[i] = 'opcion' + i;
        }
    }

  ngOnInit() {

  }

  uploadComentario(numero, comentario) {
        this.http.post('http://127.0.0.1:8000/api/Comentario', {
            'Numero': numero.toString(),
            'Comentario': comentario.toString(),
            'Usuario': this.usuario.toString()}
        ).subscribe((response) => {
            console.log(response);
        });
  }
}
