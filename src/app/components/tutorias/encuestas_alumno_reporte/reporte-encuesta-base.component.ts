import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReporteEncuestaService} from '../../../services/tutorias/reporte-encuesta.service';
import {Modulos} from '../../../config/Tutorias';
import {AreaAcademicaServiceService} from '../../../services/area-academica-service.service';
import {EncuestasService} from '../../../services/tutorias/encuestas.service';
import {CarrerasService} from '../../../services/general/carreras.service';

@Component({
    selector: 'app-reporte-encuesta-tutor',
    templateUrl: '../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.html',
    styleUrls: ['../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.scss']
})
export class ReporteEncuestaBaseComponent {
    /* Configuracion */
    public rol = '';
    public token_rol = null;
    public display = '';
    public error = null;

    /* Permisos */
    public ver_reporte_encuesta = false;
    public exporta_reporte_encuesta = false;

    /* Ventanas modales */
    @ViewChild('modal_form') modal_form;

    /* Datos propios */
    public reporte = null;
    public lista_encuestas = null;
    public lista_periodos = null;
    public lista_areas_academicas = null;
    public lista_carreras = null;
    public lista_grupos = null;
    public reporte_encuesta = null;
    public reporte_periodo = null;
    public reporte_area = null;
    public reporte_carrera = null;
    public reporte_grupo = null;

    constructor(private reporte_service: ReporteEncuestaService,
                protected router: Router,
                private areas_service: AreaAcademicaServiceService,
                private encuestas_service: EncuestasService,
                private carreras_service: CarrerasService) {
    }

    genera_reporte() {
        /*this.display = 'block';
        this.reporte_service.get_reporte('').subscribe(
            data => {
                this.reporte = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );*/
    }

    cambio_area() {
        if (this.reporte_area === '0') {
            this.reporte_grupo = 0;
            this.reporte_carrera = 0;
            this.lista_carreras = [];
            this.lista_grupos = [];
        } else {
            this.get_carreras();
        }
    }

    get_carreras() {
        this.display = 'block';
        this.carreras_service.carreras(
            '?area_academica=' + this.reporte_area
        ).subscribe(
            data => {
                this.lista_carreras = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
                this.display = 'none';
            },
            () => {
                this.display = 'none';
            }
        );
    }

    get_periodos() {
        this.display = 'block';
        this.reporte_service.get_periodos('').subscribe(
            data => {
                this.lista_periodos = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
                this.display = 'none';
            },
            () => {
                this.display = 'none';
            }
        );
    }

    get_areas_academicas() {
        this.display = 'block';
        this.areas_service.get_areas(
            '?academica=1'
        ).subscribe(
            data => {
                this.lista_areas_academicas = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
                this.display = 'none';
            },
            () => {
                this.display = 'none';
            }
        );
    }

    get_encuestas() {
        this.display = 'block';
        this.encuestas_service.get_lista_encuestas(
            '?sistema=1'
        ).subscribe(
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

    muestra_modal() {
        this.modal_form.show();
    }

    valida_permisos() {
        this.token_rol = Modulos.rol_token(this.rol);
        this.ver_reporte_encuesta = Modulos.valida_rol_accion(this.rol, Modulos.VER_REPORTE_ENCUESTA);
        this.exporta_reporte_encuesta = Modulos.valida_rol_accion(this.rol, Modulos.EXPORTA_REPORTE_ENCUESTA);
    }
}
