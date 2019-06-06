import { Component } from '@angular/core';
import { Usuario } from './interfaces/usuario';
import { Alumno } from './interfaces/alumno';
import { AsistenteActividad } from './interfaces/asistenteActividad';
import { CreditosService } from '../../services/creditos.service'
import { ActivatedRoute} from '@angular/router'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';

@Component({
    templateUrl: './asistentesResponsable.component.html'
})

export class AsistentesResponsableComponent{

    pk_actividad: any;
    num_control: number;
    usuarios: Usuario[];
    alumnos: Alumno[];
    asistente: AsistenteActividad = {
        FK_USUARIO: null,
    };
    pk_usuario: number;

    constructor(private responsablesService: CreditosService, private activatedRoute: ActivatedRoute){
        this.getAsistentes();

    }

    getAsistentes(){
        this.pk_actividad = this.activatedRoute.snapshot.params['id'];
        this.responsablesService.getAsistentes(this.pk_actividad).subscribe((data : Usuario[])=>{
            this.usuarios = data;
        },(error)=>{
            alert('Ocurrio un error');
        });
    }

    getAlumno(){
        this.responsablesService.getAlumnoByNc(this.num_control).subscribe((data: Alumno[])=>{
            this.alumnos = data;
            console.log(this.alumnos);
        },(error)=>{
            alert("Ocurrio un error");
        });
    }

    registrar(FK_USUARIO){
            this.asistente.FK_USUARIO = FK_USUARIO;
            this.asistente.FK_ACTIVIDAD = this.pk_actividad;
            this.responsablesService.RegistrarAsistAct(this.asistente).subscribe((data)=>{
                alert("Registrado Correctamente");
                this.getAsistentes();
            },(error)=>{
                alert("Ocurrio un error");
                console.log(error);
            });
        
    }

    eliminar(id){
        this.responsablesService.eliminarAsistAct(id).subscribe((data)=>{
            alert("Eliminado correctamente");
            this.getAsistentes();
        },(error)=>{alert("Ocurrio un error");
        });
    }

}
