import { Component, OnInit } from '@angular/core';
import {Informe} from './informe';

@Component({
  selector: 'app-informe-tecnico',
  templateUrl: './informe_tecnico.component.html',
  styleUrls: ['./informe_tecnico.component.scss'],
    providers: [Informe]
})
export class Informe_tecnicoComponent implements OnInit {
    informeLista = [];
    id = sessionStorage.getItem('IdUsuario');
  constructor(private info: Informe) {
      this.info.getAnteproyectos(this.id).subscribe(data => this.informeLista = data);
  }

  ngOnInit() {
  }

}
