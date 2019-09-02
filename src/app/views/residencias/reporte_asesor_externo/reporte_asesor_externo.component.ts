import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Alumnos} from './alumnos';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-reporte-asesor-externo',
  templateUrl: './reporte_asesor_externo.component.html',
  styleUrls: ['./reporte_asesor_externo.component.scss'],
    providers: [Alumnos, ValidarModuloService]
})
export class Reporte_asesor_externoComponent extends GenericServicesService implements OnInit {

    alumnosLista = [];
    public mostrarModulo = false;
    ID = this.ID;
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = this.opcion;
  constructor(private alumnosService: Alumnos, private http: HttpClient,
              private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Reporte asesor externo');
      if (!this.mostrarModulo) {
          return;
      }
      this.alumnosService.getAnteproyectos(this.usuario).subscribe( data => this.alumnosLista = data);
  }

    uploadFile(event) {
        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('ID', this.ID);
            formData.append('id', this.usuario);
            formData.append('alumno', this.opcion);
            this.http.post(GenericServicesService.API_ENDPOINT + 'Repexterno', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                });
        }
        elem.value = ''; // line 9

    }
}
