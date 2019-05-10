import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.scss']
})
export class PeriodosComponent implements OnInit {
    fini = this.fini;
    ffin = this.ffin;
    opcionSeleccionado = this.opcionSeleccionado;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  cargarFechas() {
      if (this.fini < this.ffin) {
         this.http.post('http://127.0.0.1:8000/api/PeriodoR', {
             'FK_AREA_ACADEMICA': 5,
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
