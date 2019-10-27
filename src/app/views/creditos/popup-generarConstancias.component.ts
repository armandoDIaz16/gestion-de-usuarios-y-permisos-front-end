import { Component } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CreditosService } from '../../services/creditos.service';
import { nlLocale } from 'ngx-bootstrap';
//edicion
@Component({
    templateUrl: './popup-generarConstancias.component.html'
})

export class popupGenerarConstanciasComponent {
    datos = {
        memorandum: null,
        suscribe: null,
        nombre: null,
        pk_alumno_credito: null
    };
    
    constructor( private dialogRef: MatDialogRef<popupGenerarConstanciasComponent>){}

    closeWithoutSave() {
        this.dialogRef.close();
      }
}
