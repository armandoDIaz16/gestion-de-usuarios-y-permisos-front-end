import {Component, OnInit} from '@angular/core';
import {ReporteEncuestaBaseComponent} from './reporte-encuesta-base.component';

@Component({
    selector: 'app-reporte-encuesta-tutor',
    templateUrl: '../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.html',
    styleUrls: ['../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.scss']
})
export class ReporteEncuestaAdministradorComponent extends ReporteEncuestaBaseComponent implements OnInit {

    ngOnInit() {
        this._init();
        this.get_periodos();
        this.get_encuestas();
        this.get_areas_academicas();
    }

    _init() {
        this.rol = 'ADM_TUT';
        this.valida_permisos();

        // inicializar variables
        this.reporte = [];
        this.reporte = [];
        this.lista_encuestas = [];
        this.lista_periodos = [];
        this.lista_areas_academicas = [];
        this.lista_carreras = [];
        this.lista_grupos = [];
        this.reporte_encuesta = 0;
        this.reporte_periodo = 0;
        this.reporte_area = 0;
        this.reporte_carrera = 0;
        this.reporte_grupo = 0;

        // validar acceso a pantalla
        if (!this.ver_reporte_encuesta) {
            this.router.navigateByUrl('/home');
        }
    }
}
