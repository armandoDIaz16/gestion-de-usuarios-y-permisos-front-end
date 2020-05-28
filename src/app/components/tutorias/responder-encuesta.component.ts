import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    public error = null;
    public display;

    constructor(private responder_encuestas_service: ResponderEncuestaService,
                private route: ActivatedRoute,
                private router: Router,
                private helpers: Helpers) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('encuesta'), 10);
        this.display = 'block';
    }

    ngOnInit() {
        this.responder_encuestas_service.get_encuesta_completa(
            '?pk_detalle=' + this.pk_aplicacion_encuesta
            + '&usuario=' + sessionStorage['IdEncriptada']
        ).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error),
            () => {
                this.display = 'none';
            }
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
        this.error = error.error;
        this.display = 'none';
    }

    onSubmit() {
        if (confirm('¿Está seguro de enviar las respuestas?')) {
            this.display = 'block';
            if (this.encuesta_completa.PK_ENCUESTA === 1) {
                this.encuesta_pasatiempos(); // OK
            } else {
                this.procesa_encuesta();
            }
        } else {
            return false;
        }
    }

    public handleResponseGuardar(data) {
        this.display = 'none';
        if (data.data) {
            this.router.navigateByUrl('/tutorias/6da5b4309f3cc102b3a2b7ac7e52a62c');
        }
    }

    public actualiza_rango(id_escala: string, id_etiqueta: string, index_pregunta: number, index_respuesta: number) {
        (<HTMLInputElement>document.getElementById(id_etiqueta)).innerHTML =
            (<HTMLInputElement>document.getElementById(id_escala)).value;

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].SELECCIONADA =
            parseInt((<HTMLInputElement>document.getElementById(id_escala)).value, 10);

        this.encuesta_completa.SECCIONES[0].PREGUNTAS[index_pregunta].RESPUESTAS[index_respuesta].RANGO =
            parseInt((<HTMLInputElement>document.getElementById(id_escala)).value, 10);

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
        this.display = 'none';
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
        for (const pregunta of this.encuesta_completa.SECCIONES[0].PREGUNTAS) {
            // lenar contenido de las abiertas
            if (pregunta.FK_TIPO_PREGUNTA == 6) {
                pregunta.RESPUESTAS[0].ABIERTA =
                    (<HTMLInputElement>document.getElementById('res_abierta_' + pregunta.RESPUESTAS[0].PK_RESPUESTA_POSIBLE))
                        .value
                        .trim();
            }

            if (pregunta.FK_TIPO_PREGUNTA == 3) {
                let _i = 0;
                for (const temp_respuesta of pregunta.RESPUESTAS) {
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
        const array_respuestas = [], array_original = [];
        for (let _i = 0; _i < 15; _i++) {
            array_respuestas.push(
                parseInt((<HTMLInputElement>document.getElementById('res_' + _i)).value, 10)
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
        this.display = 'none';
    }

    /* FIN PROCESAMIENTO DE ENCUESTA DE PASATIEMPOS */

}
