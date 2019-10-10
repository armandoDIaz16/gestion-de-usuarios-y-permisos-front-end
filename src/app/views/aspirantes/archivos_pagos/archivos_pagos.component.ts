import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { AspiranteService } from '../../../services/aspirante.service';
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';



@Component({
  selector: 'app-archivos_pagos',
  templateUrl: './archivos_pagos.component.html',
  styleUrls: ['./archivos_pagos.component.scss'],
  providers: [PeriodoService, AspiranteService, ValidarModuloService]
})
export class ArchivosPagosComponent implements OnInit {
  constructor(private periodoService: PeriodoService,
    private aspiranteService: AspiranteService,
    private validarModuloService: ValidarModuloService) {
  }

  @ViewChild('loaderModal') loaderModal;
  public sistema = "Aspirantes";
  public mostrarModulo = false;
  public fechaFin = null;
  public fechaInicio = null;
  public periodo = null;
  public aspirantes = [];

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Archivos de pagos");
    if (!this.mostrarModulo) {
      return;
    }
    var fecha = new Date(); //Fecha actual
    var mes = (fecha.getMonth() + 1).toString();; //obteniendo mes
    var dia = fecha.getDate().toString();; //obteniendo dia
    var año = fecha.getFullYear();
    if (parseInt(dia) < 10) {
      dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (parseInt(mes) < 10) {
      mes = '0' + mes //agrega cero si el menor de 10
    }
    this.fechaFin = "" + año + "-" + mes + "-" + dia + "";
    this.fechaInicio = "" + año + "-" + mes + "-" + dia + "";
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
      }
    });
  }

  enviarPagos(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addPagos({ "Sistema": this.sistema, "Nombre": archivo.name.split('.').shift(), "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }

  async leerDatosParaExcel() {
    this.loaderModal.show();
    this.aspiranteService.getAspirantes2(this.periodo, this.fechaInicio, this.fechaFin).subscribe(data => {
      this.aspirantes = data;
      if (data) {
        this.generarExcel();
      }
      this.loaderModal.hide();
    });
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var pagos = [[
      'REFERENCIA_BANCO',
      'IDCONTROL',
      'NOMBRE',
      'CORREO1',
      'MONTO',
      'FECHA_PAGO',
      'TIPO_PAGO',
      'FECHA_REGISTRO',
      'CLAVE',
      'CONCEPTO',
      'CANTIDAD',
      'CLAVE_CONTPAQ',
      'FOLIO',
      'OBSERVACIONES'
    ]];

    for (var i = 0; i < this.aspirantes.length; i++) {
      var fechaTexto = this.aspirantes[i].FECHA_REGISTRO.split('-');
      pagos.push([
        this.aspirantes[i].REFERENCIA_BANCO,
        this.aspirantes[i].PREFICHA,
        this.aspirantes[i].NOMBRE + " " + this.aspirantes[i].PRIMER_APELLIDO + " " + this.aspirantes[i].SEGUNDO_APELLIDO,
        this.aspirantes[i].CORREO,
        1600,
        this.aspirantes[i].FECHA_PAGO,
        this.aspirantes[i].TIPO_PAGO,
        fechaTexto[0] + "/" + (fechaTexto[1]) + "/" + fechaTexto[2].substr(0, 2),
        "R004",
        "Ficha para examen de admisión",
        1,
        "A008",
        "",
        ""
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "Pagos",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = pagos;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    var nombreArchivo = "";
    if (this.fechaInicio == this.fechaFin) {
      nombreArchivo = "Ref " + this.fechaInicio + ".xlsx";
    } else {
      nombreArchivo = "Ref " + this.fechaInicio + " - " + this.fechaFin + ".xlsx";
    }
    XLSX.writeFile(wb, nombreArchivo);
  }
}