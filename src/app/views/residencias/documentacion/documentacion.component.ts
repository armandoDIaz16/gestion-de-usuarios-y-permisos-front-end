import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss']
})
export class DocumentacionComponent implements OnInit {

  constructor(private http: HttpClient) {}

  id = this.id;
  file = this.file;
  usuario = sessionStorage.getItem('IdUsuario');

  const; header = 'Access-Control-Allow-Origin: *';


  ngOnInit() {
  }


  uploadFile(event){
    let elem = event.target;
    console.log(this.id);
    let ex = this.id;
    if(elem.files.length > 0){
      let formData = new FormData();
      formData.append('myfile', elem.files[0]);
      formData.append('id', this.usuario );
      if(ex == 1) {
        this.http.post('http://127.0.0.1:8000/api/documentacion', formData).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
      if(ex == 2){
        this.http.post('http://127.0.0.1:8000/api/documentacion2', formData).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    }
    elem.value = "";
  }

}
