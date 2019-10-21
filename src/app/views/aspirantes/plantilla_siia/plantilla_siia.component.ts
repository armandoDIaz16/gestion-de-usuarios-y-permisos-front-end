import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { GenericServicesService } from '../../../services/generic-services.service';
import { HttpClient } from '@angular/common/http';
import { AspiranteService } from '../../../services/aspirante.service';



@Component({
  selector: 'app-plantilla_siia',
  templateUrl: './plantilla_siia.component.html',
  styleUrls: ['./plantilla_siia.component.scss'],
  providers: [PeriodoService, ValidarModuloService, AspiranteService]
})
export class PlantillaSIIAComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient,
    private aspiranteService: AspiranteService,
    private validarModuloService: ValidarModuloService,
    private periodoService: PeriodoService) {
    super(http);
  }

  private baseUrl = GenericServicesService.API_ENDPOINT;
  private baseUrlFile = GenericServicesService.ENDPOINT;
  private headers = GenericServicesService.HEADERS;
  public mostrarModulo = false;
  public aspirantes = [];
  public periodo = null;
  habilitarPlantilla = false;

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Plantilla SIIA");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
        if (data[0].RESULTADOS==1) {
          this.habilitarPlantilla = true;

        }
      }
    });
  }
  generarLista() {
    this.aspiranteService.getPlantillaSIIA(this.periodo).subscribe(data => {
      window.open(this.baseUrlFile + data,"_self");
    });
  }
}
