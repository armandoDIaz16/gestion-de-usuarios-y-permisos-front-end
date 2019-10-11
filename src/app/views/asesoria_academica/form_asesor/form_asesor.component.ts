import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { AperturaService } from '../../../services/apertura.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
//import * as $ from 'jquery';
@Component({
  selector: 'app-form_asesor',
  templateUrl: './form_asesor.component.html',
  styleUrls: ['./form_asesor.component.scss'],
  providers: [AperturaService,ValidarModuloService]
})
export class Form_asesorComponent implements OnInit {
  public mostrarModulo = false;
  activado = false;
  fechaInicio = null;
  fechaFin = null;
  fechaActual = null;
  levels = [];
  levels1 = [];
  horariosLunes = [];
  horariosMartes = [];
  horariosMiercoles = [];
  horariosJueves = [];
  horariosViernes = [];
  materias2 = [];


  public form = {
    id: sessionStorage.getItem("IdUsuario"),
    dia: null,
    hora: null,
    email: null,
    name: null,
    curp: null,
    control: sessionStorage.getItem("control"),
    apep: null,
    apem: null,
    carrera: null,
    celular: null,
    lunes: null,
    martes: null,
    miercoles: null,
    jueves: null,
    viernes: null,
    levelNum: '0',
    levelNum1: '0',
    levelNum2: '0',
    levelNum3: '0',
    levelNum4: '0',
    materia: '0',
    materia1: '0',
    materia2: '0',
    semestre: null,
    promedio: null,
    validar:'0',
    campus: '0'
  };

  habilitarHoraLunes = true;
  habilitarHoraMartes = true;
  habilitarHoraMiercoles = true;
  habilitarHoraJueves = true;
  habilitarHoraViernes = true;
  habilitarMaterias = true;

  public error = [];
  public data = [];


  constructor(private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private periodoService: AperturaService,
    private validarModuloService: ValidarModuloService
  ) { }

  habilitarHoras() {
    if (this.form.lunes) {
      this.habilitarHoraLunes = false;
      this.habilitarMaterias = false;
      this.Jarwis.hora(this.form.control, 1).subscribe(
        data => {
          this.form.lunes = 'Lunes';
          this.borraHora2(data, 1);
          //console.log(data);
        },
        error => this.handleError(error)
      );
    } else {
      this.habilitarHoraLunes = true;
    }
    if (this.form.martes) {
      this.habilitarHoraMartes = false;
      this.habilitarMaterias = false;
      this.Jarwis.hora(this.form.control, 2).subscribe(
        data => {
          this.form.martes = 'Martes';
          this.borraHora2(data, 2);
          // console.log(data);
        },
        error => this.handleError(error)
      );
    } else {
      this.habilitarHoraMartes = true;
    }
    if (this.form.miercoles) {
      this.habilitarMaterias = false;
      this.habilitarHoraMiercoles = false;
      this.Jarwis.hora(this.form.control, 3).subscribe(
        data => {
          this.form.miercoles = 'Miercoles';
          this.borraHora2(data, 3);
          //console.log(data);
        },
        error => this.handleError(error)
      );
    } else {
      this.habilitarHoraMiercoles = true;
    }
    if (this.form.jueves) {
      this.habilitarMaterias = false;
      this.habilitarHoraJueves = false;
      this.Jarwis.hora(this.form.control, 4).subscribe(
        data => {
          this.form.jueves = 'Jueves';
          this.borraHora2(data, 4);
          // console.log(data);
        },
        error => this.handleError(error)
      );
    } else {
      this.habilitarHoraJueves = true;
    }
    if (this.form.viernes) {
      this.habilitarMaterias = false;
      this.habilitarHoraViernes = false;
      this.Jarwis.hora(this.form.control, 5).subscribe(
        data => {
          this.form.viernes = 'Viernes';
          this.borraHora2(data, 5);
          // console.log(data);
        },
        error => this.handleError(error)
      );
    } else {
      this.habilitarHoraViernes = true;
    }
  }

 borraHora2(Horarios, diaNum) {
    if (this.form.control) {
      this.levels = new Array('7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21');      
      this.levels1 = new Array('7:00-8:40', '8:45-10:25', '10:30-12:10', '12:15-13:55', '14:05-15:45', '15:50-17:30', '17:35-19:15', '19:20-21:00');
      var horarios2 = [];
      for (var dia in Horarios) {
        horarios2.push(Horarios[dia].HoraInicial + "-" + Horarios[dia].HoraFinal);
      }
      if (horarios2.indexOf('7-8') != -1) {
        var index = this.levels.indexOf('7-8');
        this.levels.splice(index, 1);
        var index = this.levels1.indexOf('7:00-8:40');
        this.levels1.splice(index, 1);

      } else {
      }
      if (horarios2.indexOf('8-10') != -1) {
        var index = this.levels.indexOf('8-9');
        this.levels.splice(index, 2);
        var index = this.levels1.indexOf('8:45-10:25');
        this.levels1.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('10-12') != -1) {
        var index = this.levels.indexOf('10-11');
        this.levels.splice(index, 2);
        var index = this.levels1.indexOf('10:30-12:10');
        this.levels1.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('12-13') != -1) {
        var index = this.levels.indexOf('12-13');
        this.levels.splice(index, 2);
        var index = this.levels1.indexOf('12:15-13:55');
        this.levels1.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('7-7') != -1) {
        var index = this.levels.indexOf('7-8');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('8-9') != -1) {
        var index = this.levels.indexOf('8-9');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('9-10') != -1) {
        var index = this.levels.indexOf('9-10');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('10-11') != -1) {
        var index = this.levels.indexOf('10-11');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('11-12') != -1) {
        var index = this.levels.indexOf('11-12');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('13-13') != -1) {
        var index = this.levels.indexOf('13-14');
        this.levels.splice(index, 1);
      } else {
      }
      //tarde 
      if (horarios2.indexOf('14-15') != -1) {
        var index = this.levels.indexOf('14-15');
        this.levels.splice(index, 1);
        var index = this.levels1.indexOf('14:05-15:45');
        this.levels1.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('15-17') != -1) {
        var index = this.levels.indexOf('15-16');
        this.levels.splice(index, 2);
        var index = this.levels1.indexOf('15:50-17:30');
        this.levels1.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('17-19') != -1) {
        var index = this.levels.indexOf('17-18');
        this.levels.splice(index, 2);
        var index = this.levels1.indexOf('17:35-19:15');
        this.levels1.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('19-21') != -1) {
        var index = this.levels.indexOf('19-20');
        this.levels.splice(index, 2);
        var index = this.levels1.indexOf('19:20-21:00');
        this.levels1.splice(index, 1);
      } else {
      }
      //viernes tarde
      if (horarios2.indexOf('14-14') != -1) {
        var index = this.levels.indexOf('14-15');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('15-16') != -1) {
        var index = this.levels.indexOf('15-16');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('16-17') != -1) {
        var index = this.levels.indexOf('16-17');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('17-18') != -1) {
        var index = this.levels.indexOf('17-18');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('18-19') != -1) {
        var index = this.levels.indexOf('18-19');
        this.levels.splice(index, 2);
      } else {
      }
      if (horarios2.indexOf('19-20') != -1) {
        var index = this.levels.indexOf('19-20');
        this.levels.splice(index, 2);
      } else {
      }
      if (horarios2.indexOf('20-21') != -1) {
        var index = this.levels.indexOf('20-21');
        this.levels.splice(index, 2);
      } else {
      }
      //Materias= [];
      this.Jarwis.MateriAsesor(this.form.control).subscribe(
        Materias => {
          //Materias = data;
          this.materias2 = [];
          for (var num in Materias) {
            this.materias2.push(Materias[num].Nombre);
          }
        },
        error => this.handleError(error)
      );
    }
    switch (diaNum) {
      case 1: this.horariosLunes = this.levels1;
        break;
      case 2: this.horariosMartes = this.levels1;
        break;
      case 3: this.horariosMiercoles = this.levels1;
        break;
      case 4: this.horariosJueves = this.levels1;
        break;
      case 5: this.horariosViernes = this.levels;
        break;
    }
  }

  onSubmit() {
    if (this.form.levelNum != '0') {
      this.form.dia = 'Lunes';
      this.form.hora = this.form.levelNum;
      //console.log(this.form.dia)
      //console.log(this.form.hora)
      this.Jarwis.solicitudAsesor(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    if (this.form.levelNum1 != '0') {
      this.form.dia = 'Martes';
      this.form.hora = this.form.levelNum1;
      //console.log(this.form.dia)
      //console.log(this.form.hora)
      this.Jarwis.solicitudAsesor(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    if (this.form.levelNum2 != '0') {
      this.form.dia = 'Miercoles';
      this.form.hora = this.form.levelNum2;
      //console.log(this.form.dia)
      //console.log(this.form.hora)
      this.Jarwis.solicitudAsesor(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    if (this.form.levelNum3 != '0') {
      this.form.dia = 'Jueves';
      this.form.hora = this.form.levelNum3;
      //console.log(this.form.dia)
      //console.log(this.form.hora)
      this.Jarwis.solicitudAsesor(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    if (this.form.levelNum4 != '0') {
      //console.log(this.form.levelNum)
      //console.log(this.form.levelNum1)
      //console.log(this.form.levelNum2)
      //console.log(this.form.levelNum3)
      //console.log(this.form.levelNum4)

      this.form.dia = 'Viernes';
      this.form.hora = this.form.levelNum4;
      //console.log(this.form.dia)
      //console.log(this.form.hora)
      this.Jarwis.solicitudAsesor(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data) {
    this.data = data.data;
    console.log(this.data)
    this.form.lunes = null;
    this.form.martes = null;
    this.form.miercoles = null;
    this.form.jueves = null;
    this.form.viernes = null;
    this.form.levelNum = '0';
    this.form.levelNum1 = '0';
    this.form.levelNum2 = '0';
    this.form.levelNum3 = '0';
    this.form.levelNum4 = '0';
    this.form.dia = null;
    this.form.hora = null;
    this.form.materia = '0';
    this.habilitarHoraLunes = true;
    this.habilitarHoraMartes = true;
    this.habilitarHoraMiercoles = true;
    this.habilitarHoraJueves = true;
    this.habilitarHoraViernes = true;
    this.habilitarMaterias = true;

  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Solicitud asesor");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      this.fechaInicio = data[0].FECHA_INICIO;
      this.fechaFin = data[0].FECHA_FIN;
      this.fechaActual = data[0].FECHA_ACTUAL;
      this.compararFechas();
    });
    this.Jarwis.datos(this.form.id).subscribe(
      data => {
        //this.form.control = data[0].control
        this.form.apep = data[0].apep
        this.form.apem = data[0].apem
        this.form.name = data[0].name
        this.form.carrera = data[0].carrera
        this.form.email = data[0].email
        this.form.celular = data[0].celular
        this.form.semestre = data[0].semestre
      },
      error => this.handleError(error)
    );
    
    this.Jarwis.promedio(this.form.control).subscribe(
      data => {
        this.form.promedio = data;
      },
      error => this.handleError(error)
    );
  }

  compararFechas() {
    var fechaInicio = this.fechaInicio.split('-');
    var fechaFin = this.fechaFin.split('-');
    var fechaActual = this.fechaActual.split('-');
    var fechaInicio2 = new Date(fechaInicio[0], (fechaInicio[1] - 1), fechaInicio[2]);
    var fechaFin2 = new Date(fechaFin[0], (fechaFin[1] - 1), fechaFin[2]);
    var fechaActual2 = new Date(fechaActual[0], (fechaActual[1] - 1), fechaActual[2]);
    if (fechaActual2 >= fechaInicio2 && fechaActual2 <= fechaFin2) {
      console.log('La fecha esta en el rango');
      this.activado = true;
    } else {
      console.log('La fecha no esta en el rango');
    }
  }
}