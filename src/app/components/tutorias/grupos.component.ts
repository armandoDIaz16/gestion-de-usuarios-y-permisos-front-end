import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../../models/tutorias/GrupoModel';
import {GruposService} from '../../services/grupos.service';

@Component({
    selector: 'app-grupos',
    templateUrl: '../../views/tutorias/grupos.component.html',
    styleUrls: ['../../views/tutorias/grupos.component.scss']
})
export class GruposComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfacecCarreraGruposTutoria;
    public display = 'block';

    @ViewChild('loaderModal') loaderModal;

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
        /*this.loaderModal.show();*/

        this.display = 'none';
        if (data.data) {
            this.lista_grupos = data.data;
        }

        /*this.loaderModal.hide();*/
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
