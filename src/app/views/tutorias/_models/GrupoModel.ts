export interface InterfaceGruposTutoria {
    GRUPOS?: InterfaceGrupoTutoria[];
}

export interface InterfaceGrupoTutoria {
    PK_GRUPO_TUTORIA:      number;
    FK_USUARIO:            number;
    CLAVE:                 string;
    AULA:                  string;
    HORARIO:               InterfaceDiaHorario[];
    CANTIDAD_ALUMNOS:      string;
    ENCUESTAS_ACTIVAS?:     number;
    ENCUESTAS_CONTESTADAS?: number;
    EVALUACION_GRUPO:      number;
    LISTA_ALUMNOS?:        InterfaceGrupoTutoriaDetalle[];
}

export interface InterfaceDiaHorario {
    IdPeriodoEscolar: number;
    clavemateria:     string;
    clavegrupo:       string;
    IdMaestro:        number;
    Aula:             string;
    DIA:              string;
    HORA_INICIAL:     string
    HORA_FINAL:       string;
}

export interface InterfaceGrupoTutoriaDetalle {
    PK_USUARIO:            number;
    NUMERO_CONTROL:        string;
    NOMBRE:                string;
    PRIMER_APELLIDO:       string;
    SEGUNDO_APELLIDO:      string;
    SEMESTRE:              number;
    CARRERA:               string;
    ENCUESTAS_ACTIVAS:     number;
    ENCUESTAS_CONTESTADAS: number;
}
