import {Component, OnInit} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../_models/GrupoModel';
import {GruposService} from '../../../services/grupos.service';

@Component({
    selector: 'app-grupos',
    templateUrl: './grupos.component.html',
    styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfacecCarreraGruposTutoria;

    constructor(private grupos_service: GruposService) {
        this.lista_grupos = <InterfacecCarreraGruposTutoria>{};
    }

    ngOnInit() {
        this.grupos_service.get_grupos().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.lista_grupos = data.data;
        }
    }

    handleError(error) {
        this.error = error.error.error;
    }

    reporte_perfil_grupal(pk_grupo: number) {
        open(
            this.grupos_service.get_url_back('get_pdf_perfil_grupal_ingreso?grupo=' + pk_grupo),
            '_blank',
            ''
        )
    }

}
