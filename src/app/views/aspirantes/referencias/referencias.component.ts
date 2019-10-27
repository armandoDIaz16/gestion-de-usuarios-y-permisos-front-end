import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';



@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss'],
  providers: [PeriodoService, ValidarModuloService]
})
export class ReferenciasComponent implements OnInit {
  constructor(private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService) {
  }

  @ViewChild('loaderModal') loaderModal;
  public mostrarModulo = false;
  public idPeriodo = null;
  public aspirantes = [];
  public personaUno = null;
  public aplicacionUno = null;
  public conceptoUno = null;
  public personaCero = null;
  public aplicacionCero = null;
  public conceptoCero = null;

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Referencias");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.idPeriodo = data[0].PK_PERIODO_PREFICHAS;
        this.personaUno = data[0].TIPO_PERSONA_SEMESTRE_UNO;
        this.aplicacionUno = data[0].APLICACION_SIIA_SEMESTRE_UNO;
        this.conceptoUno = data[0].CONCEPTO_SEMESTRE_UNO;
        this.personaCero = data[0].TIPO_PERSONA_SEMESTRE_CERO;
        this.aplicacionCero = data[0].APLICACION_SIIA_SEMESTRE_CERO;
        this.conceptoCero = data[0].CONCEPTO_SEMESTRE_CERO;
      }
    });
  }

  async onSubmitReferencias() {
    this.loaderModal.show();
    const data = await this.periodoService.modificarReferencias(
      {
        'PK_PERIODO_PREFICHAS': this.idPeriodo,
        'TIPO_PERSONA_SEMESTRE_UNO': this.personaUno,
        'TIPO_PERSONA_SEMESTRE_CERO': this.personaCero,
        'APLICACION_SIIA_SEMESTRE_UNO': this.aplicacionUno,
        'APLICACION_SIIA_SEMESTRE_CERO': this.aplicacionCero,
        'CONCEPTO_SEMESTRE_UNO': this.conceptoUno,
        'CONCEPTO_SEMESTRE_CERO': this.conceptoCero
      });
    if (data) {
      this.loaderModal.hide();
      //alert(data);
    }
  }
}
