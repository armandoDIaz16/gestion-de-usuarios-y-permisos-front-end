import {Component} from '@angular/core';
import {EncuestasService} from '../../../services/tutorias/encuestas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PerfilService} from '../../../services/perfil.service';
import {Modulos} from 'app/config/Tutorias';

@Component({
    selector: 'app-encuestas-alumno',
    templateUrl: '../../../views/tutorias/encuestas_alumno/encuestas-alumno.html',
    styleUrls: ['../../../views/tutorias/encuestas_alumno/encuestas-alumno.scss']
})
export class EncuestasBaseComponent {
    /* Configuracion */
    public rol = null;
    public token_rol = '';
    public display = '';
    public error = null;

    /* Permisos */
    public ver_detalle_encuestas_alumno = false;

    /* Ventanas modales */

    /* Datos propios */
    public lista_encuestas = [];
    public alumno = null;
    public usuario = null;
    public pk_alumno = '';

    constructor(private encuestas_service: EncuestasService,
                private perfil_service: PerfilService,
                protected router: Router,
                protected route: ActivatedRoute) { }

    get_encuestas() {
        this.encuestas_service.get_encuestas(this.pk_alumno).subscribe(
            data => {
                this.lista_encuestas = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    get_perfil() {
        this.perfil_service.get_perfil(
            '?pk_encriptada=' + this.pk_alumno
        ).subscribe(
            data => {
                this.alumno = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    muestra_respuestas(pk_encuesta) {
        switch (parseInt(pk_encuesta, 10)) {
            case 1: // encuesta pasatiempos
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_PASATIEMPOS);
            case 2: // encuesta salud
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_SALUD);
            case 3: // encuesta condicion socioeconomica
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_COND_SOCIOECONOMICA);
            case 4: // encuesta Condición Académica
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_COND_ACADEMICA);
            case 5: // encuesta Condición Familiar
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_COND_FAMILIAR);
            case 6: // encuesta Hábitos de estudio
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_HABITOS);
            case 8: // encuesta 16 PF
                return Modulos.valida_rol_accion(this.rol, Modulos.RESPUESTAS_ENCUESTA_16PF);
        }
    }

    muestra_reporte(pk_encuesta) {
        switch (parseInt(pk_encuesta, 10)) {
            case 1: // encuesta pasatiempos
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_PASATIEMPOS);
            case 2: // encuesta salud
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_SALUD);
            case 3: // encuesta condicion socioeconomica
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_COND_SOCIOECONOMICA);
            case 4: // encuesta Condición Académica
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_COND_ACADEMICA);
            case 5: // encuesta Condición Familiar
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_COND_FAMILIAR);
            case 6: // encuesta Hábitos de estudio
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_HABITOS);
            case 8: // encuesta 16 PF
                return Modulos.valida_rol_accion(this.rol, Modulos.REPORTE_ENCUESTA_16PF);
        }
    }

    valida_permisos() {
        this.rol = Modulos.rol_token(this.token_rol);
        this.ver_detalle_encuestas_alumno = Modulos.valida_rol_accion(this.rol, Modulos.VER_DETALLE_ENCUESTAS_ALUMNO);
    }

    volver() {
        history.back();
    }

}
