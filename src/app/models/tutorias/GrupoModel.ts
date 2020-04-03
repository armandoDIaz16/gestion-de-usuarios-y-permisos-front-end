export interface InterfacecCarreraGruposTutoria {
    CARRERAS: InterfaceGruposTutoria[];
}

export interface InterfaceGruposTutoria {
    PK_CARRERA: number;
    CARRERA: string;
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
    PK_ENCRIPTADA:         string;
    NUMERO_CONTROL:        string;
    NOMBRE:                string;
    PRIMER_APELLIDO:       string;
    SEGUNDO_APELLIDO:      string;
    SEMESTRE:              number;
    CARRERA:               string;
    ENCUESTAS_ACTIVAS:     number;
    ENCUESTAS_CONTESTADAS: number;
    PERFIL_COMPLETO:       number;
}

export interface InterfaceHistoricoGrupoTutoria {
    PK_GRUPO_TUTORIA:       number;
    FK_USUARIO:             number;
    CLAVE:                  string;
    TIPO_GRUPO:             number;
    PERIODO:                number;
    TEXTO_PERIODO:          number;
    CARRERA:                string;
    CANTIDAD_ALUMNOS:       string;
    ENCUESTAS_ACTIVAS?:     number;
    ENCUESTAS_CONTESTADAS?: number;
    EVALUACION_GRUPO:       number;
}

export interface InterfaceGrupoSiia {
    CLAVE_GRUPO:       string;
    NOMBRE:            string;
    PRIMER_APELLIDO:   string;
    SEGUNDO_APELLIDO:  string;
    AULA:              string;
    HORARIO:           InterfaceDiaHorarioSiia[];
    CANTIDAD_ALUMNOS:  number;
    CARRERA:           string;
}

export interface InterfaceDiaHorarioSiia {
    Lunes:      string;
    Martes:     string;
    Miercoles:  string;
    Jueves:     string;
    Viernes:    string;
}
