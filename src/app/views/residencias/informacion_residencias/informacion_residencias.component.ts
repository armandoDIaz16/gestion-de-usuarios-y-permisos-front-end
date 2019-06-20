import { Component, OnInit } from '@angular/core';
import {Base} from './base';
import {InfoSiia} from './info_siia';
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-informacion-residencias',
  templateUrl: './informacion_residencias.component.html',
  styleUrls: ['./informacion_residencias.component.scss'],
    providers: [Base, InfoSiia, ValidarModuloService]
})
export class Informacion_residenciasComponent implements OnInit {

     listaBase = [];
     listaInfo = [];
    public mostrarModulo = false;
  constructor(private base: Base, private info: InfoSiia, private validarModuloService: ValidarModuloService) {
      this.base.getBase().subscribe(data => this.listaBase = data);
      this.info.getInfoSiia().subscribe(data => this.listaInfo = data);
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Informacion residencias');
      if (!this.mostrarModulo) {
          return;
      }
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
              this.listaBase[i].NOMBREDOCENTE + ' ' + this.listaBase[i].PRIMERADOCENTE + ' ' + this.listaBase[i].SEGUNDOADOCENTE,
              this.listaBase[i].NOMBREEXTERNO + ' ' + this.listaBase[i].PRIMERAEXTERNO + ' ' + this.listaBase[i].SEGUNDOAEXTERNO
          ]);
      }

      var wb = XLSX.utils.book_new();
      wb.Props = {
          Title: 'Base residencias ' + y + '-' + m + '-' + d,
          Subject: 'Base residencias',
          Author: 'Tecnologico de leon',
          CreatedDate: new Date(2017, 12, 19)
      };

      wb.SheetNames.push('Base residencias ' + y + '-' + m + '-' + d);
      var ws_data = pagados;
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets['Base residencias ' + y + '-' + m + '-' + d] = ws;
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
      }
      XLSX.writeFile(wb, 'Base residencias ' + y + '-' + m + '-' + d + '.xlsx');
  }

  generar() {
      var ws = XLSX.utils.aoa_to_sheet([
          [''],
          [''],
          [''],
          ['']
      ]);

      /* this array controls the column order in the generated sheet */
      let pagados = [];

      pagados = [['Numero Control', 'Clave de Materia', 'Clave Periodo Escolar',
          'Semestre', 'Fecha Evaluacion', 'Calificacion', 'Nivel de Curso', 'Tipo Aprobacion',
          'Folio', 'Observaciones', 'Resultado']];


      for (var i = 0; i < this.listaBase.length; i++) {
          pagados.push([
              this.listaInfo[i].NUMERO_CONTROL,
              'R1',
              this.listaInfo[i].PERIODO,
              this.listaInfo[i].SEMESTRE,
              this.listaInfo[i].FECHA,
              this.listaInfo[i].CALIFICACION,
              'CO',
              'COPO',
              this.listaInfo[i].FOLIO_ASIGNADO
          ]);
      }

      /* add row objects to sheet starting from cell A6 */
      XLSX.utils.sheet_add_json(ws, pagados, {origin: 'B5'});

      /* generate workbook and add worksheet */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Base residencias');
      XLSX.writeFile(wb, 'SIIA_REGISTRO_MASIVO' + '.xlsx');
  }
}
