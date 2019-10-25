import { Component, OnInit, ViewChild } from '@angular/core';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { PeriodoService } from '../../../services/periodo.service';
import { FormularioService } from '../../../services/formulario.service';


@Component({
  selector: 'app-crear_grupos',
  templateUrl: './crear_grupos.component.html',
  styleUrls: ['./crear_grupos.component.scss'],
  providers: [LugarExamenService, ValidarModuloService, PeriodoService, FormularioService]
})
export class CrearGruposComponent implements OnInit {
  constructor(private lugarExamenService: LugarExamenService,
    private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService,
    private formularioService: FormularioService) {
  }
  @ViewChild('loaderModal') loaderModal;
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
  pkPeriodo = null;

  public carrera = null;
  public carreraLista = [];
  public diaEscrito = null;
  public horaEscrito = null;
  public turnoEscrito = null;
  public edificioEscrito = null;

  public grupoEscritoLista = [];
  public grupoEscrito = null;
  public carrera2 = null;
  public diaEscrito2 = null;
  public horaEscrito2 = null;
  public turnoEscrito2 = null;
  public edificioEscrito2 = null;
  public turnoEscrito3 = null;

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Crear grupos");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.tipoExamen = data[0].TIPO_APLICACION;
        this.pkPeriodo = data[0].PK_PERIODO_PREFICHAS;
        if (this.tipoExamen == 1) {
          this.mostrarTipoExamen = true;
          this.lugarExamenService.getEdificio().subscribe(data => this.edificioLista = data);
          this.lugarExamenService.getGrupo(this.pkPeriodo).subscribe(data => this.grupoLista = data);
          this.lugarExamenService.getTurno2(this.pkPeriodo).subscribe(data => this.turno2Lista = data);
          this.lugarExamenService.getEspacio(this.pkPeriodo).subscribe(data => this.espacioLista = data);
          this.lugarExamenService.getTipoEspacio().subscribe(data => this.tipoEspacioLista = data);
        } else {
          this.mostrarTipoExamen = false;
          this.lugarExamenService.getEdificio().subscribe(data => this.edificioLista = data);
          this.formularioService.getCarrera().subscribe(data => this.carreraLista = data);
          this.lugarExamenService.getTurnoEscrito(this.pkPeriodo).subscribe(data => this.turno2Lista = data);
          this.lugarExamenService.getGrupoEscrito(this.pkPeriodo).subscribe(data => this.grupoEscritoLista = data);
        }
      }
    });
  }

  async guardarTurno() {
    this.loaderModal.show();
    const data = await this.lugarExamenService.addTurnoExamen({
      "DIA": this.dia,
      "HORA": this.hora,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarTurno();
      alert(data);
    }
  }

  async guardarEspacio() {
    this.loaderModal.show();
    const data = await this.lugarExamenService.addEspacioExamen({
      'FK_EDIFICIO': this.edificio,
      'FK_TIPO_ESPACIO': this.tipoEspacio,
      'NOMBRE': this.nombre,
      'IDENTIFICADOR': this.identificador,
      'CAPACIDAD': this.capacidad,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarEspacio();
      alert(data);
    }
  }

  async guardarGrupo() {
    this.loaderModal.show();
    const data = await this.lugarExamenService.addGrupoExamen({
      'FK_ESPACIO': this.espacio,
      'FK_TURNO': this.turno2,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarGrupo();
      alert(data);
    }
  }




  recargarTurno() {
    this.lugarExamenService.getTurno2(this.pkPeriodo).subscribe(data => this.turno2Lista = data);
  }

  recargarEspacio() {
    this.lugarExamenService.getEspacio(this.pkPeriodo).subscribe(data => this.espacioLista = data);
  }

  recargarGrupo() {
    this.lugarExamenService.getGrupo(this.pkPeriodo).subscribe(data => this.grupoLista = data);
  } 
  
  cargarTurno(PK) {
    //console.log(this.turno2Lista);
    for (var turno in this.turno2Lista) {
      if (this.turno2Lista[turno].PK_TURNO == PK) {
        //console.log("--" + this.turno2Lista[turno].PK_TURNO)
        this.dia2 = this.turno2Lista[turno].DIA;
        this.hora2 = this.turno2Lista[turno].HORA;
      }
    }
  }

  cargarEspacio(PK) {
    //console.log(this.espacioLista)
    for (var espacio in this.espacioLista) {
      if (this.espacioLista[espacio].PK_ESPACIO == PK) {
        //console.log(this.espacioLista[espacio]);
        this.tipoEspacio2 = this.espacioLista[espacio].FK_TIPO_ESPACIO;
        this.edificio2 = this.espacioLista[espacio].FK_EDIFICIO;
        this.nombre2 = this.espacioLista[espacio].NOMBRE;
        this.identificador2 = this.espacioLista[espacio].IDENTIFICADOR;
        this.capacidad2 = this.espacioLista[espacio].CAPACIDAD;
      }
    }
  }

  cargarGrupo(PK) {
    //console.log(this.grupoLista);
    for (var grupo in this.grupoLista) {
      if (this.grupoLista[grupo].PK_EXAMEN_ADMISION == PK) {
        //console.log(this.grupoLista[grupo]);
        this.espacio2 = this.grupoLista[grupo].FK_ESPACIO;
        this.turno4 = this.grupoLista[grupo].FK_TURNO;
      }
    }
  }


  async modificarTurno(PK) {
    this.loaderModal.show();
    const data = await this.lugarExamenService.updateTurnoExamen({
      'PK_TURNO': PK,
      'DIA': this.dia2,
      'HORA': this.hora2,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarTurno();
      alert(data);
    }
  }

  async modificarEspacio(PK) {
    this.loaderModal.show();
    const data = await this.lugarExamenService.updateEspacioExamen({
      'PK_ESPACIO': PK,
      'FK_EDIFICIO': this.edificio2,
      'FK_TIPO_ESPACIO': this.tipoEspacio2,
      'NOMBRE': this.nombre2,
      'IDENTIFICADOR': this.identificador2,
      'CAPACIDAD': this.capacidad2,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarEspacio();
      alert(data);
    }
  }

  async modificarGrupo(PK) {
    this.loaderModal.show();
    const data = await this.lugarExamenService.updateGrupoExamen({
      'PK_EXAMEN_ADMISION': PK,
      'FK_ESPACIO': this.espacio2,
      'FK_TURNO': this.turno4,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarGrupo();
      alert(data);
    }
  }

  async guardarGrupoEscrito() {
    this.loaderModal.show();
    const data = await this.lugarExamenService.addGrupoExamenEscrito({
      'FK_CARRERA': this.carrera,
      'FK_EDIFICIO': this.edificioEscrito,
      'FK_TURNO_ESCRITO': this.turnoEscrito,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarGrupoEscrito();
      alert(data);
    }
  }

  async modificarTurnoEscrito(PK) {
    this.loaderModal.show();
    const data = await this.lugarExamenService.updateTurnoExamenEscrito({
      'PK_TURNO_ESCRITO': PK,
      'DIA': this.diaEscrito2,
      'HORA': this.horaEscrito2,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarTurnoEscrito();
      alert(data);
    }
  }

  async modificarGrupoEscrito(PK) {
    this.loaderModal.show();
    const data = await this.lugarExamenService.updateGrupoExamenEscrito({
      'PK_EXAMEN_ADMISION_ESCRITO': PK,
      'FK_CARRERA': this.carrera2,
      'FK_EDIFICIO': this.edificioEscrito2,
      'FK_TURNO_ESCRITO': this.turnoEscrito3,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarGrupoEscrito();
      alert(data);
    }
  }

  cargarTurnoEscrito(PK) {
    //console.log(this.turno2Lista);
    for (var turno in this.turno2Lista) {
      if (this.turno2Lista[turno].PK_TURNO_ESCRITO == PK) {
        //console.log("--" + this.turno2Lista[turno].PK_TURNO)
        this.diaEscrito2 = this.turno2Lista[turno].DIA;
        this.horaEscrito2 = this.turno2Lista[turno].HORA;
      }
    }
  }

  cargarGrupoEscrito(PK) {
    //console.log(this.grupoLista);
    for (var grupo in this.grupoEscritoLista) {
      if (this.grupoEscritoLista[grupo].PK_EXAMEN_ADMISION_ESCRITO == PK) {
        //console.log(this.grupoEscritoLista[grupo]);
        this.carrera2 = this.grupoEscritoLista[grupo].FK_CARRERA;
        this.edificioEscrito2 = this.grupoEscritoLista[grupo].FK_EDIFICIO;
        this.turnoEscrito3 = this.grupoEscritoLista[grupo].FK_TURNO_ESCRITO;
      }
    }
  }
  async guardarTurnoEscrito() {
    this.loaderModal.show();
    const data = await this.lugarExamenService.addTurnoExamenEscrito({
      "DIA": this.diaEscrito,
      "HORA": this.horaEscrito,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarTurnoEscrito();
      alert(data);
    }
  }
  recargarGrupoEscrito() {
    this.lugarExamenService.getGrupoEscrito(this.pkPeriodo).subscribe(data => this.grupoEscritoLista = data);
  }  
  recargarTurnoEscrito() {
    this.lugarExamenService.getTurnoEscrito(this.pkPeriodo).subscribe(data => this.turno2Lista = data);
  }
}