import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-formatoAsesor',
  templateUrl: './formatoAsesor.component.html',
  styleUrls: ['./formatoAsesor.component.scss']
})
export class FormatoAsesorComponent implements OnInit {
  visindividual = false;
  visgrupal = false;
  visatisfaccion = false;
  public error = [];
  public data = [];


  periodo = '20191';
  periodo1 = '20191';

  asesoria = [];
  asesoria1 = [];
  grupo = [];
  grupo1 = [];
  materias = [];
  docentes = [];
  asesores = [];
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;
  select11 = 'active';
  select22 = null;
  select33 = null;
  select44 = null;
  registrosPagina = 2;
  registrosPagina1 = 2;
  pageActual: number = 1;
  pageActual1: number = 1;

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
    id: sessionStorage.getItem("IdUsuario"),
    name: null,
    control: null,
    apep: null,
    apem: null,
    carrera: null,
    email: null,
    celular: null,
    sexo: null,
    edad: '0',
    residencia: null,
    turno: '0',
    materiasAll: '0',
    materias1All: '0',
    maestro: '0',
    maestro1: '0',
    motivo: null,
    semestre: null,
    asesorSa: '0',
    materiaSa: '0',
    sesion: '0',
    afirmacion: null,


    inciso: null,
    inciso1: null,
    inciso2: null,
    inciso3: null,
    inciso4: null,
    inciso5: null,
    inciso6: null,
    inciso7: null,
    inciso8: null,
    inciso9: null,
    inciso10: null,

    respuesta: '0',
    respuesta1: '0',
    respuesta2: '0',
    respuesta3: '0',
    respuesta4: '0',
    respuesta5: '0',
    respuesta6: '0',
    respuesta7: '0',
    respuesta8: '0',
    respuesta9: '0',
    respuesta10: '0',


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

  constructor(private Jarwis: JarwisService) {
  }

  individual() {

    this.visindividual = !this.visindividual;
    this.visgrupal = false;
    this.visatisfaccion = false;

  }

  grupal() {
    this.visgrupal = !this.visgrupal;
    this.visindividual = false;
    this.visatisfaccion = false;
  }

  satisfaccion() {
    this.visatisfaccion = !this.visatisfaccion;
    this.visindividual = false;
    this.visgrupal = false;
  }

  ngOnInit() {
    this.Jarwis.datos(this.form.id).subscribe(
      data => {
        this.form.control = data[0].control
        this.form.name = data[0].name + ' ' + data[0].apep + ' ' + data[0].apem
        this.form.carrera = data[0].carrera
        this.form.email = data[0].email
        this.form.celular = data[0].celular
        this.form.sexo = data[0].sexo
        this.form.semestre = data[0].semestre
      },
      error => this.handleError(error)
    );
    this.Jarwis.allMaterias().subscribe(
      data => {
        for (var num in data) {
          this.materias.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.docente().subscribe(
      data => {
        for (var num in data) {
          this.docentes.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.nameAses(this.form.id).subscribe(
      data => {
        for (var num in data) {
          this.asesores.push(data[num]);
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
    this.Jarwis.getAsesoriaGrupoPeriodo(this.periodo1).subscribe(
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

  di() {
    if (this.form.inciso) {
      this.form.inciso = 1;
    }
    if (this.form.inciso1) {
      this.form.inciso1 = 2;
    }
    if (this.form.inciso2) {
      this.form.inciso2 = 3;
    }
    if (this.form.inciso3) {
      this.form.inciso3 = 4;
    }
    if (this.form.inciso4) {
      this.form.inciso4 = 5;
    }
    if (this.form.inciso5) {
      this.form.inciso5 = 6;
    }
    if (this.form.inciso6) {
      this.form.inciso6 = 7;
    }
    if (this.form.inciso7) {
      this.form.inciso7 = 8;
    }
    if (this.form.inciso8) {
      this.form.inciso8 = 9;
    }
    if (this.form.inciso9) {
      this.form.inciso9 = 10;
    }
    if (this.form.inciso10) {
      this.form.inciso10 = 11;
    }
    console.log(this.form.inciso)
    console.log(this.form.inciso1)
    console.log(this.form.inciso2)
    console.log(this.form.inciso3)
    console.log(this.form.inciso4)
    console.log(this.form.inciso5)
    console.log(this.form.inciso6)
    console.log(this.form.inciso7)
    console.log(this.form.inciso8)
    console.log(this.form.inciso9)
    console.log(this.form.inciso10)



  }

  saveMotivos() {
    if (this.form.inciso == 1) {
      this.form.motivo = 1
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso1 == 2) {
      this.form.motivo = 2
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso2 == 3) {
      this.form.motivo = 3
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso3 == 4) {
      this.form.motivo = 4
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso4 == 5) {
      this.form.motivo = 5
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso5 == 6) {
      this.form.motivo = 6
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso6 == 7) {
      this.form.motivo = 7
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso7 == 8) {
      this.form.motivo = 8
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso8 == 9) {
      this.form.motivo = 9
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso9 == 10) {
      this.form.motivo = 10
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.inciso10 == 11) {
      this.form.motivo = 11
      this.Jarwis.motivo(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }

    alert('RESPUESTAS GUARDADAS');
  }

  cartAsesor() {
    this.Jarwis.compromisoAsesor(this.form).subscribe(
      data => {
        alert('RESPUESTAS GUARDADAS');
      },
      error => this.handleError(error)
    );
  }

  evaluacion() {
    if (this.form.respuesta1 != '0') {
      this.form.afirmacion = 1
      this.form.respuesta = this.form.respuesta1
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta2 != '0') {
      this.form.afirmacion = 2
      this.form.respuesta = this.form.respuesta2
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta3 != '0') {
      this.form.afirmacion = 3
      this.form.respuesta = this.form.respuesta3
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta4 != '0') {
      this.form.afirmacion = 4
      this.form.respuesta = this.form.respuesta4
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta5 != '0') {
      this.form.afirmacion = 5
      this.form.respuesta = this.form.respuesta5
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta6 != '0') {
      this.form.afirmacion = 6
      this.form.respuesta = this.form.respuesta6
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta7 != '0') {
      this.form.afirmacion = 7
      this.form.respuesta = this.form.respuesta7
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta8 != '0') {
      this.form.afirmacion = 8
      this.form.respuesta = this.form.respuesta8
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta9 != '0') {
      this.form.afirmacion = 9
      this.form.respuesta = this.form.respuesta9
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }
    if (this.form.respuesta10 != '0') {
      this.form.afirmacion = 10
      this.form.respuesta = this.form.respuesta10
      this.Jarwis.evaluacion(this.form).subscribe(
        data => {

        },
        error => this.handleError(error)
      );
    }

    alert('RESPUESTAS GUARDADAS');

  }

  handleError(error) {
    this.error = error.error.error;
  }
}