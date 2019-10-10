import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceEncuestaCompleta, InterfacePreguntaEncuesta} from '../_models/EncuestasModel';
import {ReporteEncuestaService} from './reporte-encuesta.service';
import {ResponderEncuestaService} from '../responder-encuesta/responder-encuesta.service';
import {Helpers} from '../responder-encuesta/helpers';

@Component({
    selector: 'app-reporte-encuesta',
    templateUrl: './reporte-encuesta.component.html',
    styleUrls: ['./reporte-encuesta.component.scss']
})
export class ReporteEncuestaComponent implements OnInit {

    public pk_aplicacion_encuesta: number;
    public hay_encuesta = null;
    public encuesta_completa = <InterfaceEncuestaCompleta>{};
    public pregunta_inicial: number;
    public cantidad_preguntas: number;

    constructor(private reporte_encuesta: ReporteEncuestaService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private helpers: Helpers) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('aplicacion'));
    }

    ngOnInit() {
        this.reporte_encuesta.get_reporte_encuesta(this.pk_aplicacion_encuesta).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.encuesta_completa = data.data;
            this.pregunta_inicial = this.encuesta_completa.SECCIONES[0].PREGUNTAS[0].PK_PREGUNTA;
            this.cantidad_preguntas = this.encuesta_completa.SECCIONES[0].PREGUNTAS.length;
            // console.log(this.encuesta_completa);
        } else {
            this.hay_encuesta = false;
        }
    }

    handleError(error) {
    }

    volver() {
        history.back();
    }

}
