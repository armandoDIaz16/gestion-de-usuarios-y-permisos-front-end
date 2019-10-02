import { Component, OnInit } from '@angular/core';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [ValidarModuloService]
})
export class PerfilComponent implements OnInit {
  public mostrarModulo = false;


  constructor(
    private validarModuloService: ValidarModuloService) {
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Perfil de asesor");
    if (!this.mostrarModulo) {
      return;
    }
  }
}