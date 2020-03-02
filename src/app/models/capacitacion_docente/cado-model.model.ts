export interface Periodo {
     pk_periodo_cado:   number;
     nombre_periodo:    string;
     fecha_inicio:      string;
     fecha_fin:         string;
     // estado_periodo:   number;
}

export interface Curso {
    pk_curso:   number;
    nombre_curso:    string;
    tipo_curso: number;
    cupo_maximo: number;
    cupo_actual: number;
    total_horas: number;
    pk_periodo: number;
    pk_area_academica: number;
    instructores: Array<Object>;
    fecha_inicio:   string;
    fecha_fin:   string;
    hora_inicio:   Date;
    hora_fin:    Date;
    campus: number;
    edificio: number;
    espacio: string;
    estado_curso:  number;
}

