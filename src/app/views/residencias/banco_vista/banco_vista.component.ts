import { Component, OnInit } from '@angular/core';
import {Anteproyectos} from './anteproyectos';



@Component({
  selector: 'app-banco-vista',
  templateUrl: './banco_vista.component.html',
  styleUrls: ['./banco_vista.component.scss'],
  providers: [Anteproyectos]

})
export class Banco_vistaComponent implements OnInit {

    public anteproyectosLista = [];

    constructor(private anteproyectosService: Anteproyectos){}

    ngOnInit(){
      this.anteproyectosService.getAnteproyectos().subscribe(data => this.anteproyectosLista = data);
    }

}
