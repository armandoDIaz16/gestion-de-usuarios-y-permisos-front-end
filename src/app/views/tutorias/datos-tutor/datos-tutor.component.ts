import {Component, OnInit} from '@angular/core';
import {InterfacePerfil} from '../../usuarios/_models/PerfilModel';
import {PerfilService} from '../../../services/perfil.service';

@Component({
    selector: 'app-datos-tutor',
    templateUrl: './datos-tutor.component.html',
    styleUrls: ['./datos-tutor.component.scss']
})
export class DatosTutorComponent implements OnInit {

    public error = null;
    public data = null;
    public perfil: InterfacePerfil = null;

    public pk_usuario = sessionStorage.getItem('IdEncriptada');

    constructor(private perfil_service: PerfilService,) {
        this.perfil = <InterfacePerfil>{};
    }

    ngOnInit() {
        this.perfil_service.get_perfil_tutor(this.pk_usuario).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        this.perfil = data.data
    }

    handleError(error) {
        alert('Ha ocurrido un error, inténtalo de nuevo');
    }

}
