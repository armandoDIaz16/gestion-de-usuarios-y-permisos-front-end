import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-habilitar-residentes',
  templateUrl: './habilitar_residentes.component.html',
  styleUrls: ['./habilitar_residentes.component.scss'],
  providers: [ValidarModuloService]
})
export class Habilitar_residentesComponent extends GenericServicesService implements OnInit {

    public mostrarModulo = false;
    nocontrol = this.nocontrol;
  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Habilitar residentes');
      if (!this.mostrarModulo) {
          return;
      }
  }

  habilitarAlumnos() {
      this.http.get(GenericServicesService.API_ENDPOINT + 'CreditosSiia', GenericServicesService.HEADERS).subscribe(
          (response) => {
              alert(response);
          }
      );
  }

  deshabilitarAlumnos() {
      this.http.get(GenericServicesService.API_ENDPOINT + 'CreditosSiia/1', GenericServicesService.HEADERS).subscribe(
          (response) => {
              alert(response);
          }
      );
  }

    bajaAlumnos() {
        this.http.get(GenericServicesService.API_ENDPOINT + 'BajaAlumnoR/' + this.nocontrol, GenericServicesService.HEADERS).subscribe(
            (response) => {
                alert(response);
            }
        );
    }
}
