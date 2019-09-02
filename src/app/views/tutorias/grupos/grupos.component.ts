import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../_models/GrupoModel';
import {GruposService} from './grupos.service';

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

}
