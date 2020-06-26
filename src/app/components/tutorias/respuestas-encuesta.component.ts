import {Component, OnInit} from '@angular/core';
import {RespuestasEncuestaService} from '../../services/tutorias/respuestas-encuesta.service';
import {Modulos} from '../../config/Tutorias';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-respuestas-encuesta',
    templateUrl: '../../views/tutorias/encuestas_alumno_respuestas/respuestas-encuesta.html',
    styleUrls: ['../../views/tutorias/encuestas_alumno_respuestas/respuestas-encuesta.scss']
})
export class RespuestasEncuestaComponent implements OnInit {
    /* Configuracion */
    public rol = '';
    public display = 'block';
    public error = null;

    /* Permisos */
    public ver_horario_alumno = false;

    /* Ventanas modales */

    /* Datos propios */
    public respuesta_encuesta = null;
    public pk_aplicacion = '';

    constructor(private respuestas_service: RespuestasEncuestaService,
                private router: Router,
                private activated_route: ActivatedRoute) {
    }

    ngOnInit() {
        this._init();
        this.get_respuestas();
    }

    get_respuestas() {
        this.display = 'block';
        this.respuestas_service.get_respuestas('?pk_aplicacion=' + this.pk_aplicacion).subscribe(
            data => {
                this.respuesta_encuesta = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    volver() {
        history.back();
    }

    _init() {
        this.respuesta_encuesta = [];
        if (this.activated_route.snapshot.queryParamMap.get('aplicacion')) {
            this.pk_aplicacion = this.activated_route.snapshot.queryParamMap.get('aplicacion');
        } else {
            this.router.navigateByUrl('/home');
        }
        if (this.activated_route.snapshot.queryParamMap.get('token')) {
            this.rol = this.activated_route.snapshot.queryParamMap.get('token');
        } else {
            this.router.navigateByUrl('/home');
        }
    }

}
