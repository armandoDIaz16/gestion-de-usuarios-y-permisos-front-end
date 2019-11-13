import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { AspiranteService } from '../../services/aspirante.service';
import { PeriodoService } from '../../services/periodo.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-repositorio_tesis',
  templateUrl: './repositorio_tesis.component.html',
  styleUrls: ['./repositorio_tesis.component.scss'],
  providers: [
    FormularioService,
    PeriodoService,
    AspiranteService]
})
export class RepositorioTesisComponent implements OnInit {  
  public tesisLista = [1,2,3,4,5,6,7,8,9,10,11,12,13];

  constructor() {}


  ngOnInit() {
    
  }
}



