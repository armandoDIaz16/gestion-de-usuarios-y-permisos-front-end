import {Injectable} from '@angular/core';

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
}
