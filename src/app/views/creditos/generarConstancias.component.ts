import { Component } from '@angular/core';
import { CreditoSE } from './interfaces/creditoSE';
import { Lineamiento } from './interfaces/lineamiento';
import { Actividad } from './interfaces/actividad';
import { CreditosService } from '../../services/creditos.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {popupGenerarConstanciasComponent} from './popup-generarConstancias.component';




@Component({
    templateUrl: './generarConstancias.component.html'
})

export class GenerarConstanciasComponent {
    creditos: CreditoSE[];
    pageActual: number = 1;

 
    constructor(private creditosService: CreditosService,  private dialog: MatDialog){
        this.getConstanciasPorCrear();
    }

    getConstanciasPorCrear(){
        this.creditosService.getAlumnosByCarrera('ISC').subscribe((data: CreditoSE[])=>{
            this. creditos = data;
        },(error)=>{alert('Ocurrió un error');})
    }

    openDialog(){
        const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(popupGenerarConstanciasComponent, dialogConfig);

     dialogRef.afterClosed().subscribe(
      data => {
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
