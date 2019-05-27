import { Component, OnInit } from '@angular/core';

//import * as jsPDF from 'jspdf';
//import 'jspdf-autotable';

import { AspiranteService } from '../../../services/aspirante.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AspiranteService]
})
export class DashboardComponent implements OnInit {
  public aspirante = [];
  public referencia = [];
  paso2 = null;
  paso3 = null;
  paso4 = null;
  habilitarReferencia = false;
  habilitarFicha = false;
  habilitarRegistro = false;
  habilitarAceptado = false;

    constructor(private aspiranteService: AspiranteService) {
    }

  ngOnInit() {
    this.aspiranteService.getAspirante().subscribe(data => {
      this.aspirante = data;
      //this.aspirante[0].PREFICHA = this.aspirante[0].PREFICHA.replace(/ /g, "")
      //this.aspiranteService.getReferencia(this.aspirante[0].PREFICHA).subscribe(data => this.referencia = data);
      if (this.aspirante[0].SEGUNDO_APELLIDO == null) {
        this.aspirante[0].SEGUNDO_APELLIDO = "";
      }
      switch (Number(this.aspirante[0].FK_ESTATUS)) {
        case 1: this.habilitarReferencia = true;
          break;
        case 2: this.paso2 = 'completed'; this.habilitarReferencia = false;
          break;
        case 3: this.paso2 = 'completed'; this.paso3 = 'completed'; this.habilitarReferencia = false; this.habilitarRegistro = true;
          break;
        case 4: this.paso2 = 'completed'; this.paso3 = 'completed'; this.paso4 = 'completed'; this.habilitarReferencia = false; this.habilitarFicha = true;
          break;
        case 5: this.paso2 = 'completed'; this.paso3 = 'completed'; this.paso4 = 'completed'; this.habilitarAceptado = true;      
          break;
      }
    });
  }

  generarReferencia(){
    window.open("http://10.0.31.11/backend_swiitl/server.php/api/Referencia/"+sessionStorage.getItem('IdUsuario'));
    //location.href = "http://10.0.31.11/backend_swiitl/server.php/api/Referencia/"+sessionStorage.getItem('IdUsuario');
  }

  generarFicha(){
    window.open("http://10.0.31.11/backend_swiitl/server.php/api/Ficha/"+sessionStorage.getItem('IdUsuario'));
    //location.href = "http://10.0.31.11/backend_swiitl/server.php/api/Ficha/"+sessionStorage.getItem('IdUsuario');
  }
}
