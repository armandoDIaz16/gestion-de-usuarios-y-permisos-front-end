import { Component } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service'

@Component({
    templateUrl: './actividadesResponsable.component.html'
})

export class ActividadesResponsableComponent {

    actividades: Actividad[];
    idUsuario: any;
    showAR: boolean = true;

    constructor(private actividadesService: CreditosService){
        this.getActRes();
    }

    getActRes(){
        this.idUsuario = sessionStorage.getItem('IdUsuario');
        this.actividadesService.getActRes(this.idUsuario).subscribe((data: Actividad[])=>{
            this.actividades = data;
            if(Object.keys(this.actividades).length === 0){
                this.showAR = false;
              }
        },(error)=>{
            alert("Ocurrio un error");
        })
    }
}