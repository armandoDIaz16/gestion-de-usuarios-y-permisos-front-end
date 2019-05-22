import { Component } from '@angular/core';
import { CreditosService } from '../../services/creditos.service'
import { ActivatedRoute, Router} from '@angular/router';


@Component({
    templateUrl: './registroAsistencias.component.html'
})

export class RegistroAsistenciasComponent{

    pk_actividad: any;
    pk_usuario: any;
    res: string;

    constructor(private registroAsistencias: CreditosService, private activatedRoute: ActivatedRoute, private router: Router){
        this.habilitarRegistro();
    }

    habilitarRegistro(){
        this.pk_actividad = this.activatedRoute.snapshot.params['id'];
        this.registroAsistencias.habilitarRegistro(this.pk_actividad).subscribe((data)=>{
           this.res = data; 
           switch(this.res){
               case 'La fecha de la actividad ya paso':
               this.pk_usuario = sessionStorage.getItem('IdUsuario');
               this.registroAsistencias.eliminarAsistente(this.pk_usuario, this.pk_actividad).subscribe((data)=>{
                this.router.navigate(['./creditos/actividades_designadas_para_asistencia']);
               });

               break;
           }
        },(error)=>{
            console.log(error);
        })
    }
}