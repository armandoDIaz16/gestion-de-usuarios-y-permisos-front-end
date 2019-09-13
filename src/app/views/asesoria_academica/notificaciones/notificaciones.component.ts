import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';




@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  providers: [ValidarModuloService]
})
export class NotificacionesComponent implements OnInit {
 
  public mostrarModulo = false;
  error = [];
  asesor = [];
  correoalm = [];
  correoase = [];
  emailalm= null
  emailase= null

  public form = {
    correos : [],
    asunto: null,
    mensaje: null,
    alumnos : []
  }

  constructor(
    private Jarwis: JarwisService,
    private validarModuloService: ValidarModuloService
  ) {
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Notificaciones");
    if (!this.mostrarModulo) {
      return;
    }
    this.Jarwis.getCorreoIndAlumno().subscribe(
      data => {
        this.correoalm = [];
        for (var num in data) {
          this.correoalm.push(data[num]);
          //console.log(this.form.correos)
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.obtenerAsesor().subscribe(
      data => {
        this.correoase = [];
        for (var num in data) {
          this.correoase.push(data[num]);
          console.log(this.correoase)
        }
      },
      error => this.handleError(error)
    );

  }
  corrAlm(){
    this.form.correos.push(this.emailalm)
    //console.log(this.form.correos)

  }

  corrAse(){
    this.form.correos.push(this.emailase)
    //console.log(this.form.correos)
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
