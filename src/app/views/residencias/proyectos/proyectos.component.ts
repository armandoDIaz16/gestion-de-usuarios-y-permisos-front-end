import { Component, OnInit } from '@angular/core';
import {AnteproyectosSeleccion} from './anteproyectosProyectos';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
    providers: [AnteproyectosSeleccion]
})
export class ProyectosComponent extends GenericServicesService implements OnInit {

    public anteproyectosLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    ID = this.ID;

  constructor(private anteproyectosService: AnteproyectosSeleccion, private http: HttpClient) { super(http); }

  ngOnInit() {
    this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
  }

    updateProyect(id) {
        this.http.put(GenericServicesService.API_ENDPOINT + 'Anteproyecto/' + id, {'Cancelar': 'valido'},
            GenericServicesService.HEADERS).subscribe((response) => {
            console.log(response);
        });
    }
    uploadFile(event) {
    let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('ID', this.ID);
            formData.append('id', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'Reporte', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }

    uploadFile2(event) {
        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('id', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'anteproyecto2', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }

    uploadFile3(event) {
        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('FK_ALUMNO', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'Informe', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }

    uploadFile4(event) {
        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('FK_ALUMNO', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'CartaFinalR', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }
}
