import {Component, OnInit} from '@angular/core';
import {InterfacePerfil} from '../_models/PerfilModel';
import {InterfaceEstadoCivil} from '../../_models/GeneralModels';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PerfilService} from './perfil.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    public error = null;
    public data = null;
    public perfil: InterfacePerfil;
    private estados_civiles: InterfaceEstadoCivil[];
    public pk_usuario = sessionStorage.getItem('IdEncriptada');

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private perfil_service: PerfilService,
    ) { }

    ngOnInit() {
        this.perfil_service.get_perfil(parseInt(this.pk_usuario)).subscribe(
            data => this.handleResponseInit(data),
            error => this.handleError(error)
        );

        this.perfil_service.get_estados_civiles().subscribe(
            data => this.estados_civiles = data,
            error => this.handleError(error)
        );
    }

    handleResponseInit(data) {
        // localStorage.setItem('datos_alumno', JSON.stringify(this.data));
        if (data.data) {
            this.perfil = data.data;
        }
    }

    onSubmit() {
        this.perfil_service.guardar_perfil(this.perfil).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        // localStorage.setItem('datos_alumno', JSON.stringify(this.data));
        if (data.data === true) {
            this.router.navigateByUrl('/home');
        }
    }

    handleError(error) {
    }

    volver() {
        history.back();
    }

}
