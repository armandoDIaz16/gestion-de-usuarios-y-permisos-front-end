import { Component, OnInit } from '@angular/core';
import { AspiranteService } from '../../../services/aspirante.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { GenericServicesService } from '../../../services/generic-services.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AspiranteService, ValidarModuloService]
})
export class DashboardComponent extends GenericServicesService implements OnInit {
  private baseUrl = GenericServicesService.API_ENDPOINT;
  private headers = GenericServicesService.HEADERS;
  public mostrarModulo = false;
  public aspirante = [];
  public referencia = [];
  paso2 = null;
  paso3 = null;
  paso4 = null;
  habilitarReferencia = false;
  habilitarFicha = false;
  habilitarRegistro = false;
  habilitarAceptado = false;

  constructor(private http: HttpClient,
    private aspiranteService: AspiranteService,
    private validarModuloService: ValidarModuloService) {
    super(http);
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Dashboard");
    if (!this.mostrarModulo) {
      return;
    }
    this.aspiranteService.getAspirante().subscribe(data => {
      this.aspirante = data;
      //this.aspirante[0].PREFICHA = this.aspirante[0].PREFICHA.replace(/ /g, "")
      //this.aspiranteService.getReferencia(this.aspirante[0].PREFICHA).subscribe(data => this.referencia = data);
      if (this.aspirante[0].SEGUNDO_APELLIDO == null) {
        this.aspirante[0].SEGUNDO_APELLIDO = "";
      }
      switch (Number(this.aspirante[0].FK_ESTATUS)) {
        case 1: this.habilitarReferencia = true;
          break;
        case 2: this.paso2 = 'completed'; this.habilitarReferencia = false;
          break;
        case 3: this.paso2 = 'completed'; this.paso3 = 'completed'; this.habilitarReferencia = false; this.habilitarRegistro = true;
          break;
        case 4: this.paso2 = 'completed'; this.paso3 = 'completed'; this.paso4 = 'completed'; this.habilitarReferencia = false; this.habilitarFicha = true;
          break;
        case 5: this.paso2 = 'completed'; this.paso3 = 'completed'; this.paso4 = 'completed'; this.habilitarAceptado = true;
          break;
      }
    });
  } 
  generarReferencia() {
    window.open(this.baseUrl+"Referencia/" + sessionStorage.getItem('IdUsuario'));
  }
  generarFicha() {
    window.open(this.baseUrl+"Ficha/" + sessionStorage.getItem('IdUsuario'));
  }
}
