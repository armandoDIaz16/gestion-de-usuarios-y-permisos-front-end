import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-habilitar-residentes',
  templateUrl: './habilitar_residentes.component.html',
  styleUrls: ['./habilitar_residentes.component.scss']
})
export class Habilitar_residentesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  habilitarAlumnos() {
      this.http.get('http://127.0.0.1:8000/api/CreditosSiia').subscribe(
          (response) => {
              console.log(response);
          }
      );
  }

}
