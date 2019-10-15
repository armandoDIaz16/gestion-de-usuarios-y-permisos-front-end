import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { AspiranteService } from '../../../services/aspirante.service';
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';



@Component({
  selector: 'app-plantilla_siia',
  templateUrl: './plantilla_siia.component.html',
  styleUrls: ['./plantilla_siia.component.scss'],
  providers: [PeriodoService, AspiranteService, ValidarModuloService]
})
export class PlantillaSIIAComponent implements OnInit {

  constructor(private periodoService: PeriodoService,
    private aspiranteService: AspiranteService,
    private validarModuloService: ValidarModuloService) {
  }

  public mostrarModulo = false;
  public aspirantes = [];

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Plantilla SIIA");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.obtenerAspirantes(data[0].PK_PERIODO_PREFICHAS);
      }
    });
  }

  obtenerAspirantes(pk_periodo) {
    this.aspiranteService.getAspirantes3(pk_periodo).subscribe(data => this.aspirantes = data);
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var pagados = [[
      'MATRICULA',
      'PRIMER_APELLIDO',
      'SEGUNDO_APELLIDO',
      'NOMBRES',
      'CLAVE_INSTITUCION',
      'CLAVE_SEDE',
      'FECHA_NACIMIENTO',
      'CLAVE_DE_CARRERA',
      'CORREO_ELECTRONICO'
    ]];


    for (var i = 0; i < this.aspirantes.length; i++) {
      pagados.push([
        this.aspirantes[i].PREFICHA,
        this.aspirantes[i].PRIMER_APELLIDO,
        this.aspirantes[i].SEGUNDO_APELLIDO,
        this.aspirantes[i].NOMBRE,
        this.aspirantes[i].CLAVE_INSTITUCION,
        this.aspirantes[i].CLAVE_SEDE,
        this.aspirantes[i].FECHA_NACIMIENTO,
        this.aspirantes[i].CLAVE_CARRERA,
        this.aspirantes[i].CORREO
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Prefichas pagadas " + y + "-" + m + "-" + d,
      Subject: "Prefichas pagadas",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Prefichas pagadas " + y + "-" + m + "-" + d);
    var ws_data = pagados;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Prefichas pagadas " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    XLSX.writeFile(wb, "Prefichas pagadas " + y + "-" + m + "-" + d + ".xlsx");
  }

}
