import { Component, OnInit } from '@angular/core';
import {Anteproyectos} from './anteproyectos';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-banco-vista',
  templateUrl: './banco_vista.component.html',
  styleUrls: ['./banco_vista.component.scss'],
  providers: [Anteproyectos, ValidarModuloService]

})
export class Banco_vistaComponent extends GenericServicesService implements OnInit {

    ruta = GenericServicesService.ENDPOINT;
    public anteproyectosLista = [];
    public mostrarModulo = false;
    usuario = sessionStorage.getItem('IdUsuario');

    constructor(private http: HttpClient, private anteproyectosService: Anteproyectos, private validarModuloService: ValidarModuloService) {
        super(http); }

    ngOnInit() {
        this.mostrarModulo = this.validarModuloService.getMostrarModulo('Banco vista');
        if (!this.mostrarModulo) {
            return;
        }
        this.anteproyectosService.getAnteproyectos(this.usuario).subscribe(data => this.anteproyectosLista = data);
    }

}
