import { Component, OnInit } from '@angular/core';
import {AnteproyectosSeleccion} from './anteproyectosProyectos';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
    providers: [AnteproyectosSeleccion]
})
export class ProyectosComponent implements OnInit {

    public anteproyectosLista = [];
    usuario = sessionStorage.getItem('IdUsuario');
    ID = this.ID;

  constructor(private anteproyectosService: AnteproyectosSeleccion, private http: HttpClient) { }

  ngOnInit() {
    this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
  }

    updateProyect(id) {
        this.http.put('http://127.0.0.1:8000/api/Anteproyecto/' + id, {'Cancelar': 'valido'}).subscribe((response) => {
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
            this.http.post('http://127.0.0.1:8000/api/Reporte', formData).subscribe(
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
            this.http.post('http://127.0.0.1:8000/api/anteproyecto2', formData).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }
}
