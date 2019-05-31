import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';



@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
 
  error = [];
  asesor = [];

  public form = {
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

  correoAsesores() {
    this.Jarwis.obtenerAsesor().subscribe(
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

  correosAlumnos(){
    this.Jarwis.obtenerSolicitud().subscribe(
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
  correosTodos(){
    this.form.correos = [];
    this.Jarwis.obtenerAsesor().subscribe(
      data => {
        for (var num in data) {
          this.form.correos.push(data[num].email);
          console.log(this.form.correos)
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.obtenerSolicitud().subscribe(
      data => {
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
