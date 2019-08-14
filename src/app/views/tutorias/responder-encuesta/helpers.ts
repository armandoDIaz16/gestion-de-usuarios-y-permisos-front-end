import {Injectable} from '@angular/core';
import {
    InterfaceCuestionarioResuelto,
    InterfacePreguntaEncuesta,
    InterfacePreguntasResueltas,
    InterfaceRespuestaPosible, InterfaceRespuestasResueltas
} from '../_models/EncuestasModel';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
    providedIn: 'root'
})

export class Helpers {

    public mayor_a_menor(elem1, elem2) {
        return elem1 - elem2;
    }

    public valida_array_respuestas_pasatiempos(array_respuestas) {
        // validar no vacíos y solo números entre 1 y 15
        for (let _i = 0; _i < 15; _i++) {
            if (array_respuestas[_i]) {
                if (array_respuestas[_i] < 1 || array_respuestas[_i] > 15) {
                    alert('Solo debe elegir números entre 1 y 15');
                    return false;
                }
            } else {
                alert('Debe indicar un número para cada actividad');
                return false;
            }
        }

        // validar que no se repitan
        for (let _i = 0; _i < 14; _i++) {
            if (array_respuestas[_i] == array_respuestas[_i + 1]) {
                alert('Los números no deben repetirse');
                return false;
            }
        }

        return true;
    }

    public valida_pregunta(index: number, pregunta: InterfacePreguntaEncuesta, respuestas: InterfaceRespuestaPosible[]) {
        let pregunta_valid = false;
        for (let respuesta of respuestas) {
            if (pregunta.FK_TIPO_PREGUNTA == 1 || pregunta.FK_TIPO_PREGUNTA == 2) {
                if (respuesta.SELECCIONADA == 1) {
                    pregunta_valid = true;
                }
            }

            if (pregunta.FK_TIPO_PREGUNTA == 3) {
                if (respuesta.SELECCIONADA == 1) {
                    if (respuesta.ES_MIXTA == 1) {
                        if ((<HTMLInputElement>document.getElementById('res_mixta_' + respuesta.PK_RESPUESTA_POSIBLE))
                            .value
                            .trim()
                            .length > 0) {
                            pregunta_valid = true;
                        }
                    } else {
                        pregunta_valid = true;
                    }
                }
            }

            if (pregunta.FK_TIPO_PREGUNTA == 6) {
                if ((<HTMLInputElement>document.getElementById('res_abierta_' + respuesta.PK_RESPUESTA_POSIBLE))
                    .value
                    .trim()
                    .length > 0) {
                    pregunta_valid = true;
                }
            }
        }

        if (!pregunta_valid) {
            alert('Debes indicar la respuesta para la pregunta ' + index);
        }
        return pregunta_valid;
    }

    public procesa_respuestas(preguntas: InterfacePreguntaEncuesta[]) {
        let cuestionario_resuelto: InterfaceCuestionarioResuelto;
        let array_preguntas: InterfacePreguntasResueltas[] = [];
        cuestionario_resuelto = <InterfaceCuestionarioResuelto>{};
        cuestionario_resuelto.PREGUNTAS = <[]>{};
        for (let pregunta of preguntas) {
            array_preguntas.push(this.get_respuesta(pregunta));
        }

        cuestionario_resuelto.PREGUNTAS = array_preguntas;
        console.log(cuestionario_resuelto);

        return cuestionario_resuelto;
    }

    private get_respuesta(pregunta: InterfacePreguntaEncuesta) {
        let pregunta_resuelta: InterfacePreguntasResueltas;
        pregunta_resuelta = <InterfacePreguntasResueltas>{};
        let array_respuestas: InterfaceRespuestasResueltas[] = [];
        pregunta_resuelta.RESPUESTAS = <InterfaceRespuestasResueltas[]>{};
        pregunta_resuelta.PK_PREGUNTA = pregunta.PK_PREGUNTA;
        pregunta_resuelta.TIPO_PREGUNTA = pregunta.FK_TIPO_PREGUNTA;

        for (let respuesta of pregunta.RESPUESTAS) {
            let respuesta_elegida: InterfaceRespuestasResueltas;
            respuesta_elegida = <InterfaceRespuestasResueltas>{};

            respuesta_elegida.PK_RESPUESTA = respuesta.PK_RESPUESTA_POSIBLE;
            if (pregunta.FK_TIPO_PREGUNTA == 1 || pregunta.FK_TIPO_PREGUNTA == 2) {
                if (respuesta.SELECCIONADA == 1) {
                    respuesta_elegida.ABIERTA = '-';
                    respuesta_elegida.ES_MIXTA = 0;
                    respuesta_elegida.RANGO = 0;

                    array_respuestas.push(respuesta_elegida);
                    break;
                }
            }

            if (pregunta.FK_TIPO_PREGUNTA == 3) {
                if (respuesta.SELECCIONADA == 1) {
                    if (respuesta.ES_MIXTA == 1) {
                        respuesta_elegida.ABIERTA = respuesta.ABIERTA;
                        respuesta_elegida.ES_MIXTA = 0;
                        respuesta_elegida.RANGO = 0;

                        array_respuestas.push(respuesta_elegida);
                        break;
                    } else {
                        respuesta_elegida.ABIERTA = '-';
                        respuesta_elegida.ES_MIXTA = 0;
                        respuesta_elegida.RANGO = 0;

                        array_respuestas.push(respuesta_elegida);
                        break;
                    }
                }
            }

            if (pregunta.FK_TIPO_PREGUNTA == 6) {
                respuesta_elegida.ABIERTA = respuesta.ABIERTA;
                respuesta_elegida.ES_MIXTA = 0;
                respuesta_elegida.RANGO = 0;

                array_respuestas.push(respuesta_elegida);
                break;
            }
        }

        pregunta_resuelta.RESPUESTAS = array_respuestas;

        return pregunta_resuelta;
    }
}
