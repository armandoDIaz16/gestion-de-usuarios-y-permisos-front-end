import { Component, OnInit } from '@angular/core';
import {Informe} from './informe';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-informe-tecnico',
  templateUrl: './informe_tecnico.component.html',
  styleUrls: ['./informe_tecnico.component.scss'],
    providers: [Informe, ValidarModuloService]
})
export class Informe_tecnicoComponent implements OnInit {
    informeLista = [];
    id = sessionStorage.getItem('IdUsuario');
    public mostrarModulo = false;
  constructor(private info: Informe, private validarModuloService: ValidarModuloService) {
      this.info.getAnteproyectos(this.id).subscribe(data => this.informeLista = data);
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Informe tecnico');
      if (!this.mostrarModulo) {
          return;
      }
  }

}
