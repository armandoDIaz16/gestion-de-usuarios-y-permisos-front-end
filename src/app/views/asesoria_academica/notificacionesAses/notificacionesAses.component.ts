import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';



@Component({
  selector: 'app-notificacionesAses',
  templateUrl: './notificacionesAses.component.html',
  styleUrls: ['./notificacionesAses.component.scss']
})
export class NotificacionesAsesComponent implements OnInit {
 
  error = [];
  asesor = [];

  public form = {
    id: sessionStorage.getItem("IdUsuario"),
    correos : [],
    asunto: null,
    mensaje: null,
    alumnos : []
  }

  constructor(
    private Jarwis: JarwisService,
  ) {
  }

  ngOnInit() {

  }

  correosAlumnos(){
    this.Jarwis.getCorreosAlumnos(this.form.id).subscribe(
      data => {
        this.form.correos = [];
        for (var num in data) {
          this.form.correos.push(data[num].email);
          console.log(this.form.correos)
        }
      },
      error => this.handleError(error)
    );
  }



  enviarCorreo() {
    this.Jarwis.enviarCorreo(this.form).subscribe(
      data => {
       
        },
      error => this.handleError(error)
    );
    this.form.asunto = "";
    this.form.mensaje = "";
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
