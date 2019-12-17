import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';
import {PerfilService} from '../../services/perfil.service';

@Component({
    selector: 'app-datos-alumno',
    templateUrl: '../../views/tutorias/datos-alumno.component.html',
    styleUrls: ['../../views/tutorias/datos-alumno.component.scss']
})
export class DatosAlumnoComponent implements OnInit {

    public error = null;
    public perfil: InterfacePerfil = null;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private perfil_service: PerfilService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
    ) {
        this.perfil = <InterfacePerfil>{};
        this.display = 'none';
    }

    async ngOnInit() {
        this.display = 'block';

        const data_perfil = await this.perfil_service.get_perfil(parseInt(this.route.snapshot.queryParamMap.get('alumno')));
        if (data_perfil) {
            this.perfil = <InterfacePerfil>data_perfil;
        }

        this.display = 'none';
    }

    volver() {
        history.back();
    }

}
