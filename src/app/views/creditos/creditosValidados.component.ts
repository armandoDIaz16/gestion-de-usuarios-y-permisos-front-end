import { Component } from '@angular/core';
import { CreditoSE } from './interfaces/creditoSE';
import { Lineamiento } from './interfaces/lineamiento';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service'


@Component({
    templateUrl: './creditosValidados.component.html'
})

export class CreditosValidadosComponent{
    creditos: CreditoSE[];
    actividades: Actividad[];
    lineamientos: Lineamiento[];
    num_control: any;
    lin: any;
    opcion_busqueda = 1;
    desglosarShow = 0;
    pageActual: number = 1;
    id:any;

    constructor(private creditosService: CreditosService){
        this.getCreditosValidados();
    }

    getCreditosValidados(){
        this.creditosService.getCreditosValidados().subscribe((data: CreditoSE[])=>
        (this.creditos = data));

    }
    mostrarConstancia(pk_alumno_credito){
        var win = window.open('http://localhost:8000/api/constancia-view-o_o_s_e/' + pk_alumno_credito.toString(), '_blank');
        win.focus();

    }

    getCreditosValidadosByNc(){
        this.creditosService.getCreditosValidadosByNumC(this.num_control).subscribe((data: CreditoSE[])=>
        (this.creditos = data));
    }

    getCreditosByLin(){//buscar creditos por lineamiento
        this.creditosService.getCreditosValidadosByLin(this.lin).subscribe((data: CreditoSE[])=>
            (this.creditos = data));
        
    }
    getLineamientos(){//obtener lineamientos para mostrarlos en las opciones de busqueda
        this.creditosService.get().subscribe((data: Lineamiento[])=>
            this.lineamientos = data);
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

      desglosar(pk_alumno_credito){//mostrar las actividades de cada credito
        if(this.desglosarShow == 0){
            this.desglosarShow = 1;
            this.creditosService.getActByCredito(pk_alumno_credito).subscribe((data: Actividad[])=>{
            this.actividades = data;
            this.id = pk_alumno_credito;
        },(error)=>{alert("Ocurrió un error")});
        }else{
            this.desglosarShow = 0;
            if (pk_alumno_credito != this.id){
                this.desglosarShow = 1;
                this.creditosService.getActByCredito(pk_alumno_credito).subscribe((data: Actividad[])=>{
                    this.actividades = data;
                    this.id = pk_alumno_credito;
                },(error)=>{alert("Ocurrió un error")});
            }
        }
        
    }

    generarExcel(){
        if(confirm("Se generara un listado de los alumnos que ya  han acreditado las actividades complementarias ¿Desea continuar?")){
            var win = window.open('http://localhost:8000/api/generar-excel-ac', '_blank');
            win.focus();
        }

    }
}