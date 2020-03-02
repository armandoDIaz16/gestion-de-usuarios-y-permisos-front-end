import {Component, OnInit} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposCoordDepService} from '../../../services/tutorias/coord_departamental/grupos-coord-dep.service';

@Component({
    selector: 'app-grupos-inicial-coord-dep',
    templateUrl: '../../../views/tutorias/coord_departamental/grupos-inicial-coord-dep.component.html',
    styleUrls: ['../../../views/tutorias/coord_departamental/grupos-inicial-coord-dep.component.scss']
})
export class GruposInicialCoordDepComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfacecCarreraGruposTutoria;
    public display = 'block';

    constructor(private grupos_service: GruposCoordDepService) {
        this.lista_grupos = <InterfacecCarreraGruposTutoria>{};
    }

    ngOnInit() {
        this.grupos_service.get_grupos_actuales().subscribe(
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
