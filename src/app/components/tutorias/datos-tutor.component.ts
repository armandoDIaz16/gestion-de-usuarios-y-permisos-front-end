import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';
import {PerfilService} from '../../services/perfil.service';

@Component({
    selector: 'app-datos-tutor',
    templateUrl: '../../views/tutorias/datos-tutor.component.html',
    styleUrls: ['../../views/tutorias/datos-tutor.component.scss']
})
export class DatosTutorComponent implements OnInit {

    public error = null;
    public data = null;
    public perfil: InterfacePerfil = null;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;


    public pk_usuario = sessionStorage.getItem('IdEncriptada');

    constructor(private perfil_service: PerfilService,) {
        this.perfil = <InterfacePerfil>{};
        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

        this.perfil_service.get_perfil_tutor(this.pk_usuario).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        this.perfil = data.data
        this.display = 'none';
    }

    handleError(error) {
        alert('Ha ocurrido un error, inténtalo de nuevo');
        this.display = 'none';
    }

}
