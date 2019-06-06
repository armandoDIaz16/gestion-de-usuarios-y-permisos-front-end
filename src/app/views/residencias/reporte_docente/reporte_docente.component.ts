import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Alumnos} from './alumnos';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-reporte-docente',
  templateUrl: './reporte_docente.component.html',
  styleUrls: ['./reporte_docente.component.scss'],
  providers: [Alumnos]
})
export class Reporte_docenteComponent extends GenericServicesService implements OnInit {

    alumnosLista = [];
    ID = this.ID;
    usuario = sessionStorage.getItem('IdUsuario');
    opcion = this.opcion;
  constructor(private alumnosService: Alumnos, private http: HttpClient) { super(http); }

  ngOnInit() {
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
            this.http.post(GenericServicesService.API_ENDPOINT + 'Repdocente', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }
}
