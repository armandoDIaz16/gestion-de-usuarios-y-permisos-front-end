import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-periodos-reportes',
  templateUrl: './periodos_reportes.component.html',
  styleUrls: ['./periodos_reportes.component.scss']
})
export class Periodos_reportesComponent implements OnInit {
    fini = this.fini;
    ffin = this.ffin;
    opcionSeleccionado = this.opcionSeleccionado;
    usuario = sessionStorage.getItem('IdUsuario');
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

    cargarFechas() {
        if (this.fini < this.ffin) {
            this.http.post('http://127.0.0.1:8000/api/PeriodoR', {
                'FK_AREA_ACADEMICA': this.usuario.toString(),
                'ID_PROCESO': this.opcionSeleccionado.toString(),
                'FECHA_INICIO': this.fini.toString(),
                'FECHA_FIN': this.ffin.toString()
            }).subscribe(
                (response) => {
                    console.log(response);
                }
            );
        } else {
            console.log('No mms wey');
        }
    }
}
