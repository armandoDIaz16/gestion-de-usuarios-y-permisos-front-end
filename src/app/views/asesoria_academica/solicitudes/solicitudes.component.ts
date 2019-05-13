import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  activado = true;
  visasesor = false;
  visalumno = false;
  public estatus = [];
  public carreras = [];
  public asesor1 = [];
  public asesor2 = [];
  public solicitud = [];
  public solicitud1 = [];
  filtroPK_ASESOR_ASESORIA_HORARIO = null;
  filtroname = null;
  filtroPRIMER_APELLIDO = null;
  filtroSEGUNDO_APELLIDO = null;
  filtroCORREO = null;
  filtroTELEFONO_CASA = null;
  filtroTELEFONO_MOVIL = null;
  filtroMATERIA1 = "todas";
  filtroMATERIA2 = "todas";
  filtroMATERIA3 = "todos";
  filtroDIA = "todos";
  filtroHORA = "todos";
  filtroCAMPUS = "todos";
  filtroSTATUS = "todos";
  filtroPERIODO = "todos";

  periodo = '20191';
  relleno = null;
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;
  registrosPagina = 2;
  pageActual: number = 1;
  public error = [];
  public data = [];

  constructor(private Jarwis: JarwisService) {
  }

  ngOnInit() {
    this.Jarwis.obtenerAsesor().subscribe(
      data => {
        for (var num in data) {
          this.asesor1.push(data[num]);
          this.asesor2.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.obtenerSolicitud().subscribe(
      data => {
        for (var num in data) {
          this.solicitud.push(data[num]);
          this.solicitud1.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.obtenerAsesorPeriodo(this.periodo).subscribe(
      data => {
        this.asesor1=[]
        this.asesor2=[]
        for (var num in data) {
          this.asesor1.push(data[num]);
          this.asesor2.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  mostrarRegistros(numRegistros) {
    switch (numRegistros) {
      case "2":
        this.registrosPagina = 2; this.select1 = 'active'; this.select2 = ''; this.select3 = ''; this.select4 = '';
        break;
      case "5":
        this.registrosPagina = 5; this.select1 = ''; this.select2 = 'active'; this.select3 = ''; this.select4 = '';
        break;
      case "10":
        this.registrosPagina = 10; this.select1 = ''; this.select2 = ''; this.select3 = 'active'; this.select4 = '';
        break;
      case "todos":
        this.registrosPagina = this.asesor2.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }

  asesor() {
    this.visasesor = !this.visasesor;
  }

  alumno() {
    this.visalumno = !this.visalumno;

  }
  handleError(error) {
    this.error = error.error.error;
  }

  buscar() {
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.asesor1 = this.asesor2;
    if (this.filtroPK_ASESOR_ASESORIA_HORARIO) {
      var re = new RegExp(this.filtroPK_ASESOR_ASESORIA_HORARIO, 'g');
      console.log(re)
      console.log(this.asesor1)
      console.log(this.asesor2)
      this.asesor1 = this.asesor2.filter(item => item.PK_ASESOR_ASESORIA_HORARIO.match(re));
    }
    if (this.filtroname) {
      var re = new RegExp(this.filtroname, 'g');
      this.asesor1 = this.asesor1.filter(item => item.name.match(re));
    }
    if (this.filtroPRIMER_APELLIDO) {
      var re = new RegExp(this.filtroPRIMER_APELLIDO, 'g');
      this.asesor1 = this.asesor1.filter(item => item.PRIMER_APELLIDO.match(re));
    }
    if (this.filtroSEGUNDO_APELLIDO) {
      var re = new RegExp(this.filtroSEGUNDO_APELLIDO, 'g');
      this.asesor1 = this.asesor1.filter(item => item.SEGUNDO_APELLIDO.match(re));
    }
    if (this.filtroCORREO) {
      var re = new RegExp(this.filtroCORREO, 'g');
      this.asesor1 = this.asesor1.filter(item => item.email.match(re));
    }
    if (this.filtroTELEFONO_MOVIL) {
      var re = new RegExp(this.filtroTELEFONO_MOVIL, 'g');
      this.asesor1 = this.asesor1.filter(item => item.TELEFONO_MOVIL.match(re));
    }
    if (this.filtroMATERIA1) {
      if (this.filtroMATERIA1 == "todas") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.MATERIA === this.filtroMATERIA1);
      }
    }

    if (this.filtroMATERIA2) {
      if (this.filtroMATERIA2 == "todas") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.MATERIA1 === this.filtroMATERIA2);
      }
    }

    if (this.filtroMATERIA3) {
      if (this.filtroMATERIA3 == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.MATERIA2 === this.filtroMATERIA3);
      }
    }
    if (this.filtroDIA) {
      if (this.filtroDIA == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.DIA === this.filtroDIA);
      }
    }
    if (this.filtroHORA) {
      if (this.filtroHORA == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.HORA === this.filtroHORA);
      }
    }
     if (this.filtroCAMPUS) {
      if (this.filtroCAMPUS == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.CAMPUS === this.filtroCAMPUS);
      }
    } 
    if (this.filtroSTATUS) {
      if (this.filtroSTATUS == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.STATUS === this.filtroSTATUS);
      }
    }
    if (this.filtroPERIODO) {
      if (this.filtroPERIODO == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.PERIODO === this.filtroPERIODO);
      }
    }
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var pagos = [[
      'IDSOLICITUD',
      'NOMBRE',
      'CORREO',
      'CELULAR',
      'MATERIA1',
      'MATERIA2',
      'MATERIA3',
      'DIA',
      'HORA',
      'CAMPUS'
    ]];

    for (var i = 0; i < this.asesor2.length; i++) {
      //var fechaTexto =this.asesor2[i].FECHA_REGISTRO.split('-');
      //console.log(fechaTexto[0]+"/"+(fechaTexto[1])+"/"+fechaTexto[2].substr(0,2));
      //console.log(this.asesor2[i].FECHA_REGISTRO.split('-'));
      //pagos.push([this.asesor2[i].PREFICHA,this.asesor2[i].NOMBRE+" "+this.asesor2[i].PRIMER_APELLIDO+" "+this.asesor2[i].SEGUNDO_APELLIDO]);
      pagos.push([
        this.asesor2[i].PK_ASESOR_ASESORIA_HORARIO,
        this.asesor2[i].name + " " + this.asesor2[i].PRIMER_APELLIDO + " " + this.asesor2[i].SEGUNDO_APELLIDO,
        this.asesor2[i].email,
        this.asesor2[i].TELEFONO_MOVIL,
        this.asesor2[i].MATERIA,
        this.asesor2[i].MATERIA1,
        this.asesor2[i].MATERIA2,
        this.asesor2[i].DIA,
        this.asesor2[i].HORA,
        this.asesor2[i].CAMPUS
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "SOLICITUDES_ASESOR",
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

    XLSX.writeFile(wb, 'SOLICITUDES_ASESOR' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel1() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var pagos = [[
      'IDSOLICITUD',
      'NOMBRE',
      'CORREO',
      'CELULAR',
      'MATERIA1',
      'MATERIA2',
      'MATERIA3',
      'DIA',
      'HORA',
      'CAMPUS'
    ]];

    for (var i = 0; i < this.solicitud1.length; i++) {
      //var fechaTexto =this.asesor2[i].FECHA_REGISTRO.split('-');
      //console.log(fechaTexto[0]+"/"+(fechaTexto[1])+"/"+fechaTexto[2].substr(0,2));
      //console.log(this.asesor2[i].FECHA_REGISTRO.split('-'));
      //pagos.push([this.asesor2[i].PREFICHA,this.asesor2[i].NOMBRE+" "+this.asesor2[i].PRIMER_APELLIDO+" "+this.asesor2[i].SEGUNDO_APELLIDO]);
      pagos.push([
        this.solicitud1[i].PK_ASESOR_ASESORIA_HORARIO,
        this.solicitud1[i].name + " " + this.solicitud1[i].PRIMER_APELLIDO + " " + this.solicitud1[i].SEGUNDO_APELLIDO,
        this.solicitud1[i].email,
        this.solicitud1[i].TELEFONO_MOVIL,
        this.solicitud1[i].MATERIA,
        this.solicitud1[i].MATERIA1,
        this.solicitud1[i].MATERIA2,
        this.solicitud1[i].DIA,
        this.solicitud1[i].HORA,
        this.solicitud1[i].CAMPUS
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "SOLICITUDES_ASESOR",
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

    XLSX.writeFile(wb, 'SOLICITUDES_ASESOR' + y + "-" + m + "-" + d + '.xlsx');
  }
}