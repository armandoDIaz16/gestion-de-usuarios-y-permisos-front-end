import {Component, OnInit} from '@angular/core';
import {InterfaceEncuestaPendiente} from '../_models/EncuestasModel';
import {HttpClient} from '@angular/common/http';
import {EncuestasService} from '../encuestas/encuestas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InterfaceAlumno} from '../_models/AlumnoModel';
import {DatosAlumnoService} from '../datos-alumno/datos-alumno.service';
import {PerfilService} from '../../usuarios/perfil/perfil.service';
import {InterfacePerfil} from '../../usuarios/_models/PerfilModel';

@Component({
    selector: 'app-encuestas-alumno',
    templateUrl: './encuestas-alumno.component.html',
    styleUrls: ['./encuestas-alumno.component.scss']
})
export class EncuestasAlumnoComponent implements OnInit {

    public hay_encuestas = null;
    public lista_encuestas: InterfaceEncuestaPendiente[];
    public alumno: InterfacePerfil;
    public usuario = null;

    constructor(private encuestas_service: EncuestasService,
                private perfil_service: PerfilService,
                private http: HttpClient,
                private router: Router,
                private route: ActivatedRoute) {
        this.hay_encuestas = false;
        this.usuario = parseInt(this.route.snapshot.queryParamMap.get('alumno'));
        this.alumno = <InterfacePerfil>{};
    }

    async ngOnInit() {
        this.encuestas_service.get_encuestas(parseInt(this.usuario)).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );

        const data_perfil = await this.perfil_service.get_perfil(parseInt(this.route.snapshot.queryParamMap.get('alumno')));
        if (data_perfil) {
            this.alumno = <InterfacePerfil>data_perfil;
        }
    }

    handleResponse(data) {
        if (data.data) {
            this.hay_encuestas = true;
            this.lista_encuestas = data.data;
        } else {
            this.hay_encuestas = false;
        }
    }

    handleResponseAlumno(data) {
        if (data.data) {
            this.alumno = data.data;
        } else {
            this.hay_encuestas = false;
        }
    }

    handleError(error) {
    }

    volver() {
        history.back();
    }

}
