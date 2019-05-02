import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { AperturaService } from '../../../services/apertura.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
//import * as $ from 'jquery';

let Horarios;
let Horarios1;
let Horarios2;
let Horarios3;
let Horarios4;
let Horarios5;
@Component({
  selector: 'app-form_alumno',
  templateUrl: './form_alumno.component.html',
  styleUrls: ['./form_alumno.component.scss'],
  providers: [AperturaService]
})

export class Form_alumnoComponent implements OnInit {
  activado = false;
  fechaInicio = null;
  fechaFin = null;
  fechaActual = null;
  levels = [];
  real = 0;
  periodo = 0;
  carreras = ['ISC','LOX','LAI','IIX','IN2','MC4','IN4','DC1','II','II4','MC2','IME','EM2','IS4','IS1','IEM','TC2','EMX', 
    'MCC','EL4','SCA','GE9','TA2','IIP','ISX','LAV','GEV','MC1','TIX','EM1','IE1','IIV','MCX','EM5','LA4','INF','MC3','LO8', 
    'IE2','IA','TIV','IS2','EMV','LA1','ELX','II2']






  //Arreglos horarios
  Dia = [];
  HoraInicial = [];
  HoraFinal = [];
  MinutoInicial = [];
  MinutoFinal = [];

  public data = [];

  public form = {
    email: null,
    //name:null,
    name: null,/* localStorage.getItem("nombre"), */
    password: null,
    password_confirmation: null,
    curp: null,
    control: null,
    apep: null,
    apem: null,
    carrera: 0,
    celular: null,
    dia: null,
    lunes: null,
    martes: null,
    miercoles: null,
    jueves: null,
    viernes: null,
    checar: null,
    inicio: null,
    fin: null,
    levelNum: '0',
    levelNum1: '0',
    levelNum2: '0',
    anio: null,
    semestre: null,


  };

  toNumber() {
    //this.levelNum = +this.levelNum;
    console.log(this.form.levelNum + ' no se que sea');
  }
  public error = [];

  constructor(private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private periodoService: AperturaService,
  ) { }

  onSubmit() {
    alert(this.form.dia)
  }


  ngOnInit() {
    this.periodoService.getPeriodo().subscribe(data => {
      this.fechaInicio = data[0].FECHA_INICIO;
      this.fechaFin = data[0].FECHA_FIN;
      this.fechaActual = data[0].FECHA_ACTUAL;
      this.compararFechas();
    });
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

  ver() {
    Horarios = [];
    Horarios1 = [];
    Horarios2 = [];
    Horarios3 = [];
    Horarios4 = [];
    Horarios5 = [];
    if (this.form.lunes) {
      this.Jarwis.hora(this.form.control, 1).subscribe(
        data => {
          Horarios1 = data;
          this.compararHorarios();
          // this.borraHora();
        },
        error => this.handleError(error)
      );
    } if (this.form.martes) {
      this.Jarwis.hora(this.form.control, 2).subscribe(
        data => {
          Horarios2 = data;
          this.compararHorarios();
          // this.borraHora();
        },
        error => this.handleError(error)
      );
    } if (this.form.miercoles) {
      this.Jarwis.hora(this.form.control, 3).subscribe(
        data => {
          Horarios3 = data;
          this.compararHorarios();
          //this.borraHora();
        },
        error => this.handleError(error)
      );
    } if (this.form.jueves) {
      this.Jarwis.hora(this.form.control, 4).subscribe(
        data => {
          Horarios4 = data;
          this.compararHorarios();
          //this.borraHora();
        },
        error => this.handleError(error)
      );
    } if (this.form.viernes) {
      this.Jarwis.hora(this.form.control, 5).subscribe(
        data => {
          Horarios5 = data;
          this.compararHorarios();
          //this.borraHora();
        },
        error => this.handleError(error)
      );
    }
  }

  habilitar() {
    this.real = 0;
    this.levels = [];
    if (this.form.lunes) {
      this.real = 1;
    }
    if (this.form.martes) {
      this.real = 1;
    }
    if (this.form.miercoles) {
      this.real = 1;
    }
    if (this.form.jueves) {
      this.real = 1;
    }
    if (this.form.viernes) {
      this.real = 1;
    }
  }

  compararHorarios() {
    Horarios = (Horarios1.concat(Horarios2.concat(Horarios3.concat(Horarios4.concat(Horarios5)))));
  }

  borraHora() {
    if (this.real == 1 && this.form.control) {
      this.levels = new Array('7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21');
      var horarios2 = [];
      for (var dia in Horarios) {
        horarios2.push(Horarios[dia].HoraInicial + "-" + Horarios[dia].HoraFinal);
      }
      if (horarios2.indexOf('7-8') != -1) {
        var index = this.levels.indexOf('7-8');
        this.levels.splice(index, 1);
      } else {
      }
      if (horarios2.indexOf('8-10') != -1) {
        var index = this.levels.indexOf('8-9');
        this.levels.splice(index, 2);
      } else {
      }
      if (horarios2.indexOf('10-12') != -1) {
        var index = this.levels.indexOf('10-11');
        this.levels.splice(index, 2);
      } else {
      }
      if (horarios2.indexOf('12-13') != -1) {
        var index = this.levels.indexOf('12-13');
        this.levels.splice(index, 2);
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
      } else {
      }
      if (horarios2.indexOf('15-17') != -1) {
        var index = this.levels.indexOf('15-16');
        this.levels.splice(index, 2);
      } else {
      }
      if (horarios2.indexOf('17-19') != -1) {
        var index = this.levels.indexOf('17-18');
        this.levels.splice(index, 2);
      } else {
      }
      if (horarios2.indexOf('19-21') != -1) {
        var index = this.levels.indexOf('19-20');
        this.levels.splice(index, 2);
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
    }
  }


  handleResponse(data) {
    this.data = data.data;
    console.log(this.data)
  }

  handleError(error) {
    this.error = error.error.error;
  }


}