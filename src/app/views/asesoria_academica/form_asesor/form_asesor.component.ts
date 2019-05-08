import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { AperturaService} from '../../../services/apertura.service';
//import * as $ from 'jquery';
@Component({
  selector: 'app-form_asesor',
  templateUrl: './form_asesor.component.html',
  styleUrls: ['./form_asesor.component.scss'],
  providers: [AperturaService]
})
export class Form_asesorComponent implements OnInit {
  activado=false;
  fechaInicio=null;
  fechaFin=null;
  fechaActual=null;

  public form ={
    email:null,
     //name:null,
     name:localStorage.getItem("nombre"),
     password:null,
     password_confirmation:null,
     curp: null,
     control : null,
     apep: null,
     apem: null,
     carrera: null,
     celular: null,
     dia: null,   
   };
 
   public error = [];
 
   constructor (private Jarwis: JarwisService,
     private Token : TokenService,
     private router : Router,
     private periodoService: AperturaService,
     ) { }
 
   onSubmit(){
     alert(this.form.dia)
    }
 
   handleResponse(data){
     this.Token.handle(data.access_token);
     this.router.navigateByUrl('/home');
   }
 
 
   handleError(error){
     this.error= error.error.errors;
   }
 
   ngOnInit() {
    this.periodoService.getPeriodo().subscribe(data => {
      this.fechaInicio=data[0].FECHA_INICIO;
      this.fechaFin=data[0].FECHA_FIN;
      this.fechaActual=data[0].FECHA_ACTUAL;
      this.compararFechas();     
    });
   }
 
  compararFechas(){ 
    var fechaInicio=this.fechaInicio.split('-');
    var fechaFin=this.fechaFin.split('-');
    var fechaActual=this.fechaActual.split('-');
    var fechaInicio2=new Date(fechaInicio[0],(fechaInicio[1]-1),fechaInicio[2]);
    var fechaFin2=new Date(fechaFin[0],(fechaFin[1]-1),fechaFin[2]);
    var fechaActual2=new Date(fechaActual[0],(fechaActual[1]-1),fechaActual[2]);
    if(fechaActual2>=fechaInicio2 && fechaActual2<=fechaFin2 )
    {    
      console.log('La fecha esta en el rango');
      this.activado=true;     
    }else{
      console.log('La fecha no esta en el rango');
    }
  }
}