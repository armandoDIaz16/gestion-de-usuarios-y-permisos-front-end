import { Component, OnInit } from '@angular/core';
import {AnteproyectosSeleccion} from './anteproyectos';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-banco-edicion',
  templateUrl: './banco_edicion.component.html',
  styleUrls: ['./banco_edicion.component.scss'],
    providers: [AnteproyectosSeleccion]
})
export class BancoEdicionComponent extends GenericServicesService implements OnInit {

    public anteproyectosLista = [];
    id = this.id;
  constructor(private anteproyectosService: AnteproyectosSeleccion, private http: HttpClient) { super(http); }
  Nombre = this.Nombre;
  Alumno = this.Alumno;
  Estatus = this.Estatus;
  AreaAcademica = this.AreaAcademica;
  Autor = this.Autor;
  Empresa = this.Empresa;
  Comentario = this.Comentario;

  ngOnInit() {
  }
  onSubmit() {
      console.log(this.id);
      this.anteproyectosService.getAnteproyectos(this.id.toString()).subscribe(data => this.anteproyectosLista = data);
  }
  onUpdate(event: any) {
      this.http.put(GenericServicesService.API_ENDPOINT + 'Anteproyecto/' + this.id, {
          'Nombre': event.target.Nombre.value.toString(),
          'Alumno': event.target.Alumno.value.toString(),
          'Estatus': event.target.Estatus.value.toString(),
          'AreaAcademica': event.target.AreaAcademica.value.toString(),
          'Autor': event.target.Autor.value.toString(),
          'Empresa': event.target.Empresa.value.toString(),
          'Comentario': event.target.Comentario.value.toString()
      }, GenericServicesService.HEADERS ).subscribe(
          (response) => {
              console.log(response);
          }
      );
  }
}
