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
  public mostrarGrupo = false;
  public gruposLista = [];
  public aspirantes = [];
  public periodo = null;
  public tipoAplicacion = null;
  public grupoEscrito = null;
  public grupo = null;

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Lista grupos");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
        this.tipoAplicacion = data[0].TIPO_APLICACION;
        if (data[0].TIPO_APLICACION == 1) {
          this.lugarExamenService.getGrupo(this.periodo).subscribe(data => this.gruposLista = data);
          this.mostrarGrupo = true;
        }
        else {
          this.lugarExamenService.getGrupoEscrito(this.periodo).subscribe(data => this.gruposLista = data);
          this.mostrarGrupo = false;
        }
      }
    });
  }

  cargarGrupo(grupo) {
    this.aspiranteService.getGrupos(this.periodo, grupo, this.tipoAplicacion).subscribe(data => this.aspirantes = data);

  }
  cargarGrupoEscrito(grupoEscrito) {
    this.aspiranteService.getGrupos(this.periodo, grupoEscrito, this.tipoAplicacion).subscribe(data => this.aspirantes = data);
  }
}
