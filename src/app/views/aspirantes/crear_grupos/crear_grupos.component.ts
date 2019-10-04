import { Component, OnInit } from '@angular/core';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { PeriodoService } from '../../../services/periodo.service';


@Component({
  selector: 'app-crear_grupos',
  templateUrl: './crear_grupos.component.html',
  styleUrls: ['./crear_grupos.component.scss'],
  providers: [LugarExamenService, ValidarModuloService, PeriodoService]
})
export class CrearGruposComponent implements OnInit {

  constructor(private lugarExamenService: LugarExamenService,
    private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService) {
  }
  public mostrarModulo = false;
  public dia = null;
  public hora = null;
  public dia2 = null;
  public hora2 = null;
  public edificio = null;
  public edificio2 = null;
  public grupo = null;
  public grupo2 = null;
  public tipoEspacio = null;
  public tipoEspacio2 = null;
  public espacio = null;
  public espacio2 = null;
  public espacio3 = null;
  public turno2 = null;
  public turno3 = null;
  public turno4 = null;
  public nombre = null;
  public nombre2 = null;
  public identificador = null;
  public identificador2 = null;
  public capacidad = null;
  public capacidad2 = null;
  public edificioLista = [];
  public grupoLista = [];
  public espacioLista = [];
  public tipoEspacioLista = [];
  public turno2Lista = [];
  tipoExamen = null;
  mostrarTipoExamen = null;


  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Crear grupos");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.tipoExamen = data[0].TIPO_APLICACION;
        if (this.tipoExamen == 1) {
          this.mostrarTipoExamen = true;
        } else {
          this.mostrarTipoExamen = false;
        }
      }
    });
    this.lugarExamenService.getEdificio().subscribe(data => this.edificioLista = data);
    this.lugarExamenService.getGrupo().subscribe(data => this.grupoLista = data);
    this.lugarExamenService.getTurno2().subscribe(data => this.turno2Lista = data);
    this.lugarExamenService.getEspacio().subscribe(data => this.espacioLista = data);
    this.lugarExamenService.getTipoEspacio().subscribe(data => this.tipoEspacioLista = data);
  }

  guardarTurno() {
    this.lugarExamenService.addTurnoExamen({
      "DIA": this.dia,
      "HORA": this.hora
    });
    setTimeout(() => {
      this.recargarEspacioTurno()
    }, 1000);
  }
  guardarEspacio() {
    this.lugarExamenService.addEspacioExamen({
      'FK_EDIFICIO': this.edificio,
      'FK_TIPO_ESPACIO': this.tipoEspacio,
      'NOMBRE': this.nombre,
      'IDENTIFICADOR': this.identificador,
      'CAPACIDAD': this.capacidad
    });
    setTimeout(() => {
      this.recargarEspacioTurno()
    }, 1000);
  }
  guardarGrupo() {
    this.lugarExamenService.addGrupoExamen({
      'FK_ESPACIO': this.espacio,
      'FK_TURNO': this.turno2
    });
  }
  recargarEspacioTurno() {
    this.lugarExamenService.getTurno2().subscribe(data => this.turno2Lista = data);
    this.lugarExamenService.getEspacio().subscribe(data => this.espacioLista = data);
  }
  recargarGrupo() {
    this.lugarExamenService.getGrupo().subscribe(data => this.grupoLista = data);
  }
  cargarTurno(PK) {
    //console.log(this.turno2Lista[PK-1]);
    this.dia2 = this.turno2Lista[PK - 1].DIA;
    this.hora2 = this.turno2Lista[PK - 1].HORA;
  }
  cargarEspacio(PK) {
    //console.log(this.espacioLista[PK-1]);

    //console.log(this.tipoEspacioLista[this.espacioLista[PK-1].PK_ESPACIO-1].PK_TIPO_ESPACIO);

    this.tipoEspacio2 = this.tipoEspacioLista[this.espacioLista[PK - 1].PK_ESPACIO - 1].PK_TIPO_ESPACIO;
    this.edificio2 = this.edificioLista[this.espacioLista[PK - 1].PK_ESPACIO - 1].PK_EDIFICIO;
    this.nombre2 = this.espacioLista[PK - 1].NOMBRE;
    this.identificador2 = this.espacioLista[PK - 1].IDENTIFICADOR;
    this.capacidad2 = this.espacioLista[PK - 1].CAPACIDAD;
  }
  cargarGrupo(PK) {
    //console.log(this.grupoLista[PK-1]);
    //console.log(this.grupoLista[PK-1].FK_ESPACIO);
    //console.log(this.grupoLista[PK-1].FK_TURNO);
    //console.log(this.espacioLista[this.grupoLista[PK-1].FK_ESPACIO-1]);
    //console.log(this.turno2Lista[this.grupoLista[PK-1].FK_TURNO-1]);
    this.espacio2 = this.espacioLista[this.grupoLista[PK - 1].FK_ESPACIO - 1].PK_ESPACIO;
    this.turno4 = this.turno2Lista[this.grupoLista[PK - 1].FK_TURNO - 1].PK_TURNO;
  }

  modificarTurno(PK) {
    this.lugarExamenService.updateTurnoExamen({
      'PK_TURNO': PK,
      'DIA': this.dia2,
      'HORA': this.hora2
    });
    setTimeout(() => {
      this.recargarEspacioTurno()
    }, 1000);
  }
  modificarEspacio(PK) {
    this.lugarExamenService.updateEspacioExamen({
      'PK_ESPACIO': PK,
      'FK_EDIFICIO': this.edificio2,
      'FK_TIPO_ESPACIO': this.tipoEspacio2,
      'NOMBRE': this.nombre2,
      'IDENTIFICADOR': this.identificador2,
      'CAPACIDAD': this.capacidad2
    });
    setTimeout(() => {
      this.recargarEspacioTurno()
    }, 1000);
  }
  modificarGrupo(PK) {
    this.lugarExamenService.updateGrupoExamen({
      'PK_EXAMEN_ADMISION': PK,
      'FK_ESPACIO': this.espacio2,
      'FK_TURNO': this.turno4
    });
    setTimeout(() => {
      this.recargarGrupo()
    }, 1000);
  }
}