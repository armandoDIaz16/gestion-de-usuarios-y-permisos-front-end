import {Injectable} from '@angular/core';
import {InterfacePreguntaEncuesta, InterfaceRespuestaPosible} from '../_models/EncuestasModel';

@Injectable({
    providedIn: 'root'
})

export class Helpers {

    public mayor_a_menor(elem1, elem2) {
        return elem1 - elem2;
    }

    public valida_array_respuestas_pasatiempos(array_respuestas) {
        for (var _i = 0; _i < 14; _i++) {
            if (array_respuestas[_i] == array_respuestas[_i + 1]) {
                return false;
            }
        }

        return true;
    }

    public valida_pregunta(pregunta: InterfacePreguntaEncuesta, index: number, respuesta: InterfaceRespuestaPosible) {
        if (pregunta.FK_TIPO_PREGUNTA == 1 || pregunta.FK_TIPO_PREGUNTA == 2) {
            if (respuesta.SELECCIONADA == 1) {
                return true;
            }
        }

        if (pregunta.FK_TIPO_PREGUNTA == 3) {
            if (respuesta.SELECCIONADA == 1) {
                if (respuesta.ES_MIXTA == 1) {
                    console.log((<HTMLInputElement>document.getElementById('res_mixta_' + respuesta.PK_RESPUESTA_POSIBLE))
                        .value
                        .trim());
                    let contenido_mixta =
                        (<HTMLInputElement>document.getElementById('res_mixta_' + respuesta.PK_RESPUESTA_POSIBLE))
                            .value
                            .trim()
                            .length;
                    if (contenido_mixta > 0) {
                        return true;
                    } else {
                        alert('Debes indicar la respuesta para la pregunta');
                    }
                } else {
                    return true;
                }
            }
        }

        if (pregunta.FK_TIPO_PREGUNTA == 6) {
            let contenido_abierta =
                (<HTMLInputElement>document.getElementById('res_abierta_' + respuesta.PK_RESPUESTA_POSIBLE))
                    .value
                    .trim()
                    .length;
            if (contenido_abierta > 0) {
                return true
            }
        }

        return false;
    }
}
