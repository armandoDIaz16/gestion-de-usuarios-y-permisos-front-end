import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion_acta.component.html',
  styleUrls: ['./configuracion_acta.component.scss']
})
export class Configuracion_actaComponent implements OnInit {
    folio = this.folio;
    fecha = this.fecha;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  guardarInformacion() {
      this.http.post('http://localhost:8000/api/ConfiguracionE', {
          'FOLIO': this.folio,
          'FECHA': this.fecha
      }).subscribe(
         data => console.log(data)
      );
  }

  asignarFolios() {
    this.http.get('http://localhost:8000/api/InfoActaR').subscribe(data => console.log(data));
  }
}
