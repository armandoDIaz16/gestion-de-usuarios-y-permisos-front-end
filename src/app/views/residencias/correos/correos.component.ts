import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss']
})
export class CorreosComponent implements OnInit {

  constructor(private http: HttpClient) {}

  dia = this.dia;
  hora = this.hora;
  lugar = this.lugar;
  persona = this.persona;

  ngOnInit() {
  }

  onSubmit(){
    this.http.post('http://127.0.0.1:8000/api/CreditosSiia',{
      "Dia": this.dia.toString(),
      "Hora": this.hora.toString(),
      "Lugar": this.lugar.toString(),
      "Persona": this.persona.toString()
    }).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
