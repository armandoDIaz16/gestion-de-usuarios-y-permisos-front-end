import { Component, OnInit } from '@angular/core';
import {Documentacion} from './documentacion';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-vista-de-documentacion',
  templateUrl: './vista_de_documentacion.component.html',
  styleUrls: ['./vista_de_documentacion.component.scss'],
  providers: [Documentacion, ValidarModuloService]
})
export class Vista_de_documentacionComponent implements OnInit {

  public documentacionLista = [];
  public mostrarModulo = false;
  usuario = sessionStorage.getItem('IdUsuario');
  constructor(private documento: Documentacion, private validarModuloService: ValidarModuloService) {
      this.documento.getDocumentos(this.usuario).subscribe(data => this.documentacionLista = data);
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Vista de documentacion');
      if (!this.mostrarModulo) {
          return;
      }
  }

}
