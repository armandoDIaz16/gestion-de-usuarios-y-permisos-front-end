import { Component } from '@angular/core';
import { CreditoSE } from './interfaces/creditoSE';
import { Lineamiento } from './interfaces/lineamiento';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    templateUrl: './creditosPorValidar.component.html'
})

export class CreditosPorValidarComponent{

    creditos: CreditoSE[];
    num_control: any;
    lin: any;
    desglosarShow = 0;
    opcion_busqueda = 1;
    check = 0;
    checkId: any;
    id: any;
    lineamientos: Lineamiento[];
    actividades: Actividad[];
    pageActual: number = 1;


    constructor(private crPorValidar: CreditosService){
        this.getCreditosPorValidar();
    }

    getCreditosPorValidar(){
        this.crPorValidar.getCreditorPorValidar().subscribe((data: CreditoSE[])=>{
            this.creditos = data;
        },(error)=>{ alert('Ocurrio un error')});
        
    }

    getCreditosByNc(){//buscar creditos por numero de control
        this.crPorValidar.getCreditosPorValidarByNumC(this.num_control).subscribe((data: CreditoSE[])=>{
            this.creditos = data;
        },(error)=>{ alert('Ocurrio un error')});
    }

    getCreditosByLin(){//buscar creditos por lineamiento
        this.crPorValidar.getCreditosPorValidarByLin(this.lin).subscribe((data: CreditoSE[])=>{
            this.creditos = data;
        },(error)=>{alert("Ocurrio un error")});
    }


    onDropdownChange(e){//cambio de opcion de busqueda
        //console.log(e);
        if(e == 2){
            this.opcion_busqueda = 2;
            this.getLineamientos();
        }else{
            this.opcion_busqueda = 1;
        }

      }
      onDropdownChange1(e){//cambio de opcion de busqueda
        //console.log(e);
        this.lin = e;

      }
    getLineamientos(){//obtener lineamientos para mostrarlos en las opciones de busqueda
        this.crPorValidar.get().subscribe((data: Lineamiento[])=>{
            this.lineamientos = data;});
    }

    desglosar(pk_alumno_credito){//mostrar las actividades de cada credito
        if(this.desglosarShow == 0){
            this.desglosarShow = 1;
            this.crPorValidar.getActByCredito(pk_alumno_credito).subscribe((data: Actividad[])=>{
            this.actividades = data;
            this.id = pk_alumno_credito;
        },(error)=>{alert("Ocurrió un error")});
        }else{
            this.desglosarShow = 0;
            if (pk_alumno_credito != this.id){
                this.desglosarShow = 1;
                this.crPorValidar.getActByCredito(pk_alumno_credito).subscribe((data: Actividad[])=>{
                    this.actividades = data;
                    this.id = pk_alumno_credito;
                },(error)=>{alert("Ocurrió un error")});
            }
        }
        
    }

    checkEvent(PK_ALUMNO_CREDITO){//controlar la activacion y desactivacion del boton de validar
        if(this.check == 0){
            this.check = 1;
            this.checkId = PK_ALUMNO_CREDITO;
        }else{
            this.check = 0;
            if(PK_ALUMNO_CREDITO != this.checkId){
                this.getCreditosPorValidar();
                /* this.check = 1;
                this.checkId = PK_ALUMNO_CREDITO; */
            }
        }
        
    }

    validarCreditos(PK_ALUMNO_CREDITO){
        this.crPorValidar.validarCreditos(PK_ALUMNO_CREDITO).subscribe((data)=>{
            this.crPorValidar.generarConstancia(PK_ALUMNO_CREDITO).subscribe((data)=>{
                alert("Credito validado correctamente");
                this.getCreditosPorValidar();
            });
        },(error)=>{
                alert("Ocurrio un error");
            });
    }

}