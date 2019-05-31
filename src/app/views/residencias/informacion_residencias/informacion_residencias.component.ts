import { Component, OnInit } from '@angular/core';
import {Base} from './base';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-informacion-residencias',
  templateUrl: './informacion_residencias.component.html',
  styleUrls: ['./informacion_residencias.component.scss'],
    providers: [Base]
})
export class Informacion_residenciasComponent implements OnInit {

     listaBase = [];
  constructor(private base: Base) {
      this.base.getBase().subscribe(data => this.listaBase = data);
  }

  ngOnInit() {
  }

  generarExcel() {
      let n = new Date();
      let y = n.getFullYear();
      let m = n.getMonth() + 1;
      let d = n.getDate();

      let pagados = [[
          'OBSERVACIONES',
          'FOLIO',
          'NUMEROCONTROL',
          'APELLIDOPATERNO',
          'APELLIDOMATERNO',
          'NOMBRE',
          'CALIFICACION',
          'TITULACION',
          'EMPRESA',
          'PROYECTO',
          'ASESORDOCENTE',
          'ASESOREXTERNO'
      ]];


      for (var i = 0; i < this.listaBase.length; i++) {
          pagados.push([
              this.listaBase[i].OBSERVACIONES,
              this.listaBase[i].FOLIO_ASIGNADO,
              this.listaBase[i].NUMERO_CONTROL,
              this.listaBase[i].PRIMER_APELLIDO,
              this.listaBase[i].SEGUNDO_APELLIDO,
              this.listaBase[i].name,
              this.listaBase[i].CALIFICACION,
              this.listaBase[i].TITULACION,
              this.listaBase[i].EMPRESA,
              this.listaBase[i].NOMBRE,
              this.listaBase[i].NOMBREDOCENTE,
              this.listaBase[i].NOMBREEXTERNO
          ]);
      }

      var wb = XLSX.utils.book_new();
      wb.Props = {
          Title: "Base residencias " + y + "-" + m + "-" + d,
          Subject: "Base residencias",
          Author: "Tecnologico de leon",
          CreatedDate: new Date(2017, 12, 19)
      };

      wb.SheetNames.push("Base residencias " + y + "-" + m + "-" + d);
      var ws_data = pagados;
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Base residencias " + y + "-" + m + "-" + d] = ws;
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
      }
      XLSX.writeFile(wb, "Base residencias " + y + "-" + m + "-" + d + ".xlsx");
  }
}
