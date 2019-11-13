import { Component } from '@angular/core';
import { CreditoSE } from './interfaces/creditoSE';
import { Lineamiento } from './interfaces/lineamiento';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {popupGenerarConstanciasComponent} from './popup-generarConstancias.component';

//edicin


@Component({
    templateUrl: './generarConstancias.component.html'
})

export class GenerarConstanciasComponent {
    creditos: CreditoSE[];
    pageActual: number = 1;
    idUsuario: any;


 
    constructor(private creditosService: CreditosService,  private dialog: MatDialog){
        this.getConstanciasPorCrear();
    }

    getConstanciasPorCrear(){
        this.idUsuario = sessionStorage.getItem('IdUsuario');
        this.creditosService.getClaveCarrera(this.idUsuario).subscribe((data)=>{
            this.creditosService.getAlumnosByCarrera(data[0].FK_CARRERA).subscribe((data: CreditoSE[])=>{
                this. creditos = data;
            },(error)=>{alert('Ocurrió un error');});
        },(error)=>{alert("Ocurrio un error")});        
    }

    openDialog(pk_alumno_credito){
        const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(popupGenerarConstanciasComponent, dialogConfig);

     dialogRef.afterClosed().subscribe(
      data => {
                data.pk_alumno_credito = pk_alumno_credito;
                this.creditosService.generarConstancia(data).subscribe((d)=>{
                    alert("Constancia generada correctamente");
                    this.getConstanciasPorCrear();
                }, (error)=>{
                    alert("ocurrio un error " + error);
                });
                console.log(data);                
      }, error =>  alert("Ocurrio un error"));//this.logService.print(error, LogService.ERROR_MSG));
  }
/*
private saveNewCourse(courseToInsert: Course) {
    this.apiService.addCourse(courseToInsert).subscribe();
  }

ngOnDestroy(): void {
    this.sub.unsubscribe()
    } */
}
