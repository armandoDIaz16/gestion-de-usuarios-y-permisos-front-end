import { Component, OnInit } from '@angular/core';
import { CreditosService } from '../../services/creditos.service';
@Component({
    templateUrl: './subirRegistrosCreditos.component.html',
  })

  export class SubirRegistrosCreditosComponent{

    res = "";

constructor( private creditosService: CreditosService){}

    uploadFile2(event) {
        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('file', elem.files[0]);
            this.creditosService.enviarExcel(formData).subscribe((data)=>{
                //console.log(data)
                this.res = data;
            },(err)=>{alert("Ocurrio un error")});
        }
        elem.value = ''; // line 9

    }

  }