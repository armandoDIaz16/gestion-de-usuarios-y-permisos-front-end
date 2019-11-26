import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfacePerfil} from '../../usuarios/_models/PerfilModel';
import {PerfilService} from '../../../services/perfil.service';

@Component({
    selector: 'app-datos-alumno',
    templateUrl: './datos-alumno.component.html',
    styleUrls: ['./datos-alumno.component.scss']
})
export class DatosAlumnoComponent implements OnInit {

    public error = null;
    public perfil: InterfacePerfil = null;

    constructor(private perfil_service: PerfilService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
    ) {
        this.perfil = <InterfacePerfil>{};
    }

    async ngOnInit() {
        const data_perfil = await this.perfil_service.get_perfil(parseInt(this.route.snapshot.queryParamMap.get('alumno')));
        if (data_perfil) {
            this.perfil = <InterfacePerfil>data_perfil;
        }
    }

    handleResponse(data) {
        if (data.data) {
            this.perfil = data.data;
        }
    }

    handleError(error) {
        this.error = error.error.error;
    }

    volver() {
        history.back();
    }

}
