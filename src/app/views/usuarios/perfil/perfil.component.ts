import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PerfilService} from './perfil.service';
import {InterfaceEstadoCivil, InterfacePerfil} from './_models/PerfilModel';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    /* INICIO DATOS PARA PERFIL */
    public error = null;
    public data = null;
    public perfil: InterfacePerfil;
    public array_estado_civil: InterfaceEstadoCivil[];
    public usuario = sessionStorage.getItem('IdUsuario');

    /* FIN DATOS PARA PERFIL */

    constructor(
        private router: Router,
        private perfil_services: PerfilService,
        private http: HttpClient
    ) {

    }

    /* INICIO FUNCIONES PARA PERFIL */
    ngOnInit() {
        this.perfil_services.get_perfil(parseInt(this.usuario)).subscribe(
            data => this.handleResponseInit(data),
            error => this.handleError(error)
        );

        this.perfil_services.get_estado_civiles().subscribe(
            data => this.array_estado_civil = data,
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
        this.perfil_services.guardar_perfil(this.perfil).subscribe(
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

    handleError(error) { }

}
