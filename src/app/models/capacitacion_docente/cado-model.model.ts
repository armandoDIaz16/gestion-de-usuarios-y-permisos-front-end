export interface Periodo {
    pk_periodo_cado:   number;
    nombre_periodo:    string;
    fecha_inicio:      string;
    fecha_fin:         string;
}

// tslint:disable-next-line:class-name
export interface Contenido_Tematico {
     pk_tema:                  number;
     nombre_tema:              string;
     actividad_aprendizaje:    string;
     tiempo_horas:             number;
     indice_array:             number;
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
    // agregar fk_ficha_tecnica
    fk_ficha_tecnica?: number;
    imagen_curso?: string;
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

export interface FichaTecnica {
    pk_ficha:   number;
    lugar_institucion: number;
    introduccion: string;
    justificacion: string;
    objetivo_general: string;
    tipo_servicio: number;
    otro_servicio?: string;
    // ------------------------
    fecha_registro:   string;
    hora_registro:   string;
    contenido_tematico: Array<Object>; // este contendra los archivos aenxados por tema
    elementos_didacticos: Array<Object>;
    criterios_evaluacion: Array<Object>;
    competencias: Array<Object>;
    fuentes_informacion: Array<Object>;
    comentarios: Array<Object>;
    lugar?: object;

}

export interface CV {
    pk_cv:   number;
    rfc: string;
    biografia: string;
    fk_participante: number;
    // ------------------------
    formacion_academica: Array<Object>; // este contendra el tipo formacion
    experiencia_laboral: Array<Object>;
    experiencia_docente: Array<Object>;
    productos_academicos: Array<Object>;
    participacion_instructor: Array<Object>;
}

// tslint:disable-next-line:class-name
export interface Edificio_Curso {
    PK_EDIFICIO: number;
    FK_CAMPUS: number;
    NOMBRE: string;
    PREFIJO: string;
    CAPACIDAD: string;
}
export interface Campus {
    PK_CAMPUS: number;
    NOMBRE: string;
    FK_INSTITUCION: number;
}
export interface AreaAcademica {
    PK_AREA_ACADEMICA: number;
    FK_INSTITUCION: number;
    NOMBRE: string;
    ABREVIATURA: string;
    ESTADO: string;
}
