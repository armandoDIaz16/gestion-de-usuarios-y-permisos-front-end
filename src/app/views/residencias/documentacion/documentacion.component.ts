import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss'],
  providers: [ValidarModuloService]
})
export class DocumentacionComponent extends GenericServicesService implements OnInit {

  constructor(private http: HttpClient, private validarModuloService: ValidarModuloService) { super(http); }

  public mostrarModulo = false;
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


  uploadFile(event) {
    let elem = event.target;
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
  }

}
