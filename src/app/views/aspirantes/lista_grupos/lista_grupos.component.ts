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


  leerDatosParaExcel() {
    this.aspiranteService.getListaGrupos(this.periodo).subscribe(data => {
      this.grupos = data;
      if (data) {
        this.generarExcel();
      }
    });
  }

  generarExcel() {
    
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Lista grupos",
      Subject: "Lista examenes",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
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

    wb.SheetNames.push("Grupo "+this.grupos[grupo].PK_EXAMEN_ADMISION);
    var ws_data = aspirantes;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Grupo "+this.grupos[grupo].PK_EXAMEN_ADMISION] = ws;
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
  