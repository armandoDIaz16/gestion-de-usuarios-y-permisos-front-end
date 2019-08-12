import { Component, OnInit } from '@angular/core';
import {Informe} from './informe';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-informe-tecnico',
  templateUrl: './informe_tecnico.component.html',
  styleUrls: ['./informe_tecnico.component.scss'],
    providers: [Informe, ValidarModuloService]
})
export class Informe_tecnicoComponent extends GenericServicesService implements OnInit {
    informeLista = [];
    id = sessionStorage.getItem('IdUsuario');
    public mostrarModulo = false;
    ruta = GenericServicesService.ENDPOINT;
  constructor(private info: Informe, private validarModuloService: ValidarModuloService, private http: HttpClient) {
      super(http);
      this.info.getAnteproyectos(this.id).subscribe(data => this.informeLista = data);
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Informe tecnico');
      if (!this.mostrarModulo) {
          return;
      }
  }

}
