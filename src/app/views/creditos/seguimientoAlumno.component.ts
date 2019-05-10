import { Component } from '@angular/core';
import { Lineamiento } from './interfaces/lineamiento';
import { ActividadSeguimientoAlumno } from './interfaces/actividadSeguimientoAlumno';
import { AlumnoCredito } from './interfaces/alumnoCredito';
import { CreditosService } from '../../services/creditos.service'
import { NumberSymbol } from '@angular/common';

@Component({
    templateUrl: './seguimientoAlumno.component.html'
})

export class SeguimientoAlumnoComponent {
    lineamientos: Lineamiento[];
    listaActividades: ActividadSeguimientoAlumno[];
    creditosCumplidos: AlumnoCredito[];
    pk_alumno = sessionStorage.getItem('IdUsuario');;
    flag: boolean = true;
    showTable1: boolean = true;
    showTable2: boolean = true;


    constructor(private creditosService: CreditosService){
        this.getLineamientos();
        this.getCreditos();       

    }

getLineamientos(){ //Obtener los lineamientos para clasificar las actividades y mostrarlas de manera mas ordenada
    this.creditosService.get().subscribe((data: Lineamiento[])=>{
        this.lineamientos = data;
        for(let lin of this.lineamientos){
            if (this.flag){
                this.getListaActividades(lin.PK_LINEAMIENTO);
                this.flag = false;
            }
          }
    },(error)=>{
        alert('ocurrio un error');
    });

    
 }

 getListaActividades(l){//obtener las actividades a las que ha asistido el alumno 
    this.creditosService.getListaActividades(l, this.pk_alumno).subscribe((data: ActividadSeguimientoAlumno[])=>{
        this.listaActividades = data;
        if(Object.keys(this.listaActividades).length === 0){
            this.showTable1 = false;
        }else {
            this.showTable1 = true;
        }
    }, (error)=>{
        alert('ocurrio un error');
    });
    
 }

 onClick(id){//al dar click en la pestaña del lineamiento se manda a llamar la lista de actividades correspondiente al lineamiento
     this.getListaActividades(id);
 }

 getCreditos(){//obtener los creditos cumplidos por el alumno
    this.creditosService.getCreditosbyAlumno(this.pk_alumno).subscribe((data: AlumnoCredito[])=>{
        this.creditosCumplidos = data;
        if(Object.keys(this.creditosCumplidos).length === 0){
            this.showTable2 = false;
        }
    },(error)=>{
        alert("ocurrio un error");
    })
 }

}