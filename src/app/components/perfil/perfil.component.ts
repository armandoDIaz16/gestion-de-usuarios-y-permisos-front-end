import {Component, OnDestroy, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {navItems} from './../../_nav';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

import {PerfilService} from './perfil.service';
import {InterfaceEstadoCivil, InterfacePerfil} from './_models/PerfilModel';
import {EncuestasService} from '../../views/tutorias/encuestas/encuestas.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnDestroy, OnInit {

    public loggedIn: boolean;
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement;
    public navItems = navItems;
    public mostrarModulo = false;

    /* INICIO DATOS PARA PERFIL */
    public error = null;
    public data = null;
    public perfil: InterfacePerfil;
    public array_estado_civil: InterfaceEstadoCivil[];
    public usuario = sessionStorage.getItem('IdUsuario');

    /* FIN DATOS PARA PERFIL */

    constructor(
        private Auth: AuthService,
        private router: Router,
        private Token: TokenService,
        private perfil_services: PerfilService,
        private http: HttpClient,
        @Inject(DOCUMENT) _document?: any
    ) {
        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
        });
        this.element = _document.body;
        this.changes.observe(<Element>this.element, {
            attributes: true,
            attributeFilter: ['class']
        });
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

    /* FIN FUNCIONES PARA PERFIL */

    logout(event: MouseEvent) {
        event.preventDefault();
        this.Token.remove();
        this.Auth.changeAuthStatus(false);
        this.router.navigateByUrl('/login');
    }

    ngOnDestroy(): void {
        this.changes.disconnect();
    }

}
