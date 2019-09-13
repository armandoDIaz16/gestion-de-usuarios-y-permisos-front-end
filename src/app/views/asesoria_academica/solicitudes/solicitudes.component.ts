import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
// @ts-ignore
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  providers: [ValidarModuloService]

})
export class SolicitudesComponent implements OnInit {
 // activado = true;
 public mostrarModulo = false;
  visasesor = false;
  visalumno = false;
  promedio = null;
  public estatus = [];
  public carreras = [];
  public asesor1 = [];
  public asesor2 = [];
  public solicitud = [];
  public solicitud1 = [];
  public horarioUser = [];
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
  relleno = null;
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
  public error = [];
  public data = [];
  

  constructor(private Jarwis: JarwisService,
    private validarModuloService: ValidarModuloService) {
  }

  ngOnInit() {

    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Solicitudes");
    if (!this.mostrarModulo) {
      return;
    }
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
        this.asesor1 = []
        this.asesor2 = []
        for (var num in data) {
          this.asesor1.push(data[num]);
          this.asesor2.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber1() {
    //this.levelNum = +this.levelNum;
    this.Jarwis.obtenerSolicitudPeriodo(this.periodo1).subscribe(
      data => {
        this.solicitud = []
        this.solicitud1 = []
        for (var num in data) {
          this.solicitud.push(data[num]);
          this.solicitud1.push(data[num]);
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
        this.registrosPagina1 = this.solicitud1.length; this.select11 = ''; this.select22 = ''; this.select33 = ''; this.select44 = 'active';
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
  buscar1() {
    this.aplicarFiltros1();
  }

  aplicarFiltros() {
    this.asesor1 = this.asesor2;
    if (this.filtroPK_ASESOR_ASESORIA_HORARIO) {
      var re = new RegExp(this.filtroPK_ASESOR_ASESORIA_HORARIO, 'g');
      this.asesor1 = this.asesor2.filter(item => item.FK_USUARIO.match(re));
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
 /*    if (this.filtroSTATUS) {
      if (this.filtroSTATUS == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.STATUS === this.filtroSTATUS);
      }
    } */
    if (this.filtroPERIODO) {
      if (this.filtroPERIODO == "todos") {
        this.asesor1 = this.asesor1;
      } else {
        this.asesor1 = this.asesor1.filter(item => item.PERIODO === this.filtroPERIODO);
      }
    }
  }
  aplicarFiltros1() {
    this.solicitud = this.solicitud1;
    if (this.filtroPK_USER_ASESORIA_HORARIO) {
      var re = new RegExp(this.filtroPK_USER_ASESORIA_HORARIO, 'g');
      this.solicitud = this.solicitud1.filter(item => item.FK_USUARIO.match(re));
    }
    if (this.filtroname1) {
      var re = new RegExp(this.filtroname1, 'g');
      this.solicitud = this.solicitud.filter(item => item.name.match(re));
    }
    if (this.filtroPRIMER_APELLIDO1) {
      var re = new RegExp(this.filtroPRIMER_APELLIDO1, 'g');
      this.solicitud = this.solicitud.filter(item => item.PRIMER_APELLIDO.match(re));
    }
    if (this.filtroSEGUNDO_APELLIDO1) {
      var re = new RegExp(this.filtroSEGUNDO_APELLIDO1, 'g');
      this.solicitud = this.solicitud.filter(item => item.SEGUNDO_APELLIDO.match(re));
    }
    if (this.filtroCORREO1) {
      var re = new RegExp(this.filtroCORREO1, 'g');
      this.solicitud = this.solicitud.filter(item => item.email.match(re));
    }
    if (this.filtroTELEFONO_MOVIL1) {
      var re = new RegExp(this.filtroTELEFONO_MOVIL1, 'g');
      this.solicitud = this.solicitud.filter(item => item.TELEFONO_MOVIL.match(re));
    }
    if (this.filtroMATERIA11) {
      if (this.filtroMATERIA11 == "todas") {
        this.solicitud = this.solicitud;
      } else {
        this.solicitud = this.solicitud.filter(item => item.MATERIA === this.filtroMATERIA11);
      }
    }
    if (this.filtroDIA1) {
      if (this.filtroDIA1 == "todos") {
        this.solicitud = this.solicitud;
      } else {
        this.solicitud = this.solicitud.filter(item => item.DIA === this.filtroDIA1);
      }
    }
    if (this.filtroHORA1) {
      if (this.filtroHORA1 == "todos") {
        this.solicitud = this.solicitud;
      } else {
        this.solicitud = this.solicitud.filter(item => item.HORA === this.filtroHORA1);
      }
    }
    if (this.filtroCAMPUS1) {
      if (this.filtroCAMPUS1 == "todos") {
        this.solicitud = this.solicitud;
      } else {
        this.solicitud = this.solicitud.filter(item => item.CAMPUS === this.filtroCAMPUS1);
      }
    }
   /*  if (this.filtroSTATUS1) {
      if (this.filtroSTATUS1 == "todos") {
        this.solicitud = this.solicitud;
      } else {
        this.solicitud = this.solicitud.filter(item => item.STATUS === this.filtroSTATUS1);
      }
    } */
    if (this.filtroPERIODO1) {
      if (this.filtroPERIODO1 == "todos") {
        this.solicitud = this.solicitud;
      } else {
        this.solicitud = this.solicitud.filter(item => item.PERIODO === this.filtroPERIODO1);
      }
    }
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var ase = [[
      'IDSOLICITUD',
      'NOMBRE',
      'CORREO',
      'CELULAR',
      'MATERIA1',
      'MATERIA2',
      'MATERIA3',
      'DIA',
      'HORA',
      'CAMPUS',
      'PERIODO',
      'STATUS'
    ]];

    for (var i = 0; i < this.asesor2.length; i++) {
      //var fechaTexto =this.asesor2[i].FECHA_REGISTRO.split('-');
      //console.log(fechaTexto[0]+"/"+(fechaTexto[1])+"/"+fechaTexto[2].substr(0,2));
      //console.log(this.asesor2[i].FECHA_REGISTRO.split('-'));
      //pagos.push([this.asesor2[i].PREFICHA,this.asesor2[i].NOMBRE+" "+this.asesor2[i].PRIMER_APELLIDO+" "+this.asesor2[i].SEGUNDO_APELLIDO]);
      ase.push([
        this.asesor2[i].PK_ASESOR_ASESORIA_HORARIO,
        this.asesor2[i].name + " " + this.asesor2[i].PRIMER_APELLIDO + " " + this.asesor2[i].SEGUNDO_APELLIDO,
        this.asesor2[i].email,
        this.asesor2[i].TELEFONO_MOVIL,
        this.asesor2[i].MATERIA,
        this.asesor2[i].MATERIA1,
        this.asesor2[i].MATERIA2,
        this.asesor2[i].DIA,
        this.asesor2[i].HORA,
        this.asesor2[i].CAMPUS,
        this.asesor2[i].PERIODO,
        this.asesor2[i].STATUS
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

    XLSX.writeFile(wb, 'SOLICITUDES_ASESOR' + y + "-" + m + "-" + d + '.xlsx');
  }
  generarExcel1() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var soli = [[
      'IDSOLICITUD',
      'NOMBRE',
      'CORREO',
      'CELULAR',
      'MATERIA',
      'DIA',
      'HORA',
      'CAMPUS',
      'PERIODO',
      'STATUS'
    ]];

    for (var i = 0; i < this.solicitud1.length; i++) {
      soli.push([
        this.solicitud1[i].PK_USER_ASESORIA_HORARIO,
        this.solicitud1[i].name + " " + this.solicitud1[i].PRIMER_APELLIDO + " " + this.solicitud1[i].SEGUNDO_APELLIDO,
        this.solicitud1[i].email,
        this.solicitud1[i].TELEFONO_MOVIL,
        this.solicitud1[i].MATERIA,
        this.solicitud1[i].DIA,
        this.solicitud1[i].HORA,
        this.solicitud1[i].CAMPUS,
        this.solicitud1[i].PERIODO,
        this.solicitud1[i].STATUS
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "SOLICITUDES_DE-ASESORIA",
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

    XLSX.writeFile(wb, 'SOLICITUDES_DE_ASESORIA ' + y + "-" + m + "-" + d + '.xlsx');
  }

  horario(i) {
    this.Jarwis.horaAll(i).subscribe(
      data => {
        this.horarioUser = [];
        var prueba = [];
        for (var num in data) {
          this.horarioUser.push(data[num]);
        }
        //console.log(this.horarioUser)

      },
      error => this.handleError(error)
    );
  }

  segui(i) {
    this.Jarwis.promedio(i).subscribe(
      data => {
        this.promedio = data;
      },
      error => this.handleError(error)
    );
    this.Jarwis.seguimiento(i).subscribe(
      data => {
        this.seguimientoAsesor = [];
        for (var num in data) {
          this.seguimientoAsesor.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  modificar(z, a, e, i, o, u, x) {
    this.form.id = z;
    this.form.materia1 = a;
    this.form.materia2 = e;
    this.form.materia3 = i;
    this.form.dia = o;
    this.form.hora = u;
    this.form.valida = x;
  }

  modificarSol(a, b, c, d) {
    this.form.id1 = a;
    this.form.materia = b;
    this.form.dia1 = c;
    this.form.hora1 = d;
  }

  actualiza() {
    this.Jarwis.actualizAsesor(this.form).subscribe(
      data => {
        alert('DATOS ACTUALIZADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );
  }

  actualizaSolicitud() {
    console.log('pepe')
    this.Jarwis.actualizaSolicitud(this.form).subscribe(
      data => {
        alert('DATOS ACTUALIZADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );
  }

  borra(a) {
    this.form.id = a;
    this.Jarwis.borrAsesor(this.form).subscribe(
      data => {
        alert('DATOS ELIMINADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );
  }

  borraSolicitud(a){
    this.form.id1 = a;
    this.Jarwis.borraSolicitud(this.form).subscribe(
      data => {
        alert('DATOS ELIMINADOS CORRECTAMENTE');
        location.reload();
      },
      error => this.handleError(error)
    );

  }
}
