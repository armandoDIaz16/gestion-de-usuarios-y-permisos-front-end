import { Component, OnInit, ViewChild } from '@angular/core';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { PeriodoService } from '../../../services/periodo.service';
import { FormularioService } from '../../../services/formulario.service';
import { AspiranteService } from '../../../services/aspirante.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-examen_ubicacion',
  templateUrl: './examen_ubicacion.component.html',
  styleUrls: ['./examen_ubicacion.component.scss'],
  providers: [LugarExamenService, ValidarModuloService, PeriodoService, FormularioService,AspiranteService]
})
export class ExamenUbicacionComponent implements OnInit {
  constructor(private lugarExamenService: LugarExamenService,
    private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService,
    private aspiranteService: AspiranteService) {
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

  public periodo = null;
  public grupos = [];

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Examen ubicación");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.pkPeriodo = data[0].PK_PERIODO_PREFICHAS;
        this.mostrarTipoExamen = true;
        this.lugarExamenService.getGrupoIngles(this.pkPeriodo).subscribe(data => this.grupoLista = data);
        this.lugarExamenService.getTurnoIngles(this.pkPeriodo).subscribe(data => this.turno2Lista = data);
        this.lugarExamenService.getEspacioIngles(this.pkPeriodo).subscribe(data => this.espacioLista = data);
        this.lugarExamenService.getTipoEspacio().subscribe(data => this.tipoEspacioLista = data);
        this.lugarExamenService.getEdificio().subscribe(data => this.edificioLista = data);        
      }
    });
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
      }
    });
  }

  async guardarTurno() {
    this.loaderModal.show();
    const data = await this.lugarExamenService.addTurnoExamenIngles({
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
    const data = await this.lugarExamenService.addEspacioExamenIngles({
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
    const data = await this.lugarExamenService.addGrupoExamenIngles({
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
    this.lugarExamenService.getTurnoIngles(this.pkPeriodo).subscribe(data => this.turno2Lista = data);
  }

  recargarEspacio() {
    this.lugarExamenService.getEspacioIngles(this.pkPeriodo).subscribe(data => this.espacioLista = data);
  }

  recargarGrupo() {
    this.lugarExamenService.getGrupoIngles(this.pkPeriodo).subscribe(data => this.grupoLista = data);
  }

  cargarTurno(PK) {
    //console.log(this.turno2Lista);
    for (var turno in this.turno2Lista) {
      if (this.turno2Lista[turno].PK_TURNO_INGLES == PK) {
        //console.log("--" + this.turno2Lista[turno].PK_TURNO)
        this.dia2 = this.turno2Lista[turno].DIA;
        this.hora2 = this.turno2Lista[turno].HORA;
      }
    }
  }

  cargarEspacio(PK) {
    //console.log(this.espacioLista)
    for (var espacio in this.espacioLista) {
      if (this.espacioLista[espacio].PK_ESPACIO_INGLES == PK) {
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
      if (this.grupoLista[grupo].PK_EXAMEN_ADMISION_INGLES == PK) {
        //console.log(this.grupoLista[grupo]);
        this.espacio2 = this.grupoLista[grupo].FK_ESPACIO_INGLES;
        this.turno4 = this.grupoLista[grupo].FK_TURNO_INGLES;
      }
    }
  }


  async modificarTurno(PK) {
    this.loaderModal.show();
    const data = await this.lugarExamenService.updateTurnoExamenIngles({
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
    const data = await this.lugarExamenService.updateEspacioExamenIngles({
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
    const data = await this.lugarExamenService.updateGrupoExamenIngles({
      'PK_EXAMEN_ADMISION_INGLES': PK,
      'FK_ESPACIO_INGLES': this.espacio2,
      'FK_TURNO_INGLES': this.turno4,
      "FK_PERIODO": this.pkPeriodo
    });
    if (data) {
      this.loaderModal.hide();
      this.recargarGrupo();
      alert(data);
    }
  } 

  async leerDatosParaExcelGrupos() {
    this.loaderModal.show();
    this.aspiranteService.getListaGruposIngles(this.periodo).subscribe(data => {
      this.grupos = data;
      if (data) {
        this.generarExcel();
      }
      this.loaderModal.hide();
    });
  }
  generarExcel() {

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Lista grupos",
      Subject: "Lista examenes",
      Author: "Tecnologico de leon",
      CreatedDate: new Date()
    };
    //console.log(this.grupos[0].GRUPO);

    //let nombreHoja = this.grupos[grupo].GRUPO;

    for (var grupo in this.grupos) {
      var aspirantes = [
        [this.grupos[grupo].GRUPO],
        [
          'PREFICHA',
          'NOMBRE',
          'ASISTENCIA'
        ]
      ];

      //console.log(this.grupos[grupo].GRUPO);
      for (var aspirante in this.grupos[grupo].ASPIRANTES) {
        //console.log(this.grupos[grupo].ASPIRANTES[aspirante].NOMBRE);
        aspirantes.push([
          this.grupos[grupo].ASPIRANTES[aspirante].PREFICHA,
          this.grupos[grupo].ASPIRANTES[aspirante].NOMBRE,
          0
        ]);
      }

      wb.SheetNames.push("Grupo " + this.grupos[grupo].NUMERO_GRUPO);
      var ws_data = aspirantes;
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Grupo " + this.grupos[grupo].NUMERO_GRUPO] = ws;
    }

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    var nombreArchivo = "Lista grupos.xlsx";
    XLSX.writeFile(wb, nombreArchivo);
  }
}