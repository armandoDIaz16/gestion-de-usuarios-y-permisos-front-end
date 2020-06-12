import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GruposInicialDetalleService} from '../../../services/tutorias/grupos-inicial-detalle.service';
import {Modulos} from '../../../config/Tutorias';

@Component({
    selector: 'app-detalle-grupo',
    templateUrl: '../../../views/tutorias/grupos_inicial_detalle/detalle-grupo.html',
    styleUrls: ['../../../views/tutorias/grupos_inicial_detalle/detalle-grupo.scss']
})
export class DetalleBaseComponent {
    /* Configuracion */
    public rol = null;
    public token_rol = null;
    public display = '';
    public error = null;

    /* Permisos */
    public ver_detalles_grupo = false;
    public ver_horario_alumno = false;
    public ver_datos_personales_alumno = false;
    public ver_detalle_encuestas_alumno = false;
    public ver_perfil_personal = false;

    /* Ventanas modales */

    /* Datos propios */
    public detalle_grupo: any;
    public pk_grupo;

    constructor(private detalle_grupo_service: GruposInicialDetalleService,
                protected router: Router,
                protected route: ActivatedRoute
    ) { }

    protected get_detalle() {
        this.detalle_grupo_service.get_detalle(
            '?grupo=' + this.pk_grupo
        ).subscribe(
            data => {
                this.detalle_grupo = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    public perfil_individual(pk_encriptada: string) {
        open(
            this.detalle_grupo_service.get_url_back('c413a63cce7f8f6a6f7b9179a20bfbe0?pk_encriptada=' + pk_encriptada),
            '_blank',
            ''
        );
    }

    valida_permisos() {
        this.rol = Modulos.rol_token(this.token_rol);
        this.ver_detalles_grupo = Modulos.valida_rol_accion(this.rol, Modulos.VER_DETALLES_GRUPO);
        this.ver_horario_alumno = Modulos.valida_rol_accion(this.rol, Modulos.VER_HORARIO_ALUMNO);
        this.ver_datos_personales_alumno = Modulos.valida_rol_accion(this.rol, Modulos.VER_DATOS_PERSONALES_ALUMNO);
        this.ver_detalle_encuestas_alumno = Modulos.valida_rol_accion(this.rol, Modulos.VER_DETALLE_ENCUESTAS_ALUMNO);
        this.ver_perfil_personal = Modulos.valida_rol_accion(this.rol, Modulos.VER_PERFIL_PERSONAL);
    }

    protected volver() {
        history.back();
    }
}
