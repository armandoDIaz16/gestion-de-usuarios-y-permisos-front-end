import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
  providers: [PeriodoService, ValidarModuloService]
})

export class PeriodoComponent implements OnInit {
  public mostrarModulo = false;
  idPeriodo= this.idPeriodo;
  fechaInicio= this.fechaInicio;
  fechaFin= this.fechaFin;
  fechaActual= this.fechaActual;


  constructor(
    private periodoService: PeriodoService,
    private validarModuloService: ValidarModuloService
    ) {
  }

  ngOnInit() {    
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Periodo");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if(data){
        this.idPeriodo=data[0].PK_PERIODO_PREFICHAS;
        this.fechaInicio=data[0].FECHA_INICIO;
        this.fechaFin=data[0].FECHA_FIN;
        this.fechaActual=data[0].FECHA_ACTUAL;
        var fechaInicio=this.fechaInicio.split('-');
        var fechaFin=this.fechaFin.split('-');
        var fechaActual=this.fechaActual.split('-');
        if(fechaInicio[0]==fechaActual[0] && fechaFin[0]==fechaActual[0]){
        }else{
          this.idPeriodo=null;
          this.fechaInicio=null;
          this.fechaFin=null; 
        }
      }
    });
  }

  vaciarFechaFin(){
    if(this.fechaFin && this.compararFechas()){
      this.fechaFin= null;      
    }
  }

  validarFechas() {
    if(this.compararFechas()){
      alert("La fecha final debe ser posterior a la fecha de inicio");
      this.fechaFin= null;
  } 
   
  }
  compararFechas(){
    if(this.fechaInicio){ 
      var fechaInicio=this.fechaInicio.split('-');
      var fechaFin=this.fechaFin.split('-');
      var dateStart=new Date(fechaInicio[0],(fechaInicio[1]-1),fechaInicio[2]);
      var dateEnd=new Date(fechaFin[0],(fechaFin[1]-1),fechaFin[2]);
      if(dateStart>=dateEnd)
      {
        return true;     
      }
    }else{
      alert("Inserta primero la fecha de inicio");
      this.fechaFin= null;
    }
  }

  onSubmit(){
    if(this.idPeriodo){
      this.periodoService.addPeriodo(
        {
            "PK_PERIODO_PREFICHAS": this.idPeriodo,
            "FECHA_INICIO": this.fechaInicio,
            "FECHA_FIN": this.fechaFin,

          });
        //console.log("Modificacion");
    }else{        
      this.periodoService.addPeriodo({
              "FECHA_INICIO": this.fechaInicio,
              "FECHA_FIN": this.fechaFin,
              "FK_USUARIO_REGISTRO": sessionStorage.getItem('IdUsuario') 
      });
      //Corregir con promise
      setTimeout(()=>{
        this.periodoService.getPeriodo().subscribe(data => {
          this.idPeriodo=data[0].PK_PERIODO_PREFICHAS;
        });
      }, 1000); 
        //console.log("Insertar");       
    }  
          

/*     if(fechaInicio[0]==fechaActual[0] && fechaFin[0]==fechaActual[0]){
      this.periodoService.updatePeriodo(
        {
            "FECHA_INICIO": this.fechaInicio,
            "FECHA_FIN": this.fechaFin,
            "FK_USUARIO_MODIFICACION": sessionStorage.getItem('IdUsuario') 
        },this.idPeriodo
      );
    }else{
      this.periodoService.addPeriodo(
        {
            "FECHA_INICIO": this.fechaInicio,
            "FECHA_FIN": this.fechaFin,
            "FK_USUARIO_REGISTRO": sessionStorage.getItem('IdUsuario') 
        }
      ); 
    }*/
  }
}