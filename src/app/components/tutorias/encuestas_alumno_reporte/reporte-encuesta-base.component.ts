import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReporteEncuestaService} from '../../../services/tutorias/reporte-encuesta.service';

@Component({
    selector: 'app-reporte-encuesta-tutor',
    templateUrl: '../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.html',
    styleUrls: ['../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.scss']
})
export class ReporteEncuestaBaseComponent {
    /* Configuracion */
    public rol = '';
    public display = '';
    public error = null;

    /* Permisos */
    public ver_detalle_encuestas_alumno = false;

    /* Ventanas modales */

    /* Datos propios */
    public reporte = null;
    public pk_aplicacion = '';

    constructor(private reporte_service: ReporteEncuestaService,
                protected router: Router,
                protected activated_route: ActivatedRoute) {
    }

    get_reporte() {
        this.display = 'block';
        this.reporte_service.get_reporte('?pk_aplicacion=' + this.pk_aplicacion).subscribe(
            data => {
                this.reporte = data.data;
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
}
