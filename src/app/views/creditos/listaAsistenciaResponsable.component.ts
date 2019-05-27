import { Component } from '@angular/core';
import { Usuario } from './interfaces/usuario';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service'
import { ActivatedRoute} from '@angular/router'; 


@Component({
    templateUrl: './listaAsistenciaResponsable.component.html'
})

export class ListaAsistenciaResponsableComponent{

    actividad: Actividad[];
    alumnos: Usuario[];
    actividades: Actividad[];
    pk_actividad: any;

    constructor(private responsablesService: CreditosService, private activatedRoute: ActivatedRoute){
        this.getActRes();
        this.getListaAsistentes();

    }

    getListaAsistentes(){
        this.pk_actividad = this.activatedRoute.snapshot.params['id'];
        this.responsablesService.getListaAsistencia(this.pk_actividad).subscribe((data: Usuario[])=>{
            this.alumnos = data;
        },(error)=>{
            alert('Ocurrió un error');
        });
    }

    getActRes(){
        this.pk_actividad = this.activatedRoute.snapshot.params['id'];
        this.responsablesService.getActividadById(this.pk_actividad).subscribe((data: Actividad[])=>{
            this.actividad = data;
          },(error)=>{
            alert("Ocurrio un error");
          });
    }
}