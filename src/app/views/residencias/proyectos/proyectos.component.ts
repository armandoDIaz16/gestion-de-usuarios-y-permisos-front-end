import { Component, OnInit } from '@angular/core';
import {AnteproyectosSeleccion} from './anteproyectosProyectos';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
    providers: [AnteproyectosSeleccion, ValidarModuloService]
})
export class ProyectosComponent extends GenericServicesService implements OnInit {

    public anteproyectosLista = [];
    public mostrarModulo = false;
    public sistema = 'Residencias';
    usuario = sessionStorage.getItem('IdUsuario');
    ID = this.ID;

  constructor(private anteproyectosService: AnteproyectosSeleccion, private http: HttpClient,
              private validarModuloService: ValidarModuloService) { super(http); }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Proyectos');
      if (!this.mostrarModulo) {
          return;
      }
    this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
  }

    updateProyect(id) {
        this.http.put(GenericServicesService.API_ENDPOINT + 'Anteproyecto/' + id, {'Cancelar': 'valido'},
            GenericServicesService.HEADERS).subscribe((response) => {
            alert(response);
        });
    }
    uploadFile(event) {
        let archivo: File = event.target.files[0];
        if (!archivo) {
            return;
        }
        let myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.subirArchivo({'Sistema': this.sistema,
                'Nombre': archivo.name.split('.').shift(),
                'Extencion': archivo.name.split('.').pop(),
                'Archivo': myReader.result,
                'ID': this.ID,
                'id': this.usuario});
        };
        myReader.readAsDataURL(archivo);
/*    let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('ID', this.ID);
            formData.append('id', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'Reporte', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                });
        }
        elem.value = ''; // line 9*/

    }

    subirArchivo(datos) {
        this.http.post(GenericServicesService.API_ENDPOINT + 'Reporte', datos, GenericServicesService.HEADERS).subscribe(
            (response) => {
                alert(response);
            });
    }

    uploadFile2(event) {
        let archivo: File = event.target.files[0];
        if (!archivo) {
            return;
        }
        let myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.subirArchivo2({'Sistema': this.sistema,
                'Nombre': archivo.name.split('.').shift(),
                'Extencion': archivo.name.split('.').pop(),
                'Archivo': myReader.result,
                'id': this.usuario});
        };
        myReader.readAsDataURL(archivo);
/*        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('id', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'anteproyecto2', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                });
        }
        elem.value = ''; // line 9*/

    }

    subirArchivo2(datos) {
      this.http.post(GenericServicesService.API_ENDPOINT + 'anteproyecto2', datos, GenericServicesService.HEADERS).subscribe(
        (response) => {
            alert(response);
        });
    }

    uploadFile3(event) {
        let archivo: File = event.target.files[0];
        if (!archivo) {
            return;
        }
        let myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.subirArchivo3({'Sistema': this.sistema,
                'Nombre': archivo.name.split('.').shift(),
                'Extencion': archivo.name.split('.').pop(),
                'Archivo': myReader.result,
                'FK_ALUMNO': this.usuario});
        };
        myReader.readAsDataURL(archivo);
/*        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('FK_ALUMNO', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'Informe', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                });
        }
        elem.value = ''; // line 9*/

    }

    subirArchivo3(datos) {
      this.http.post(GenericServicesService.API_ENDPOINT + 'Informe', datos, GenericServicesService.HEADERS).subscribe(
        (response) => {
            alert(response);
        });
    }

    uploadFile4(event) {
        let archivo: File = event.target.files[0];
        if (!archivo) {
            return;
        }
        let myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.subirArchivo4({'Sistema': this.sistema,
                'Nombre': archivo.name.split('.').shift(),
                'Extencion': archivo.name.split('.').pop(),
                'Archivo': myReader.result,
                'FK_ALUMNO': this.usuario});
        };
        myReader.readAsDataURL(archivo);
/*        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('FK_ALUMNO', this.usuario);
            this.http.post(GenericServicesService.API_ENDPOINT + 'CartaFinalR', formData, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                });
        }
        elem.value = ''; // line 9*/

    }

    subirArchivo4(datos) {
        this.http.post(GenericServicesService.API_ENDPOINT + 'CartaFinalR', datos, GenericServicesService.HEADERS).subscribe(
            (response) => {
                alert(response);
            });
    }
}
