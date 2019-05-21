import { Component, OnInit } from '@angular/core';
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
        case 3: this.paso2 = 'completed'; this.paso3 = 'completed'; this.habilitarReferencia = false;
          break;
        case 4: this.paso2 = 'completed'; this.paso3 = 'completed'; this.paso4 = 'completed'; this.habilitarReferencia = false; this.habilitarFicha = true;
          break;
      }
    });
  }

  generarReferencia(){
    window.open("http://127.0.0.1:8000/api/Referencia/"+sessionStorage.getItem('IdUsuario'));
    //location.href = "http://127.0.0.1:8000/api/Referencia/"+sessionStorage.getItem('IdUsuario');
  }

  generarFicha(){
    window.open("http://127.0.0.1:8000/api/Ficha/"+sessionStorage.getItem('IdUsuario'));
    //location.href = "http://127.0.0.1:8000/api/Ficha/"+sessionStorage.getItem('IdUsuario');
  }
}