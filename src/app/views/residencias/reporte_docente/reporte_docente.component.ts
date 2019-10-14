import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Alumnos} from './alumnos';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-reporte-docente',
  templateUrl: './reporte_docente.component.html',
  styleUrls: ['./reporte_docente.component.scss'],
  providers: [Alumnos, ValidarModuloService]
})
export class Reporte_docenteComponent extends GenericServicesService implements OnInit {

    alumnosLista = [];
    ID = this.ID;
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = this.opcion;
    public mostrarModulo = false;
    public sistema = 'Residencias';
  constructor(private alumnosService: Alumnos, private http: HttpClient,
              private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Reporte docente');
      if (!this.mostrarModulo) {
          return;
      }
      this.alumnosService.getAnteproyectos(this.usuario).subscribe( data => this.alumnosLista = data);
  }
    uploadFile(event) {
        const archivo: File = event.target.files[0];
        if (!archivo) {
            return;
        }
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.subirArchivo({'Sistema': this.sistema,
                'Nombre': archivo.name.split('.').shift(),
                'Extencion': archivo.name.split('.').pop(),
                'Archivo': myReader.result,
                'ID': this.ID,
                'id': this.usuario,
                'alumno': this.opcion});
        };
        myReader.readAsDataURL(archivo);
/*        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('ID', this.ID);
            formData.append('id', this.usuario);
            formData.append('alumno', this.opcion);
            this.http.post(GenericServicesService.API_ENDPOINT + 'Repdocente', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                });
        }
        elem.value = ''; // line 9*/

    }

    subirArchivo(datos) {
        this.http.post(GenericServicesService.API_ENDPOINT + 'Repdocente', datos, GenericServicesService.HEADERS).subscribe(
            (response) => {
                alert(response);
            });
    }
}
