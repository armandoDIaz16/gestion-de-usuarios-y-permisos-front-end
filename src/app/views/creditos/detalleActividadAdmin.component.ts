import { Component } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service';
import { ActivatedRoute, Router} from '@angular/router'; 

@Component({
    templateUrl: './detalleActividadAdmin.component.html'
})

export class DetalleActividadAdminComponent{
    
    id: any;
    actividad: Actividad[];

    constructor(private creditosService: CreditosService, private activatedRoute: ActivatedRoute){
        this.getActividad();

    }

    getActividad(){
        this.id = this.activatedRoute.snapshot.params['id'];
        this.creditosService.getActividadById(this.id).subscribe((data: Actividad[])=>{
            this.actividad = data;
          },(error)=>{
            alert("Ocurrio un error");
          });
    }




}