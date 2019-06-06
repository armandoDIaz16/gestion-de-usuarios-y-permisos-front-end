import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-habilitar-residentes',
  templateUrl: './habilitar_residentes.component.html',
  styleUrls: ['./habilitar_residentes.component.scss']
})
export class Habilitar_residentesComponent extends GenericServicesService implements OnInit {
    nocontrol = this.nocontrol;
  constructor(private http: HttpClient) { super(http); }

  ngOnInit() {
  }

  habilitarAlumnos() {
      this.http.get(GenericServicesService.API_ENDPOINT + 'CreditosSiia', GenericServicesService.HEADERS).subscribe(
          (response) => {
              console.log(response);
          }
      );
  }

  deshabilitarAlumnos() {
      this.http.get(GenericServicesService.API_ENDPOINT + 'CreditosSiia/1', GenericServicesService.HEADERS).subscribe(
          (response) => {
              console.log(response);
          }
      );
  }

    bajaAlumnos() {
        this.http.get(GenericServicesService.API_ENDPOINT + 'BajaAlumnoR/' + this.nocontrol, GenericServicesService.HEADERS).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
}
