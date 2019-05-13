import { Component } from '@angular/core';
import { Usuario } from './interfaces/usuario';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service'
import { ActivatedRoute} from '@angular/router'; 


@Component({
    templateUrl: './listaAsistenciaResponsable.component.html'
})

export class ListaAsistenciaResponsableComponent{

    actividad: Actividad = {
        NOMBRE: null,
        DESCRIPCION: null,
        LUGAR: null,
        FECHA: null,
        HORA: null,
        CUPO: null,
        FK_LINEAMIENTO: null,
        FK_TIPO: null,
        FK_RESPONSABLE: null,
      };
      
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
        this.responsablesService.getActividades().subscribe((data: Actividad[])=>{
            this.actividades = data;
            this.actividad = this.actividades.find((m)=>{return m.PK_ACTIVIDAD == this.pk_actividad});
            console.log(this.actividad);
          },(error)=>{
            console.log(error);
          });
    }
}