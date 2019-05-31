import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
// @ts-ignore
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportesCoor',
  templateUrl: './reportesCoor.component.html',
  styleUrls: ['./reportesCoor.component.scss']
})
export class ReportesCoordComponent implements OnInit {
  // activado = true;
  visasesor = false;
  visalumno = false;
  viscarta = false;
  visevaluacion = false;
  viscalificacion = false;
  vissesion = false;
  visasistencia = false;
  visfinal = false;
  public motivos = [];
  public compromiso = [];
  public compromisoAsesor = [];
  public evaluacion = [];
  public calificacion = [];
  public sesiones = [];
  public asistencias = [];
  public reportefinal = [];
  public seguimientoAsesor = [];
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
  filtroVALIDA = "todos"

  filtroPK_USER_ASESORIA_HORARIO = null;
  filtroname1 = null;
  filtroPRIMER_APELLIDO1 = null;
  filtroSEGUNDO_APELLIDO1 = null;
  filtroCORREO1 = null;
  filtroTELEFONO_CASA1 = null;
  filtroTELEFONO_MOVIL1 = null;
  filtroMATERIA11 = "todas";
  filtroDIA1 = "todos";
  filtroHORA1 = "todos";
  filtroCAMPUS1 = "todos";
  filtroSTATUS1 = "todos";
  filtroPERIODO1 = "todos";

  public form = {
    valida: null,
    id: null,
    materia1: null,
    materia2: null,
    materia3: null,
    dia: null,
    hora: null,
    id1: null,
    materia: null,
    dia1: null,
    hora1: null,
  };

  index = null;
  periodo = '20191';
  periodo1 = '20191';
  periodo2 = '20191';
  periodo3 = '20191';
  periodo4 = '20191';
  periodo5 = '20191';
  periodo6 = '20191';
  periodo7 = '20191';
  relleno = null;
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;
  select11 = 'active';
  select22 = null;
  select33 = null;
  select44 = null;
  select5 = 'active';
  select6 = null;
  select7 = null;
  select8 = null;
  select12 = 'active';
  select13 = null;
  select14 = null;
  select15 = null;
  select16 = 'active';
  select17 = null;
  select18 = null;
  select19 = null;
  select23= 'active';
  select24 = null;
  select25 = null;
  select26 = null;
  select27= 'active';
  select28 = null;
  select29 = null;
  select30 = null;
  select34= 'active';
  select35 = null;
  select36 = null;
  select37 = null;
  registrosPagina = 2;
  registrosPagina1 = 2;
  registrosPagina2 = 2;
  registrosPagina3= 2;
  registrosPagina4= 2;
  registrosPagina5= 2;
  registrosPagina6= 2;
  registrosPagina7= 2;
  pageActual: number = 1;
  pageActual1: number = 1;
  pageActual2: number = 1;
  pageActual3: number = 1;
  pageActual4: number = 1;
  pageActual5: number = 1;
  pageActual6: number = 1;
  pageActual7: number = 1;
  public error = [];
  public data = [];

  constructor(private Jarwis: JarwisService) {
  }

  ngOnInit() {
    this.Jarwis.getMotivos().subscribe(
      data => {
        for (var num in data) {
          this.motivos.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getComprimisoUser().subscribe(
      data => {
        for (var num in data) {
          this.compromiso.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getComprimisoAsesor().subscribe(
      data => {
        for (var num in data) {
          this.compromisoAsesor.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getEvaluacion().subscribe(
      data => {
        for (var num in data) {
          this.evaluacion.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getCalificacion().subscribe(
      data => {
        for (var num in data) {
          this.calificacion.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getSesiones().subscribe(
      data => {
        for (var num in data) {
          this.sesiones.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getAsistencia().subscribe(
      data => {
        for (var num in data) {
          this.asistencias.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getReporteFinal().subscribe(
      data => {
        for (var num in data) {
          this.reportefinal.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getMotivosPeriodo(this.periodo).subscribe(
      data => {
        this.motivos = []
        for (var num in data) {
          this.motivos.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber1() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getComprimisoUserPeriodo(this.periodo1).subscribe(
      data => {
        this.compromiso = []
        for (var num in data) {
          this.compromiso.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber2() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getComprimisoAsesorPeriodo(this.periodo2).subscribe(
      data => {
        this.compromisoAsesor = []
        for (var num in data) {
          this.compromisoAsesor.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber3() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getEvaluacionPeriodo(this.periodo3).subscribe(
      data => {
        this.evaluacion = []
        for (var num in data) {
          this.evaluacion.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber4() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getCalificacionPeriodo(this.periodo4).subscribe(
      data => {
        this.calificacion = []
        for (var num in data) {
          this.calificacion.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber5() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getSesionesPeriodo(this.periodo5).subscribe(
      data => {
        this.sesiones = []
        for (var num in data) {
          this.sesiones.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber6() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getAsistenciaPeriodo(this.periodo6).subscribe(
      data => {
        this.asistencias = []
        for (var num in data) {
          this.asistencias.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber7() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.getReporteFinalPeriodo(this.periodo7).subscribe(
      data => {
        this.reportefinal = []
        for (var num in data) {
          this.reportefinal.push(data[num]);
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
        this.registrosPagina = this.motivos.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }

  mostrarRegistros1(numRegistros1) {
    switch (numRegistros1) {
      case "2":
        this.registrosPagina1 = 2; this.select11 = 'active'; this.select22 = ''; this.select33 = ''; this.select44 = '';
        break;
      case "5":
        this.registrosPagina1 = 5; this.select11 = ''; this.select22 = 'active'; this.select33 = ''; this.select44 = '';
        break;
      case "10":
        this.registrosPagina1 = 10; this.select11 = ''; this.select22 = ''; this.select33 = 'active'; this.select44 = '';
        break;
      case "todos":
        this.registrosPagina1 = this.compromiso.length; this.select11 = ''; this.select22 = ''; this.select33 = ''; this.select44 = 'active';
        break;
    }
  }

  mostrarRegistros2(numRegistros2) {
    switch (numRegistros2) {
      case "2":
        this.registrosPagina2 = 2; this.select5 = 'active'; this.select6 = ''; this.select7 = ''; this.select8 = '';
        break;
      case "5":
        this.registrosPagina2 = 5; this.select5 = ''; this.select6 = 'active'; this.select7 = ''; this.select8 = '';
        break;
      case "10":
        this.registrosPagina2 = 10; this.select5 = ''; this.select6 = ''; this.select7 = 'active'; this.select8 = '';
        break;
      case "todos":
        this.registrosPagina2 = this.compromisoAsesor.length; this.select5 = ''; this.select6 = ''; this.select7 = ''; this.select8 = 'active';
        break;
    }
  }

  mostrarRegistros3(numRegistros3) {
    switch (numRegistros3) {
      case "2":
        this.registrosPagina3 = 2; this.select12 = 'active'; this.select13 = ''; this.select14 = ''; this.select15 = '';
        break;
      case "5":
        this.registrosPagina3 = 5; this.select12 = ''; this.select13 = 'active'; this.select14 = ''; this.select15 = '';
        break;
      case "10":
        this.registrosPagina3 = 10; this.select12 = ''; this.select13 = ''; this.select14 = 'active'; this.select15 = '';
        break;
      case "todos":
        this.registrosPagina3 = this.evaluacion.length; this.select12 = ''; this.select13 = ''; this.select14 = ''; this.select15 = 'active';
        break;
    }
  }

  mostrarRegistros4(numRegistros4) {
    switch (numRegistros4) {
      case "2":
        this.registrosPagina4 = 2; this.select16 = 'active'; this.select17 = ''; this.select18 = ''; this.select19 = '';
        break;
      case "5":
        this.registrosPagina4 = 5; this.select16 = ''; this.select17 = 'active'; this.select18 = ''; this.select19 = '';
        break;
      case "10":
        this.registrosPagina4 = 10; this.select16 = ''; this.select17 = ''; this.select18 = 'active'; this.select19 = '';
        break;
      case "todos":
        this.registrosPagina4 = this.calificacion.length; this.select16 = ''; this.select17 = ''; this.select18 = ''; this.select19 = 'active';
        break;
    }
  }

  mostrarRegistros5(numRegistros5) {
    switch (numRegistros5) {
      case "2":
        this.registrosPagina5 = 2; this.select23 = 'active'; this.select24 = ''; this.select25 = ''; this.select26 = '';
        break;
      case "5":
        this.registrosPagina5 = 5; this.select23 = ''; this.select24 = 'active'; this.select25 = ''; this.select26 = '';
        break;
      case "10":
        this.registrosPagina5 = 10; this.select23 = ''; this.select24 = ''; this.select25 = 'active'; this.select26 = '';
        break;
      case "todos":
        this.registrosPagina5 = this.sesiones.length; this.select23 = ''; this.select24 = ''; this.select25 = ''; this.select26 = 'active';
        break;
    }
  }

  mostrarRegistros6(numRegistros6) {
    switch (numRegistros6) {
      case "2":
        this.registrosPagina6 = 2; this.select27 = 'active'; this.select28 = ''; this.select29 = ''; this.select30 = '';
        break;
      case "5":
        this.registrosPagina6 = 5; this.select27 = ''; this.select28 = 'active'; this.select29 = ''; this.select30 = '';
        break;
      case "10":
        this.registrosPagina6 = 10; this.select27 = ''; this.select28 = ''; this.select29 = 'active'; this.select30 = '';
        break;
      case "todos":
        this.registrosPagina6 = this.asistencias.length; this.select27 = ''; this.select28 = ''; this.select29 = ''; this.select30 = 'active';
        break;
    }
  }

  mostrarRegistros7(numRegistros7) {
    switch (numRegistros7) {
      case "2":
        this.registrosPagina7 = 2; this.select34 = 'active'; this.select35 = ''; this.select36 = ''; this.select37 = '';
        break;
      case "5":
        this.registrosPagina7 = 5; this.select34 = ''; this.select35 = 'active'; this.select36 = ''; this.select37 = '';
        break;
      case "10":
        this.registrosPagina7 = 10; this.select34 = ''; this.select35 = ''; this.select36 = 'active'; this.select37 = '';
        break;
      case "todos":
        this.registrosPagina7 = this.reportefinal.length; this.select34 = ''; this.select35 = ''; this.select36 = ''; this.select37 = 'active';
        break;
    }
  }
  asesor() {
    this.visasesor = !this.visasesor;
  }

  alumno() {
    this.visalumno = !this.visalumno;

  }

  carta() {
    this.viscarta = !this.viscarta;

  }
  evalua() {
    this.visevaluacion = !this.visevaluacion;

  }
  califica() {
    this.viscalificacion = !this.viscalificacion;

  }
  sesion() {
    this.vissesion = !this.vissesion;

  }
  asistencia() {
    this.visasistencia = !this.visasistencia;

  }
  final() {
    this.visfinal = !this.visfinal;

  }
  handleError(error) {
    this.error = error.error.error;
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var ase = [[
      'NOMBRE',
      'CONTROL',
      'CARRERA',
      'NOMBRE MOTIVO',
      'EDAD',
      'SEXO',
      'RESIDENCIA',
      'TURNO',
      'EMAIL',
      'MATERIA APOYO',
      'DOCENTE',
      'PERIODO'
    ]];

    for (var i = 0; i < this.motivos.length; i++) {
      ase.push([
        this.motivos[i].name + " " + this.motivos[i].PRIMER_APELLIDO + " " + this.motivos[i].SEGUNDO_APELLIDO,
        this.motivos[i].NUMERO_CONTROL,
        this.motivos[i].CLAVE_CARRERA,
        this.motivos[i].NOMBRE,
        this.motivos[i].EDAD,
        this.motivos[i].SEXO,
        this.motivos[i].RESIDENCIA,
        this.motivos[i].TURNO,
        this.motivos[i].email,
        this.motivos[i].MATERIA_APOYO1,
        this.motivos[i].DOCENTE1,
        this.motivos[i].PERIODO
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "RESPUESTAS_MOTIVOS",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = ase;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'MOTIVOS_ASESORIA' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel1() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE',
      'NUMERO CONTROL',
      'CARRERA',
      'PERIODO'
    ]];

    for (var i = 0; i < this.compromiso.length; i++) {
      soli.push([
        this.compromiso[i].name + " " + this.compromiso[i].PRIMER_APELLIDO + " " + this.compromiso[i].SEGUNDO_APELLIDO,
        this.compromiso[i].NUMERO_CONTROL,
        this.compromiso[i].CLAVE_CARRERA,
        this.compromiso[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "CARTA COMPROMISO USUARIO",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'CARTA_COMPROMISO_USUARIO ' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel2() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE',
      'NUMERO CONTROL',
      'CARRERA',
      'PERIODO'
    ]];

    for (var i = 0; i < this.compromisoAsesor.length; i++) {
      soli.push([
        this.compromiso[i].name + " " + this.compromiso[i].PRIMER_APELLIDO + " " + this.compromiso[i].SEGUNDO_APELLIDO,
        this.compromiso[i].NUMERO_CONTROL,
        this.compromiso[i].CLAVE_CARRERA,
        this.compromiso[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "CARTA COMPROMISO ASESOR",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'CARTA_COMPROMISO_ASESOR ' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel3() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE ALUMNO',
      'NUMERO CONTROL',
      'CARRERA',
      'NOMBRE ASESOR',
      'MATERIA',
      'SESIONES',
      'PREGUNTA',
      'RESPUESTA',
      'SUGERENCIA',
      'PERIODO',
    ]];

    for (var i = 0; i < this.evaluacion.length; i++) {
      soli.push([
        this.evaluacion[i].name + " " + this.evaluacion[i].PRIMER_APELLIDO + " " + this.evaluacion[i].SEGUNDO_APELLIDO,
        this.evaluacion[i].NUMERO_CONTROL,
        this.evaluacion[i].CLAVE_CARRERA,
        this.evaluacion[i].namea + " " + this.evaluacion[i].apellidop + " " + this.evaluacion[i].apellidom,
        this.evaluacion[i].MATERIA,
        this.evaluacion[i].SESIONES,
        this.evaluacion[i].NOMBRE,
        this.evaluacion[i].RESPUESTA,
        this.evaluacion[i].SUGERENCIA,
        this.evaluacion[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "EVALUACION SATISFACCION",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'EVALUACION_SATISFACCION ' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel4() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE ALUMNO',
      'NUMERO CONTROL',
      'CARRERA',
      'NOMBRE ASESOR',
      'MATERIA',
      'AULA',
      'DIA',
      'HORA',
      'UNIDAD',
      'CALIFICACION',
      'OBSERVACIONES',
      'PERIODO',
    ]];

    for (var i = 0; i < this.calificacion.length; i++) {
      soli.push([
        this.calificacion[i].name + " " + this.calificacion[i].PRIMER_APELLIDO + " " + this.calificacion[i].SEGUNDO_APELLIDO,
        this.calificacion[i].NUMERO_CONTROL,
        this.calificacion[i].CLAVE_CARRERA,
        this.calificacion[i].namea + " " + this.calificacion[i].apellidop + " " + this.calificacion[i].apellidom,
        this.calificacion[i].MATERIA,
        this.calificacion[i].AULA,
        this.calificacion[i].DIA,
        this.calificacion[i].HORA,
        this.calificacion[i].UNIDAD,
        this.calificacion[i].CALIFICACION,
        this.calificacion[i].OBSERVACIONES,
        this.calificacion[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "CALIFICACIONES_PARCIALES",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'CALIFICACIONES_PARCIALES ' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel5() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE ALUMNO',
      'NUMERO CONTROL',
      'CARRERA',
      'MATERIA',
      'SESION',
      'FECHA',
      'ASISTENTES',
      'HORAINICIO',
      'HORAFINAL',
      'TEMA',
      'ACTIVIDADES OBSERVACIONES',
      'PERIODO',
    ]];

    for (var i = 0; i < this.sesiones.length; i++) {
      soli.push([
        this.sesiones[i].name + " " + this.sesiones[i].PRIMER_APELLIDO + " " + this.sesiones[i].SEGUNDO_APELLIDO,
        this.sesiones[i].NUMERO_CONTROL,
        this.sesiones[i].CLAVE_CARRERA,
        this.sesiones[i].MATERIA,
        this.sesiones[i].SESION,
        this.sesiones[i].FECHA,
        this.sesiones[i].ASISTENTES,
        this.sesiones[i].HORAINICIO,
        this.sesiones[i].HORAFINAL,
        this.sesiones[i].TEMA,
        this.sesiones[i].ACTIVIDADES_OBSERVACIONES,
        this.sesiones[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "REPORTES_SESIONES",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'REPORTES_SESIONES ' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel6() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE ASESOR',
      'NOMBRE ALUMNO',
      'FECHA',
      'ASISTIO',
      'PERIODO',
    ]];

    for (var i = 0; i < this.asistencias.length; i++) {
      soli.push([
        this.asistencias[i].name + " " + this.asistencias[i].PRIMER_APELLIDO + " " + this.asistencias[i].SEGUNDO_APELLIDO,
        this.asistencias[i].namea + " " + this.asistencias[i].apellidop + " " + this.asistencias[i].apellidom,        
        this.asistencias[i].FECHA,
        this.asistencias[i].ASISTIO,
        this.asistencias[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "LISTA_ASISTENCIAS",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'LISTA_ASISTENCIAS ' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel7() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE ASESOR',
      'NUMERO CONTROL',
      'CARRERA',
      'MATERIA',
      'FECHA ENTREGA',
      'FECHA INICIO',
      'FECHA FIN',
      'LUGAR',
      'ASESORADOS',
      'SESIONES',
      'SUGERENCIAS',
      'PERIODO',
    ]];

    for (var i = 0; i < this.reportefinal.length; i++) {
      soli.push([
        this.reportefinal[i].name + " " + this.reportefinal[i].PRIMER_APELLIDO + " " + this.reportefinal[i].SEGUNDO_APELLIDO,
        this.reportefinal[i].NUMERO_CONTROL,
        this.reportefinal[i].CLAVE_CARRERA,
        this.reportefinal[i].MATERIA,
        this.reportefinal[i].FECHA_ENTREGA,
        this.reportefinal[i].FECHA_INICIO,
        this.reportefinal[i].FECHA_FIN,
        this.reportefinal[i].LUGAR,
        this.reportefinal[i].ASESORADOS,
        this.reportefinal[i].SESIONES,
        this.reportefinal[i].SUGERENCIAS,
        this.reportefinal[i].PERIODO,
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "REPORTE_FINAL",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = soli;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'REPORTE_FINAL ' + y + "-" + m + "-" + d + '.xlsx');
  }
  
}
