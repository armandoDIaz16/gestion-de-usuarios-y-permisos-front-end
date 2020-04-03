import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Documento} from './documentacion';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss'],
  providers: [Documento, ValidarModuloService]
})
export class DocumentacionComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService, public documento: Documento) { super(http);
  this.documento.getDocumento(this.usuario).subscribe(data => {this.anteproyectosLista = data; }); }

  public mostrarModulo = false;
  public sistema = 'Residencias';
    anteproyectosLista = [];
     carta_documentacion;
     solicitud;
  id = this.id;
  file = this.file;
  usuario = sessionStorage.getItem('IdUsuario');

  const; header = 'Access-Control-Allow-Origin: *';


  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Documentacion');
      if (!this.mostrarModulo) {
          return;
      }
  }


  uploadFile(event, ed) {
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
                                    'id': this.usuario}, ed);
      };
      myReader.readAsDataURL(archivo);
  }
/*    let elem = event.target;
    console.log(this.id);
    let ex = this.id;
    if (elem.files.length > 0){
      let formData = new FormData();
      formData.append('myfile', elem.files[0]);
      formData.append('id', this.usuario );
      if (ex === 1) {
        this.http.post(GenericServicesService.API_ENDPOINT + 'documentacion', formData, GenericServicesService.HEADERS).subscribe(
          (response) => {
            alert(response);
          }
        );
      }
      if (ex === 2) {
        this.http.post(GenericServicesService.API_ENDPOINT + 'documentacion2', formData, GenericServicesService.HEADERS).subscribe(
          (response) => {
            alert(response);
          }
        );
      }
    }
    elem.value = '';
  }*/
    subirArchivo(datos, id) {
        let ex = id;
        if (ex === 1) {
            this.http.post(GenericServicesService.API_ENDPOINT + 'documentacion', datos, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                }
            );
        }
        if (ex === 2) {
            this.http.post(GenericServicesService.API_ENDPOINT + 'documentacion2', datos, GenericServicesService.HEADERS).subscribe(
                (response) => {
                    alert(response);
                }
            );
        }
    }
}
