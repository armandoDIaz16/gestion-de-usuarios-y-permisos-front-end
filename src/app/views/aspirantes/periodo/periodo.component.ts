import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
  providers: [PeriodoService, ValidarModuloService]
})

export class PeriodoComponent implements OnInit {
  public mostrarModulo = false;
  idPeriodo = null;
  fechaInicio = null;
  fechaFin = null;
  fechaActual = null;
  montoPreficha = null;
  fechaInicioCurso = null;
  fechaFinCurso = null;
  montoCurso = null;
  fechaInicioInscripcion = null;
  fechaFinInscripcion = null;
  montoInscripcion = null;
  fechaInicioInscripcionBis = null;
  fechaFinInscripcionBis = null;
  montoInscripcionBis = null;


  constructor(
    private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService
  ) { }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Periodo");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.idPeriodo = data[0].PK_PERIODO_PREFICHAS;
        this.fechaInicio = data[0].FECHA_INICIO;
        this.fechaFin = data[0].FECHA_FIN;
        this.fechaActual = data[0].FECHA_ACTUAL;
        this.montoPreficha = data[0].MONTO_PREFICHA;
        this.fechaInicioCurso = data[0].FECHA_INICIO_CURSO;
        this.fechaFinCurso = data[0].FECHA_FIN_CURSO;
        this.montoCurso = data[0].MONTO_CURSO;
        this.fechaInicioInscripcion = data[0].FECHA_INICIO_INSCRIPCION;
        this.fechaFinInscripcion = data[0].FECHA_FIN_INSCRIPCION;
        this.montoInscripcion = data[0].MONTO_INSCRIPCION;
        this.fechaInicioInscripcionBis = data[0].FECHA_INICIO_INSCRIPCION_BIS;
        this.fechaFinInscripcionBis = data[0].FECHA_FIN_INSCRIPCION_BIS;
        this.montoInscripcionBis = data[0].MONTO_INSCRIPCION_BIS;
        var fechaInicio = this.fechaInicio.split('-');
        var fechaFin = this.fechaFin.split('-');
        var fechaActual = this.fechaActual.split('-');
        if (fechaInicio[0] == fechaActual[0] && fechaFin[0] == fechaActual[0]) {
        } else {
          this.idPeriodo = null;
          this.fechaInicio = null;
          this.fechaFin = null;
          this.montoPreficha = null;
          this.fechaInicioCurso = null;
          this.fechaFinCurso = null;
          this.montoCurso = null;
          this.fechaInicioInscripcion = null;
          this.fechaFinInscripcion = null;
          this.montoInscripcion = null;
          this.fechaInicioInscripcionBis = null;
          this.fechaFinInscripcionBis = null;
          this.montoInscripcionBis = null;
        }
      }
    });
  }

  vaciarFechaFin(fInicio, fFin, tipo) {
    if (fInicio) {
      if (this.compararFechas(fInicio, fFin)) {
        alert("La fecha final debe ser posterior a la fecha de inicio");
        switch (tipo) {
          case 1: this.fechaFin = null;
            break;
          case 2: this.fechaFinCurso = null;
            break;
          case 3: this.fechaFinInscripcion = null;
            break;
        }
      }
    } else {
      alert("Inserta primero la fecha de inicio");
      switch (tipo) {
        case 1: this.fechaFin = null;
          break;
        case 2: this.fechaFinCurso = null;
          break;
        case 3: this.fechaFinInscripcion = null;
          break;
      }
    }
  }

  validarFechas(fInicio, fFin, tipo) {
    if (fFin) {
      if (this.compararFechas(fInicio, fFin)) {
        alert("La fecha final debe ser posterior a la fecha de inicio");
        switch (tipo) {
          case 1: this.fechaFin = null;
            break;
          case 2: this.fechaFinCurso = null;
            break;
          case 3: this.fechaFinInscripcion = null;
            break;
        }
      }
    }
  }

  compararFechas(fInicio, fFin) {
    var fechaInicio = fInicio.split('-');
    var fechaFin = fFin.split('-');
    var dateStart = new Date(fechaInicio[0], (fechaInicio[1] - 1), fechaInicio[2]);
    var dateEnd = new Date(fechaFin[0], (fechaFin[1] - 1), fechaFin[2]);
    if (dateStart.getTime() === dateEnd.getTime()) {
      return false;
    } else if (dateStart >= dateEnd) {
      return true;
    }
  }

  onSubmitFechaFichas() {
    if (this.idPeriodo) {
      this.periodoService.addPeriodo(
        {
          "PK_PERIODO_PREFICHAS": this.idPeriodo,
          "FECHA_INICIO": this.fechaInicio,
          "FECHA_FIN": this.fechaFin,

        });
      //console.log("Modificacion");
    } else {
      this.periodoService.addPeriodo({
        "FECHA_INICIO": this.fechaInicio,
        "FECHA_FIN": this.fechaFin,
        "FK_USUARIO_REGISTRO": sessionStorage.getItem('IdUsuario')
      });
      //Corregir con promise
      setTimeout(() => {
        this.periodoService.getPeriodo().subscribe(data => {
          this.idPeriodo = data[0].PK_PERIODO_PREFICHAS;
          this.fechaInicio = data[0].FECHA_INICIO;
          this.fechaFin = data[0].FECHA_FIN;
          this.fechaActual = data[0].FECHA_ACTUAL;
          this.montoPreficha = data[0].MONTO_PREFICHA;
          this.fechaInicioCurso = data[0].FECHA_INICIO_CURSO;
          this.fechaFinCurso = data[0].FECHA_FIN_CURSO;
          this.montoCurso = data[0].MONTO_CURSO;
          this.fechaInicioInscripcion = data[0].FECHA_INICIO_INSCRIPCION;
          this.fechaFinInscripcion = data[0].FECHA_FIN_INSCRIPCION;
          this.montoInscripcion = data[0].MONTO_INSCRIPCION;
          this.fechaInicioInscripcionBis = data[0].FECHA_INICIO_INSCRIPCION_BIS;
          this.fechaFinInscripcionBis = data[0].FECHA_FIN_INSCRIPCION_BIS;
          this.montoInscripcionBis = data[0].MONTO_INSCRIPCION_BIS;
        });
      }, 4000);
      //console.log("Insertar");       
    }
  }

  onSubmitFechaCurso() {
    if (this.idPeriodo) {
      this.periodoService.addPeriodoCurso(
        {
          "PK_PERIODO_PREFICHAS": this.idPeriodo,
          "FECHA_INICIO_CURSO": this.fechaInicioCurso,
          "FECHA_FIN_CURSO": this.fechaFinCurso,
        });
    }
  }

  onSubmitFechaInscripcion() {
    if (this.idPeriodo) {
      this.periodoService.addPeriodoInscripcion(
        {
          "PK_PERIODO_PREFICHAS": this.idPeriodo,
          "FECHA_INICIO_INSCRIPCION": this.fechaInicioInscripcion,
          "FECHA_FIN_INSCRIPCION": this.fechaFinInscripcion,
        });
    }
  }

  onSubmitMontoPreficha() {
    if (this.idPeriodo) {
      this.periodoService.addMontoPreficha(
        {
          "PK_PERIODO_PREFICHAS": this.idPeriodo,
          "MONTO_PREFICHA": this.montoPreficha
        });
    }
  }

  onSubmitMontoCurso() {
    if (this.idPeriodo) {
      this.periodoService.addMontoCurso(
        {
          "PK_PERIODO_PREFICHAS": this.idPeriodo,
          "MONTO_CURSO": this.montoCurso
        });
    }
  }

  onSubmitMontoInscripcion() {
    if (this.idPeriodo) {
      this.periodoService.addMontoInscripcion(
        {
          "PK_PERIODO_PREFICHAS": this.idPeriodo,
          "MONTO_INSCRIPCION": this.montoInscripcion
        });
    }
  }
}