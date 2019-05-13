import { Component, OnInit } from '@angular/core';
import { AspiranteService } from '../../../services/aspirante.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
  providers: [AspiranteService]
})
export class DatosComponent implements OnInit {
  public aspirante = [];
  FECHA_NACIMIENTO_TEXTO="";

  constructor( private aspiranteService: AspiranteService) {
  }

  ngOnInit() {
    this.aspiranteService.getAspirante().subscribe(data => {
      this.aspirante = data;
      this.aspirante[0].FECHA_REGISTRO = this.aspirante[0].FECHA_REGISTRO.split('-')[0];
      switch(Number(this.aspirante[0].SEXO)){
        case 1: this.aspirante[0].SEXO="Masculino";
        break;
        case 2: this.aspirante[0].SEXO="Femenino";
        break;
      }

      var fechaTexto =this.aspirante[0].FECHA_NACIMIENTO.split('-');
      var fecha=new Date(fechaTexto[0],(fechaTexto[1]-1),fechaTexto[2]);
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.FECHA_NACIMIENTO_TEXTO = fecha.toLocaleDateString("es-ES", options);

    });
    //this.aspiranteService.getAspirante().subscribe(data => this.aspirante = data);
  }
}