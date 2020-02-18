import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: '../../views/capacitacion_docente/bienvenido.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class BienvenidoComponent implements OnInit {
public  usuario: object; // = sessionStorage.getItem('permisos');

  constructor() {
      this.usuario = JSON.parse( sessionStorage.getItem('permisos'));
      console.log(this.usuario);
      console.log(this.usuario['nombre_usuario']);
  }

  ngOnInit() {
  }

}
