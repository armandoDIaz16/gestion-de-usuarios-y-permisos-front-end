/* tslint:disable:max-line-length */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-bancoproyectos',
  templateUrl: './bancoproyectos.component.html',
  styleUrls: ['./bancoproyectos.component.scss']
})
export class BancoproyectosComponent implements OnInit {


  archivo;


  constructor(private http: HttpClient) {}

  id = this.id;
  file = this.file;

  selectedFile: File = null;

   const; header = 'Access-Control-Allow-Origin: *';

  ngOnInit() {
  }

  onSubmit() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const url = `${baseUrl}/Documentacion/`;
    // @ts-ignore
    // this.http.patch(url + 1, fd)
    let apoyo = btoa(this.file);

    this.http.patch(
      url + 1,
      {
        'id': this.id.toString(),
        'imagen': apoyo
      }

    ).subscribe(res => {
      console.log(res);
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.archivo = reader.onload = function () {
      return reader.result;
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onUpload() {

  }

}
