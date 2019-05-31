import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';



@Component({
  selector: 'app-notificacionesAlm',
  templateUrl: './notificacionesAlm.component.html',
  styleUrls: ['./notificacionesAlm.component.scss']
})
export class NotificacionesAlmComponent implements OnInit {
 visasesor = false;
 vis = false;
  error = [];
  asesor = [];
  registrosPagina = 2;
  pageActual: number = 1;
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;


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
    this.Jarwis.getAsesorCorreo(this.form.id).subscribe(
      data => {
      this.visasesor = true;
        this.asesor = [];
        for (var num in data) {
          this.asesor.push(data[num]);
          console.log(this.asesor)
        }
      },
      error =>{ 
        this.handleError(error)
        this.vis = true;
      }
    );

  }

  correosAlumnos(){
    this.Jarwis.getAsesorCorreo(this.form.id).subscribe(
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

  mostrarRegistros(numRegistros) {
    switch (numRegistros) {
      case "2":
        this.registrosPagina = 2; this.select1 = 'active'; this.select2 = ''; this.select3 = ''; this.select4 = '';
        break;
      case "5":
        this.registrosPagina = 5; this.select1 = ''; this.select2 = 'active'; this.select3 = ''; this.select4 = '';
        break;
      case "10":
        this.registrosPagina = 10; this.select1 = ''; this.select2 = ''; this.select3 = 'active'; this.select4 = '';
        break;
      case "todos":
        this.registrosPagina = this.asesor.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
