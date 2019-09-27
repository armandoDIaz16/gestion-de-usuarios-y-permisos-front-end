import { Component, OnInit, ɵConsole } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';




@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
  providers: [ValidarModuloService]
})
export class MateriasComponent implements OnInit {
  public mostrarModulo = false;
  visindividual = false;
  visgrupal = false;
  visituacion = false;
  public error = [];
  public data = [];


  periodo = '20191';
  periodo1 = '20191';
  periodo2 = '20191';

  asesoria = [];
  asesoria1 = [];
  grupo = [];
  grupo1 = [];
  asignacion = [];
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;
  select11 = 'active';
  select22 = null;
  select33 = null;
  select44 = null;
  select12 = 'active';
  select13 = null;
  select14 = null;
  select15 = null;
  registrosPagina = 2;
  registrosPagina1 = 2;
  registrosPagina2 = 2;
  pageActual: number = 1;
  pageActual1: number = 1;
  pageActual2: number = 1;

  filtroIdAsesor = null;
  filtroIdAlumno = null;
  filtroMATERIA = null;
  filtroDIA = null;
  filtroHORA = null;
  filtroESPACIO = null;
  filtroVALIDA = null;
  filtroCAMPUS = null;
  filtroPERIODO = null;

  filtroIdAsesor1 = null;
  filtroIdGrupo = null;
  filtroMATERIA1 = null;
  filtroDIA1 = null;
  filtroHORA1 = null;
  filtroESPACIO1 = null;
  filtroVALIDA1 = null;
  filtroCAMPUS1 = null;
  filtroPERIODO1 = null;

  public form = {
    asesor: null,
    alumno: null,
    materia: null,
    dia: null,
    hora: null,
    valida: null,
    espacio: null,
    campus: null,
    idAsesor: null,

    asesor1: null,
    grupo: null,
    materia1: null,
    dia1: null,
    hora1: null,
    valida1: null,
    espacio1: null,
    campus1: null,
    idGrupo: null
  };

  constructor(private Jarwis: JarwisService,
    private validarModuloService: ValidarModuloService) {
  }

  individual() {

    this.visindividual = !this.visindividual;
  }

  grupal() {
    this.visgrupal = !this.visgrupal;
  }

  situacion(){
    this.visituacion = !this.visituacion;

  }
  ngOnInit() {

    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Materias");
    if (!this.mostrarModulo) {
      return;
    }
    
    this.Jarwis.getAsesoria().subscribe(
      data => {
        for (var num in data) {
          this.asesoria.push(data[num]);
          this.asesoria1.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getAsesoriaGrupo().subscribe(
      data => {
        for (var num in data) {
          this.grupo.push(data[num]);
          this.grupo1.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getAsignacion().subscribe(
      data => {
        for (var num in data) {
          this.asignacion.push(data[num]);
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
        this.registrosPagina = this.asesoria1.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
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
        this.registrosPagina1 = this.grupo1.length; this.select11 = ''; this.select22 = ''; this.select33 = ''; this.select44 = 'active';
        break;
    }
  }

  mostrarRegistros2(numRegistros2) {
    switch (numRegistros2) {
      case "2":
        this.registrosPagina2 = 2; this.select12 = 'active'; this.select13 = ''; this.select14 = ''; this.select15 = '';
        break;
      case "5":
        this.registrosPagina2 = 5; this.select12 = ''; this.select13 = 'active'; this.select14 = ''; this.select15 = '';
        break;
      case "10":
        this.registrosPagina2 = 10; this.select12 = ''; this.select13 = ''; this.select14 = 'active'; this.select15 = '';
        break;
      case "todos":
        this.registrosPagina2 = this.asignacion.length; this.select12 = ''; this.select13 = ''; this.select14 = ''; this.select15 = 'active';
        break;
    }
  }

  toNumber() {
    this.Jarwis.getAsesoriaPeriodo(this.periodo).subscribe(
      data => {
        this.asesoria = []
        this.asesoria1 = []
        for (var num in data) {
          this.asesoria.push(data[num]);
          this.asesoria1.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber1() {
    this.Jarwis.getSituacionPeriodo(this.periodo1).subscribe(
      data => {
        this.grupo = []
        this.grupo1 = []
        for (var num in data) {
          this.grupo.push(data[num]);
          this.grupo1.push(data[num]);
        }


      },
      error => this.handleError(error)
    );
  }

  toNumber2() {
    this.Jarwis.getAsesoriaGrupoPeriodo(this.periodo2).subscribe(
      data => {
        this.asignacion = []
        for (var num in data) {
          this.asignacion.push(data[num]);
        }


      },
      error => this.handleError(error)
    );
  }

  buscar() {
    this.aplicarFiltros();
  }
  buscar1() {
    this.aplicarFiltros1();
  }

  aplicarFiltros() {
    this.asesoria = this.asesoria1;
    if (this.filtroIdAsesor) {
      var re = new RegExp(this.filtroIdAsesor, 'g');
      this.asesoria = this.asesoria1.filter(item => item.FK_ASESOR.match(re));
    }
    if (this.filtroIdAlumno) {
      var re = new RegExp(this.filtroIdAlumno, 'g');
      this.asesoria = this.asesoria.filter(item => item.FK_ALUMNO.match(re));
    }
    if (this.filtroMATERIA) {
      var re = new RegExp(this.filtroMATERIA, 'g');
      this.asesoria = this.asesoria.filter(item => item.MATERIA.match(re));
    }
    if (this.filtroDIA) {
      var re = new RegExp(this.filtroDIA, 'g');
      this.asesoria = this.asesoria.filter(item => item.DIA.match(re));
    }
    if (this.filtroHORA) {
      var re = new RegExp(this.filtroHORA, 'g');
      this.asesoria = this.asesoria.filter(item => item.HORA.match(re));
    }
    if (this.filtroESPACIO) {
      var re = new RegExp(this.filtroESPACIO, 'g');
      this.asesoria = this.asesoria.filter(item => item.ESPACIO.match(re));
    }
    if (this.filtroVALIDA) {
      var re = new RegExp(this.filtroVALIDA, 'g');
      this.asesoria = this.asesoria.filter(item => item.VALIDA.match(re));
    }
    if (this.filtroCAMPUS) {
      var re = new RegExp(this.filtroCAMPUS, 'g');
      this.asesoria = this.asesoria.filter(item => item.CAMPUS.match(re));
    }
    if (this.filtroPERIODO) {
      var re = new RegExp(this.filtroPERIODO, 'g');
      this.asesoria = this.asesoria.filter(item => item.PERIODO.match(re));
    }
  }
  aplicarFiltros1() {
    this.grupo = this.grupo1;
    if (this.filtroIdAsesor1) {
      var re = new RegExp(this.filtroIdAsesor1, 'g');
      this.grupo = this.grupo1.filter(item => item.FK_ASESOR.match(re));
    }
    if (this.filtroIdGrupo) {
      var re = new RegExp(this.filtroIdGrupo, 'g');
      this.grupo = this.grupo.filter(item => item.CLAVE_GRUPO.match(re));
    }
    if (this.filtroMATERIA1) {
      var re = new RegExp(this.filtroMATERIA1, 'g');
      this.grupo = this.grupo.filter(item => item.MATERIA.match(re));
    }
    if (this.filtroDIA1) {
      var re = new RegExp(this.filtroDIA1, 'g');
      this.grupo = this.grupo.filter(item => item.DIA.match(re));
    }
    if (this.filtroHORA1) {
      var re = new RegExp(this.filtroHORA1, 'g');
      this.grupo = this.grupo.filter(item => item.HORA.match(re));
    }
    if (this.filtroESPACIO1) {
      var re = new RegExp(this.filtroESPACIO1, 'g');
      this.grupo = this.grupo.filter(item => item.ESPACIO.match(re));
    }
    if (this.filtroCAMPUS1) {
      var re = new RegExp(this.filtroCAMPUS1, 'g');
      this.grupo = this.grupo.filter(item => item.CAMPUS.match(re));
    }
    if (this.filtroPERIODO1) {
      var re = new RegExp(this.filtroPERIODO1, 'g');
      this.grupo = this.grupo.filter(item => item.PERIODO.match(re));
    }
    if (this.filtroVALIDA1) {
      var re = new RegExp(this.filtroVALIDA1, 'g');
      this.grupo = this.grupo.filter(item => item.VALIDA.match(re));
    }

  }

  modificarInd(x, a, b, c, d, e, f, g, h) {
    this.form.idAsesor = x;
    this.form.asesor = a;
    this.form.alumno = b;
    this.form.materia = c;
    this.form.dia = d;
    this.form.hora = e;
    this.form.valida = f;
    this.form.espacio = g;
    this.form.campus = h;

  }

  actualiza() {
    this.Jarwis.actualizaInd(this.form).subscribe(
      data => {
        alert('DATOS ACTUALIZADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );
  }

  borraInd(a) {
    this.form.idAsesor = a;
    this.Jarwis.borraInd(this.form).subscribe(
      data => {
        alert('DATOS ACTUALIZADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );

  }

  modificarGru(x, a, b, c, d, e, f, g, h) {
    this.form.idGrupo = x;
    this.form.asesor1 = a;
    this.form.grupo = b;
    this.form.materia1 = c;
    this.form.dia1 = d;
    this.form.hora1 = e;
    this.form.valida1 = f;
    this.form.espacio1 = g;
    this.form.campus1 = h;
    console.log(this.form.idGrupo)

  }

  actualiza1() {
    this.Jarwis.actualizaGrup(this.form).subscribe(
      data => {
        alert('DATOS ACTUALIZADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );
  }

  borraGru(a) {
    this.form.idGrupo = a;
    this.Jarwis.borraGrup(this.form).subscribe(
      data => {
        alert('DATOS ACTUALIZADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var ase = [[
      'IDASESORIA',
      'IDASESOR',
      'IDALUMNO',
      'MATERIA',
      'DIA',
      'HORA',
      'PERIODO',
      'CAMPUS',
      'ESPACIO',
      'VALIDA'
    ]];

    for (var i = 0; i < this.asesoria1.length; i++) {
      //var fechaTexto =this.asesoria1[i].FECHA_REGISTRO.split('-');
      //console.log(fechaTexto[0]+"/"+(fechaTexto[1])+"/"+fechaTexto[2].substr(0,2));
      //console.log(this.asesoria1[i].FECHA_REGISTRO.split('-'));
      //pagos.push([this.asesoria1[i].PREFICHA,this.asesoria1[i].NOMBRE+" "+this.asesoria1[i].PRIMER_APELLIDO+" "+this.asesoria1[i].SEGUNDO_APELLIDO]);
      ase.push([
        this.asesoria1[i].PK_ASESORIA_ACEPTADA,
        this.asesoria1[i].FK_ASESOR,
        this.asesoria1[i].FK_ALUMNO,
        this.asesoria1[i].MATERIA,
        this.asesoria1[i].DIA,
        this.asesoria1[i].HORA,
        this.asesoria1[i].PERIODO,
        this.asesoria1[i].CAMPUS,
        this.asesoria1[i].ESPACIO,
        this.asesoria1[i].VALIDA
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "ASESORIAS",
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

    XLSX.writeFile(wb, 'ASESORIA' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel1() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'IDASESORIAGRUPO',
      'IDASESOR',
      'IDGRUPO',
      'MATERIA',
      'DIA',
      'HORA',
      'ESPACIO',
      'CAMPUS',
      'PERIODO',
      'VALIDA'
    ]];

    for (var i = 0; i < this.grupo1.length; i++) {
      soli.push([
        this.grupo1[i].PK_ASESORIA_GRUPO,
        this.grupo1[i].FK_ASESOR,
        this.grupo1[i].CLAVE_GRUPO,
        this.grupo1[i].MATERIA,
        this.grupo1[i].DIA,
        this.grupo1[i].HORA,
        this.grupo1[i].ESPACIO,
        this.grupo1[i].CAMPUS,
        this.grupo1[i].PERIODO,
        this.grupo1[i].VALIDA
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "ASESORIA GRUPO",
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

    XLSX.writeFile(wb, 'ASESORIA_GRUPO ' + y + "-" + m + "-" + d + '.xlsx');
  }

  generarExcel2() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'NOMBRE ASESOR',
      'NUMERO CONTROL ALUMNO',
      'MATERIA',
      'DIA',
      'HORA',
      'CAMPUS',
      'ESPACIO',
      'PERIODO',
      'VALIDA'
    ]];

    for (var i = 0; i < this.asignacion.length; i++) {
      soli.push([
        this.asignacion[i].name + " " + this.asignacion[i].PRIMER_APELLIDO + " " + this.asignacion[i].SEGUNDO_APELLIDO,
        this.asignacion[i].CONTROL_ALUMNO,
        this.asignacion[i].MATERIA,
        this.asignacion[i].DIA,
        this.asignacion[i].HORA,
        this.asignacion[i].CAMPUS,
        this.asignacion[i].ESPACIO,
        this.asignacion[i].PERIODO,
        this.asignacion[i].VALIDA
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "ASESORIA_SITUACION",
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

    XLSX.writeFile(wb, 'ASESORIA_SITUACION ' + y + "-" + m + "-" + d + '.xlsx');
  }

handleError(error) {
  this.error = error.error.error;
}
}