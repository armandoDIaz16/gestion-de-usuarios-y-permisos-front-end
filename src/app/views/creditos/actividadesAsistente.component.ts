import { Component } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service';
import { Router} from '@angular/router';

@Component({
    templateUrl: './actividadesAsistente.component.html'
})

export class ActividadesAsistenteComponent {
    pkUsuario: any;
    actividades: Actividad[];

    constructor(private asistentesService: CreditosService, private router: Router){
        this.getActividades();
    }

    getActividades(){//obtener listado de actividades
        this.pkUsuario = sessionStorage.getItem('IdUsuario');
        this.asistentesService.getActTomaAsist(this.pkUsuario).subscribe((data: Actividad[])=>{
            this.actividades = data;
            if(Object.keys(this.actividades).length === 0){//si no hay ninguna actividad entonces eliminar el rol de toma de asistencia
                this.asistentesService.eliminarRolAsistente(this.pkUsuario).subscribe((data)=>{
                    this.router.navigate(['./creditos']);
                })
            }
        },(error)=>{
            alert("Ocurrió un error");
        })
    }
}