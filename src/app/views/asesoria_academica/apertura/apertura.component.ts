import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
  styleUrls: ['./apertura.component.scss']
})
export class AperturaComponent implements OnInit {
  fechaInicio= this.fechaInicio;
  fechaFinal= this.fechaFinal;


  constructor() {
  }

  ngOnInit() {
  }

  vaciarFechaFinal(){
    if(this.fechaFinal){
      if(this.compararFechas()){
        this.fechaFinal= null;
      } 
    }
  }

  validarFechas() {
    if(this.compararFechas()){
      alert("La fecha final debe ser posterior a la fecha de inicio");
      this.fechaFinal= null;
    } 
   
  }
  compararFechas(){ 
    var fechaInicio=this.fechaInicio.split('-');
    var fechaFinal=this.fechaFinal.split('-');
    var dateStart=new Date(fechaInicio[0],(fechaInicio[1]-1),fechaInicio[2]);
    var dateEnd=new Date(fechaFinal[0],(fechaFinal[1]-1),fechaFinal[2]);
    if(dateStart>=dateEnd)
    {
      return true;     
    }
  }
}