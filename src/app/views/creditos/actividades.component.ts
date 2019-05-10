import { Component } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import {UsuarioActividad } from './interfaces/usuarioActividad';
import { CreditosService } from '../../services/creditos.service'

@Component({
    templateUrl: './actividades.component.html'
})

export class ActividadesComponent {
    actividades: Actividad[];
    actividadesInscritas: Actividad[];
    registrados: number; 
    registrable: boolean = true;
    idUsuaio: any;
    showAD: boolean = true;


    

    constructor(private actividadesService: CreditosService){
        this.getActividades();
        this.getActividadesInscritas();
    }

    getActividades(){
        this.idUsuaio = sessionStorage.getItem('IdUsuario');
        this.actividadesService.getActividadesDisponibles(this.idUsuaio).subscribe((data: Actividad[])=>{
            this.actividades = data;
            if(Object.keys(this.actividades).length === 0){
              this.showAD = false;
            }
            //console.log(this.actividades);
            this.getRegistrados(this.actividades);
        },(error)=>{
            console.log(error);
            alert("Ocurrio un error");
        });
    }

    getActividadesInscritas(){
        this.actividadesService.getActividadesInscitas(this.idUsuaio).subscribe((data: Actividad[])=>{
        this.actividadesInscritas = data;
        this.getRegistrados(this.actividadesInscritas);
      },(error)=>{
        console.log(error);
        alert("Ocurrio un error")
      })
    }

    getRegistrados(listaActividades){
        for(let a of listaActividades){
          this.actividadesService.getRegistrados(a.PK_ACTIVIDAD).subscribe((data: number)=>{
          a.REGISTRADOS = data;
          console.log(a.PK_ACTIVIDAD +" - "+a.REGISTRADOS);
        }, (error)=>{
          console.log("ocurrion un error al guardar Registrados");
        });
    
        }
          
      }

    
/*
      registrarse(id_actividad, registrados, cupo){
        if(registrados < cupo){
          this.usuarioActividades.FK_ACTIVIDAD = id_actividad;
          this.usuarioActividades.FK_USUARIO = 1;
    
          this.actividadesService.saveAlumnoActividad(this.usuarioActividades).subscribe((data)=>{
          alert("registrado");
    
         },(error)=>{
          alert("ocurrio un error");
          console.log(error);
          });
        }else{
          alert("ya no hay lugares disponibles");
        }
        
    
      }
*/
    

}