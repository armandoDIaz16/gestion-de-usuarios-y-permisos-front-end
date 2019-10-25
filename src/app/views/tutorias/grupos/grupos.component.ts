import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../_models/GrupoModel';
import {GruposService} from './grupos.service';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
    selector: 'app-grupos',
    templateUrl: './grupos.component.html',
    styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfaceGruposTutoria;

    constructor(private grupos_service: GruposService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
    ) {
        this.lista_grupos = <InterfaceGruposTutoria>{};
    }

    ngOnInit() {
        this.grupos_service.get_grupos(parseInt(sessionStorage.getItem('IdUsuario'))).subscribe(
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
