import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceEncuestaCompleta, InterfacePreguntaEncuesta} from '../../models/tutorias/EncuestasModel';
import {ReporteEncuestaService} from '../../services/tutorias/reporte-encuesta.service';
import {ResponderEncuestaService} from '../../services/tutorias/responder-encuesta.service';
import {Helpers} from './helpers';

@Component({
    selector: 'app-reporte-encuesta',
    templateUrl: '../../views/tutorias/reporte-encuesta.component.html',
    styleUrls: ['../../views/tutorias/reporte-encuesta.component.scss']
})
export class ReporteEncuestaComponent implements OnInit {

    public pk_aplicacion_encuesta: number;
    public hay_encuesta = null;
    public encuesta_completa = <InterfaceEncuestaCompleta>{};
    public pregunta_inicial: number;
    public cantidad_preguntas: number;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private reporte_encuesta: ReporteEncuestaService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private helpers: Helpers) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('aplicacion'));
        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

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

        this.display = 'none';
    }

    handleError(error) {
        this.display = 'none';
    }

    volver() {
        history.back();
    }

}
