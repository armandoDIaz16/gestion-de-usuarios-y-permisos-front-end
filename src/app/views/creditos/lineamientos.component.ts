import { Component } from '@angular/core';
import { Lineamiento } from './interfaces/lineamiento'
import { CreditosService } from '../../services/creditos.service';
 
@Component({
  templateUrl: './lineamientos.component.html'
})
export class LineamientosComponent {
  lineamientos: Lineamiento[];

  constructor(private lineamientosService: CreditosService) {
  	this.getLineamientos();
   }


   getLineamientos(){
  	  this.lineamientosService.get().subscribe((data: Lineamiento[])=>{
  		this.lineamientos = data;
  		console.log(this.lineamientos);
  	},(error)=>{
  		console.log(error);
  		alert("ocurrio un eror");
  	}); 
  }

  deleteLineamientos(id){
      this.lineamientosService.delete(id).subscribe((data)=>{
      alert("lineamiento eliminado");
      this.getLineamientos();
    },(error)=>{
      alert("ocurrio un error");
      console.log(error);
    });
  } 

}
