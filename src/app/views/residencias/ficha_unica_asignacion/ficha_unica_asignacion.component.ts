import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ficha-unica-asignacion',
  templateUrl: './ficha_unica_asignacion.component.html',
  styleUrls: ['./ficha_unica_asignacion.component.scss']
})
export class FichaUnicaAsignacionComponent implements OnInit {
    usuario = sessionStorage.getItem('IdUsuario');
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fichas() {
      var win = window.open('http://127.0.0.1:8000/api/Pdf/' + this.usuario.toString(), '_blank');
      win.focus();
  }
}
