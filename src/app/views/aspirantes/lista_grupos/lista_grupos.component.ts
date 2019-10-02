import { Component, OnInit } from '@angular/core';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { AspiranteService } from '../../../services/aspirante.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { PeriodoService } from '../../../services/periodo.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-lista_grupos',
  templateUrl: './lista_grupos.component.html',
  styleUrls: ['./lista_grupos.component.scss'],
  providers: [LugarExamenService,
    AspiranteService, ValidarModuloService, PeriodoService]
})
export class ListaGruposComponent implements OnInit {
  constructor(private lugarExamenService: LugarExamenService,
    private aspiranteService: AspiranteService,
    private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService) {
  }

  public mostrarModulo = false;
  public espacioLista = [];
  public diaLista = [];
  public horaLista = [];
  public aspirantes = [];
  public espacio = null;
  public dia = null;
  public hora = null;
  public periodo = null;
  public grupos = [];

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Lista grupos");
    if (!this.mostrarModulo) {
      return;
    }
    this.lugarExamenService.getEspacio().subscribe(data => this.espacioLista = data);
    this.lugarExamenService.getTurno().subscribe(data => {
      this.diaLista = data[0].DIAS;
      this.horaLista = data[0].HORAS;
    });
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
      }
    });
  }

  generarLista() {
    this.aspiranteService.getGrupos(this.espacio, this.dia, this.hora, this.periodo).subscribe(data => this.aspirantes = data);
  }
}
