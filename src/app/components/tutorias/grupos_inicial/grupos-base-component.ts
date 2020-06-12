import {Component} from '@angular/core';
import {GruposInicialService} from '../../../services/tutorias/grupos-inicial.service';
import {Modulos} from '../../../config/Tutorias';
import {Router} from '@angular/router';

@Component({
    selector: 'app-grupos-inicial-admin',
    templateUrl: '../../../views/tutorias/grupos_inicial/grupos-inicial.html',
    styleUrls: ['../../../views/tutorias/grupos_inicial/grupos-inicial.scss']
})
export class GruposBaseComponent {
    /* Configuracion */
    public rol = '';
    public token_rol = null;
    public display = '';
    public error = null;

    /* Permisos */
    public ver_grupos_tutoria_inicial = false;
    public ver_perfil_grupal = false;
    public ver_detalles_grupo = false;

    /* Ventanas modales */

    /* Datos propios */
    public lista_grupos = [];

    /* Funciones */
    constructor(private grupos_service: GruposInicialService,
                protected router: Router) {
    }

    public get_grupos() {
        this.grupos_service.get_grupos('?token=' + sessionStorage['IdEncriptada'] + '&rol=' + this.rol).subscribe(
            data => {
                this.lista_grupos = data.data;
            },
            error => {
                this.display = 'none';
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    public perfil_grupal(pk_grupo: number) {
        open(
            this.grupos_service.get_url_back('de99193444466a46d939f6e1fe025e10?grupo=' + pk_grupo),
            '_blank',
            ''
        );
    }

    valida_permisos() {
        this.token_rol = Modulos.rol_token(this.rol);
        this.ver_grupos_tutoria_inicial = Modulos.valida_rol_accion(this.rol, Modulos.VER_GRUPOS_TUTORIA_INICIAL);
        this.ver_perfil_grupal = Modulos.valida_rol_accion(this.rol, Modulos.VER_PERFIL_GRUPAL);
        this.ver_detalles_grupo = Modulos.valida_rol_accion(this.rol, Modulos.VER_DETALLES_GRUPO);
    }
}
