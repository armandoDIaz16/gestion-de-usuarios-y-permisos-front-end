import { Component, OnInit } from '@angular/core';
import {Anteproyectos} from './anteproyectos';
import { ValidarModuloService } from '../../../services/validarModulo.service';



@Component({
  selector: 'app-banco-vista',
  templateUrl: './banco_vista.component.html',
  styleUrls: ['./banco_vista.component.scss'],
  providers: [Anteproyectos, ValidarModuloService]

})
export class Banco_vistaComponent implements OnInit {

    public anteproyectosLista = [];
    public mostrarModulo = false;
    usuario = sessionStorage.getItem('IdUsuario');

    constructor(private anteproyectosService: Anteproyectos, private validarModuloService: ValidarModuloService) {}

    ngOnInit() {
        this.mostrarModulo = this.validarModuloService.getMostrarModulo('Banco vista');
        if (!this.mostrarModulo) {
            return;
        }
        this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
    }

}
