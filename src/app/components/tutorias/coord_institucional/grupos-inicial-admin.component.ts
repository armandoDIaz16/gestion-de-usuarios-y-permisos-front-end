import {Component, OnInit} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposInicialService} from '../../../services/tutorias/grupos-inicial.service';

@Component({
    selector: 'app-grupos-inicial-admin',
    templateUrl: '../../../views/tutorias/coord_institucional/grupos-inicial-admin.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/grupos-inicial-admin.component.scss']
})
export class GruposInicialAdminComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfacecCarreraGruposTutoria;
    public display = 'block';

    constructor(private grupos_service: GruposInicialService) {
        this.lista_grupos = <InterfacecCarreraGruposTutoria>{};
    }

    ngOnInit() {
        this.grupos_service.get_grupos_actuales('Algo').subscribe(
            data => this.grupos_actuales_ok(data),
            error => this.grupos_actuales_error(error)
        );
    }

    grupos_actuales_ok(data) {
        this.display = 'none';
        this.lista_grupos = data;
    }

    grupos_actuales_error(error) {
        this.display = 'none';
        this.error = error.error.error;
    }

    reporte_perfil_grupal(pk_grupo: number) {
        open(
            this.grupos_service.get_url_back('get_pdf_perfil_grupal_ingreso?grupo=' + pk_grupo),
            '_blank',
            ''
        );
    }
}
