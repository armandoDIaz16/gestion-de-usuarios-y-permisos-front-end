import { Component } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service'

@Component({
    templateUrl: './gestionActividades.component.html'
})

export class GestionActividadesComponent {
    actividades: Actividad[];

    constructor(private actividadesService: CreditosService){
        this.getActividades();
    }

    getActividades(){
        
        this.actividadesService.getActividades().subscribe((data: Actividad[])=>{
            this.actividades = data;
            console.log(this.actividades);
        },(error)=>{
            console.log(error);
            alert("Ocurrio un error");
        });
    }

    deleteActividades(id){
        
    if(confirm("estas seguro que deseas borrar esta actividad?")){
        this.actividadesService.deleteActividades(id).subscribe((data)=>{
            alert("Actividad eliminada");
            this.getActividades();
        },(error)=>{
            alert('ocurrio un error');
            console.log(error);
        });
        this.getActividades();
    }
  }

}