import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../../models/tutorias/GrupoModel';
import {DetalleGrupoService} from '../../services/tutorias/detalle-grupo.service';

@Component({
    selector: 'app-detalle-grupo',
    templateUrl: '../../views/tutorias/detalle-grupo.component.html',
    styleUrls: ['../../views/tutorias/detalle-grupo.component.scss']
})
export class DetalleGrupoComponent implements OnInit {

    public lista_grupos: InterfaceGruposTutoria;
    public detalle_grupo: InterfaceGrupoTutoria ;
    public error = null;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private detalle_grupo_service: DetalleGrupoService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router
    ) {
        this.detalle_grupo = <InterfaceGrupoTutoria>{};
        this.detalle_grupo.HORARIO = [];
        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

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

        this.display = 'none';
    }

    handleError(error) {
        this.error = error.error.error;

        this.display = 'none';
    }

    reporte_perfil_individual(pk_encriptada: string) {
        open(
            this.detalle_grupo_service.get_url_back('get_pdf_perfil_personal_ingreso?pk_encriptada=' + pk_encriptada),
            '_blank',
            ''
        );
    }

}
