import { Component, OnInit } from '@angular/core';
import { AperturaService } from '../../../services/apertura.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
  styleUrls: ['./apertura.component.scss'],
  providers: [AperturaService,ValidarModuloService]
})
export class AperturaComponent implements OnInit {
  idPeriodo= this.idPeriodo;
  fechaInicio= this.fechaInicio;
  fechaFin= this.fechaFin;
  fechaActual= this.fechaActual;
  public mostrarModulo = false;



  constructor(
    private aperturaService: AperturaService,
    private validarModuloService: ValidarModuloService
  ) {
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Apertura");
    if (!this.mostrarModulo) {
      return;
    }
    this.aperturaService.getPeriodo().subscribe(data => {
      if(data){
        this.idPeriodo=data[0].PK_PAAE_PERIODO;
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
      this.aperturaService.addPeriodo(
        {
            "PK_PAAE_PERIODO": this.idPeriodo,
            "FECHA_INICIO": this.fechaInicio,
            "FECHA_FIN": this.fechaFin,
            "FK_USUARIO_MODIFICACION": sessionStorage.getItem('IdUsuario')
        });
        console.log("Modificacion");
    }else{        
      this.aperturaService.addPeriodo({
              "FECHA_INICIO": this.fechaInicio,
              "FECHA_FIN": this.fechaFin,
              "FK_USUARIO_REGISTRO": sessionStorage.getItem('IdUsuario') 
      });
      //Corregir con promise
/*       this.periodoService.getPeriodo().subscribe(data => {
        this.idPeriodo=data[0].PK_PERIODO_PREFICHAS;
      }); */
        console.log("Insertar");       
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