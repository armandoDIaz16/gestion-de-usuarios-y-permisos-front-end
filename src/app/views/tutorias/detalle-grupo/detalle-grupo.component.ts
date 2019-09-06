import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../_models/GrupoModel';
import {DetalleGrupoService} from './detalle-grupo.service';

@Component({
    selector: 'app-detalle-grupo',
    templateUrl: './detalle-grupo.component.html',
    styleUrls: ['./detalle-grupo.component.scss']
})
export class DetalleGrupoComponent implements OnInit {

    public lista_grupos: InterfaceGruposTutoria;
    public detalle_grupo: InterfaceGrupoTutoria;
    public error = null;

    constructor(private detalle_grupo_service: DetalleGrupoService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router
    ) {
    }

    ngOnInit() {
        this.detalle_grupo_service.get_detalle_grupo(parseInt(this.route.snapshot.queryParamMap.get('clave_grupo'))).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.lista_grupos = data.data;
            this.detalle_grupo = this.lista_grupos.GRUPOS[0];
        }
    }

    handleError(error) {
        this.error = error.error.error;
    }

}
