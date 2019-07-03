import { Component, OnInit } from '@angular/core';
import {Documentacion} from './documentacion';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-vista-documentacion',
  templateUrl: './vista_documentacion.component.html',
  styleUrls: ['./vista_documentacion.component.scss'],
    providers: [Documentacion, ValidarModuloService]
})
export class Vista_documentacionComponent implements OnInit {

  public documentacionLista = [];
  public mostrarModulo = false;
  constructor(private documento: Documentacion, private validarModuloService: ValidarModuloService) { }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Vista documentacion');
      if (!this.mostrarModulo) {
          return;
      }
  }

    selectDocumentacion(id) {
      this.documento.getDocumentos(id).subscribe(data => this.documentacionLista = data);
    }
}
