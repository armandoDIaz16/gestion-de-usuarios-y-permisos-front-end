import {Component, OnInit} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposAdminService} from '../../../services/tutorias/coord_institucional/grupos-admin.service';

@Component({
    selector: 'app-grupos-seguimiento-admin',
    templateUrl: '../../../views/tutorias/coord_institucional/grupos-seguimiento-admin.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/grupos-seguimiento-admin.component.scss']
})
export class GruposSeguimientoAdminComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfacecCarreraGruposTutoria;
    public display = '';

    constructor(private grupos_service: GruposAdminService) {
        this.lista_grupos = <InterfacecCarreraGruposTutoria>{};
    }

    ngOnInit() {
        this.display = 'block';
        this.grupos_service.get_grupos_seguimiento().subscribe(
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
