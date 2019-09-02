import { Component, OnInit } from '@angular/core';
import {Documentacion} from './documentacion';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vista-documentacion',
  templateUrl: './vista_documentacion.component.html',
  styleUrls: ['./vista_documentacion.component.scss'],
    providers: [Documentacion, ValidarModuloService]
})
export class Vista_documentacionComponent extends GenericServicesService implements OnInit {

  ruta = GenericServicesService.ENDPOINT;
  public documentacionLista = [];
  public mostrarModulo = false;
  constructor(private documento: Documentacion, private validarModuloService: ValidarModuloService, private http: HttpClient) {
      super(http);
  }

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
