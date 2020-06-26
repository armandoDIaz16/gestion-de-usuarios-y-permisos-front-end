import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalesCadoFunction {
// ARREGLOS DE CATALAGOS
    public tipoServicioArray: Array<Object>;
    public tipoCursoArray: Array<Object>;

    constructor() {
        this.tipoServicioArray = [
            {
                'PK_TIPO_SERVICIO': 1,
                'NOMBRE': 'Curso'
            },
            {
                'PK_TIPO_SERVICIO': 2,
                'NOMBRE': 'Curso - taller'
            },
            {
                'PK_TIPO_SERVICIO': 3,
                'NOMBRE': 'Taller'
            },
            {
                'PK_TIPO_SERVICIO': 4,
                'NOMBRE': 'Diplomado'
            },
            {
                'PK_TIPO_SERVICIO': 5,
                'NOMBRE': 'Serie de platicas'
            },
            {
                'PK_TIPO_SERVICIO': 6,
                'NOMBRE': 'Simposium'
            },
            {
                'PK_TIPO_SERVICIO': 7,
                'NOMBRE': 'Otro'
            },
        ];
        this.tipoCursoArray = [
            {
                'PK_TIPO': 1,
                'NOMBRE': 'Formación Docente'
            },
            {
                'PK_TIPO': 2,
                'NOMBRE': 'Actualización Profesional'
            },
            {
                'PK_TIPO': 3,
                'NOMBRE': 'Diplomado'
            },
        ];
    }


}
