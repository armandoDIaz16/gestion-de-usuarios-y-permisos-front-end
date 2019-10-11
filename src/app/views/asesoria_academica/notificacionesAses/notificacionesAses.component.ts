import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';




@Component({
  selector: 'app-notificacionesAses',
  templateUrl: './notificacionesAses.component.html',
  styleUrls: ['./notificacionesAses.component.scss'],
  providers: [ValidarModuloService]
})
export class NotificacionesAsesComponent implements OnInit {
  public mostrarModulo = false;
 
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
    private validarModuloService: ValidarModuloService
  ) {
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Notificación asesores");
    if (!this.mostrarModulo) {
      return;
    }

  }

  correosAlumnos(){
    this.Jarwis.getCorreosAlumnos(this.form.id).subscribe(
      data => {
        this.form.correos = [];
        for (var num in data) {
          this.form.correos.push(data[num].CORREO1);
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
