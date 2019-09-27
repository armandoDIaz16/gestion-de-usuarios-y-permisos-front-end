import { Component, OnInit } from '@angular/core';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-generalidades',
  templateUrl: './generalidades.component.html',
  styleUrls: ['./generalidades.component.scss'],
  providers: [ValidarModuloService]
})
export class GeneralidadesComponent implements OnInit {
  public mostrarModulo = false;


  constructor(
    private validarModuloService: ValidarModuloService) {
  }

  ngOnInit() {

    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Generalidades");
    if (!this.mostrarModulo) {
      return;
    }
  }
}