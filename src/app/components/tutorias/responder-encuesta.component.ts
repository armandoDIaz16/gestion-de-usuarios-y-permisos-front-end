import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceEncuestaCompleta, InterfacePreguntaEncuesta} from '../../models/tutorias/EncuestasModel';
import {ResponderEncuestaService} from '../../services/tutorias/responder-encuesta.service';

import {Helpers} from './helpers';

@Component({
    selector: 'app-responder-encuesta',
    templateUrl: '../../views/tutorias/responder-encuesta.component.html',
    styleUrls: ['../../views/tutorias/responder-encuesta.component.scss']
})
export class ResponderEncuestaComponent implements OnInit {

    public pk_aplicacion_encuesta: number;
    public hay_encuesta = null;
    public encuesta_completa = <InterfaceEncuestaCompleta>{};
    public pregunta_inicial: number;
    public cantidad_preguntas: number;

    constructor(private responder_encuestas_service: ResponderEncuestaService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private helpers: Helpers) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('pk_aplicacion_encuesta'));
    }

    ngOnInit() {
        this.responder_encuestas_service.get_encuesta_completa(this.pk_aplicacion_encuesta).subscribe(
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

    onSubmit() {
        if (this.encuesta_completa.PK_ENCUESTA === 1) {
            this.encuesta_pasatiempos(); // OK
        } else {
            this.procesa_encuesta();
        }
    }

    public handleResponseGuardar(data) {
        if (data.data) {
            this.router.navigateByUrl('/tutorias/encuestas');
        }
    }

    public actualiza_rango(id_escala: string, id_etiqueta: string, index_pregunta: number, index_respuesta: number) {
        (<HTMLInputElement>document.getElementById(id_etiqueta)).innerHTML =
            (<HTMLInputElement>document.getElementById(id_escala)).value;

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].SELECCIONADA =
            parseInt((<HTMLInputElement>document.getElementById(id_escala)).value);

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].RANGO =
            parseInt((<HTMLInputElement>document.getElementById(id_escala)).value);

        // console.log(this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].RANGO);
    }

    public procesa_respuesta(index_pregunta: number, index_respuesta: number) {
        for (let _i = 0; _i < this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS.length; _i++) {
            this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[_i].SELECCIONADA = 0;
        }

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].SELECCIONADA = 1;
    }

    /* INICIO PROCESAMIENTO DE ENCUESTA */
    public procesa_encuesta() {
        if (this.valida_encuesta()) {
            this.responder_encuestas_service.guarda_respuestas(
                this.get_body_encuesta()
            ).subscribe(
                data => this.handleResponseGuardar(data),
                error => this.handleError(error)
            );
        }
    }

    private get_body_encuesta() {
        let preguntas: InterfacePreguntaEncuesta[];
        preguntas = this.encuesta_completa.SECCIONES[0].PREGUNTAS;

        return {
            PK_APLICACION: this.pk_aplicacion_encuesta,
            PK_ENCUESTA: this.encuesta_completa.PK_ENCUESTA,
            RESPUESTAS: this.helpers.procesa_respuestas(preguntas)
        };
    }

    private valida_encuesta() {
        let index_pregunta = 1;
        for (let pregunta of this.encuesta_completa.SECCIONES[0].PREGUNTAS) {
            // lenar contenido de las abiertas
            if (pregunta.FK_TIPO_PREGUNTA == 6) {
                pregunta.RESPUESTAS[0].ABIERTA =
                    (<HTMLInputElement>document.getElementById('res_abierta_' + pregunta.RESPUESTAS[0].PK_RESPUESTA_POSIBLE))
                        .value
                        .trim();
            }

            if (pregunta.FK_TIPO_PREGUNTA == 3) {
                let _i = 0;
                for(let temp_respuesta of pregunta.RESPUESTAS) {
                    if (temp_respuesta.SELECCIONADA == 1) {
                        if (temp_respuesta.ES_MIXTA == 1) {
                            pregunta.RESPUESTAS[_i].ABIERTA =
                                (<HTMLInputElement>document.getElementById('res_mixta_' + temp_respuesta.PK_RESPUESTA_POSIBLE))
                                    .value
                                    .trim();
                            break;
                        } else {
                            pregunta.RESPUESTAS[_i].ABIERTA = '-';
                            break;
                        }
                    }
                    _i++;
                }
            }

            if (this.helpers.valida_pregunta(index_pregunta, pregunta, pregunta.RESPUESTAS) == false) {
                return false;
            }
            index_pregunta++;
        }

        return true;
    }

    /* FIN PROCESAMIENTO DE ENCUESTA */

    /* INICIO PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */
    public encuesta_pasatiempos() {
        var array_respuestas = [], array_original = [];
        for (let _i = 0; _i < 15; _i++) {
            array_respuestas.push(
                parseInt((<HTMLInputElement>document.getElementById('res_' + _i)).value)
            );
            array_original.push({
                pk_respuesta: (<HTMLInputElement>document.getElementById('pk_res_' + _i)).value,
                orden: (<HTMLInputElement>document.getElementById('res_' + _i)).value
            });
        }

        array_respuestas.sort(this.helpers.mayor_a_menor);

        if (this.helpers.valida_array_respuestas_pasatiempos(array_respuestas)) {
            this.responder_encuestas_service.guarda_respuestas_pasatiempos(
                this.pk_aplicacion_encuesta,
                this.encuesta_completa.PK_ENCUESTA,
                array_original
            ).subscribe(
                data => this.handleResponseGuardar(data),
                error => this.handleError(error)
            );
        }
    }

    /* FIN PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */

}
