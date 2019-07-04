import { Component } from '@angular/core';
import { Lineamiento } from './interfaces/lineamiento'
import { CreditosService } from '../../services/creditos.service';

import { ActivatedRoute, Router } from '@angular/router';
//edicion

@Component({
  selector: 'app-lineamientosForm',
  templateUrl: './lineamientosForm.component.html'
})
export class LineamientosFormComponent {
  lineamiento: Lineamiento = { 
    NOMBRE: null,
    LIMITE: null
  };

  titulo: string = "Registrar lineamiento";
  id: any;
  editing: boolean = false;
  lineamientos: Lineamiento[];




  constructor(private lineamientosService: CreditosService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];//si hay un id significa que se va a editar un lineamiento
    if(this.id){
      this.editing = true;
      this.titulo = "Editar lineamiento";
      this.lineamientosService.get().subscribe((data: Lineamiento[])=>{
      this.lineamientos = data;
      this.lineamiento = this.lineamientos.find((m)=>{return m.PK_LINEAMIENTO==this.id});//guardar solo el registro correspondiente al id que se esta pasando
      },(error)=>{
        console.log(error);
      });
    }
  }

  saveLineamiento(){
    if(this.editing){
      console.log(this.lineamiento);
      this.lineamientosService.put(this.lineamiento).subscribe((data)=>{
        alert("lineamiento actualizado correctamente");
        this.router.navigate(['./creditos/gestion_de_lineamientos']);
      },(error)=>{
        alert("ocurrio un error " + error);
        console.log(error);
      });
    }else{
      console.log(this.lineamiento);
      this.lineamientosService.save(this.lineamiento).subscribe((data)=>{
        alert("lineamiento guardado correctamente");
        this.router.navigate(['./creditos/gestion_de_lineamientos']);
      },(error)=>{
        alert("ocurrio un error " + error);
      });
    }
  }


}