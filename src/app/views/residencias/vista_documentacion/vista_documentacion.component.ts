import { Component, OnInit } from '@angular/core';
import {Documentacion} from './documentacion';

@Component({
  selector: 'app-vista-documentacion',
  templateUrl: './vista_documentacion.component.html',
  styleUrls: ['./vista_documentacion.component.scss'],
    providers: [Documentacion]
})
export class Vista_documentacionComponent implements OnInit {

  public documentacionLista = [];
  constructor(private documento: Documentacion) { }

  ngOnInit() {
  }

    selectDocumentacion(id) {
      this.documento.getDocumentos(id).subscribe(data => this.documentacionLista = data);
    }
}
