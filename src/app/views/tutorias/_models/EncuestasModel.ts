export interface InterfaceEncuestaPendiente {
    PK_APLICACION_ENCUESTA: number;
    FK_USUARIO:             number;
    FECHA_APLICACION:       string;
    FECHA_RESPUESTA?:       string;
    ESTADO_APLICACION:      number;
    PK_ENCUESTA:            number;
    NOMBRE:                 string;
    ESTADO_ENCUESTA:        number;
}

export interface InterfaceEncuestaCompleta {
    PK_ENCUESTA:      number;
    NOMBRE:           string;
    OBJETIVO?:        string;
    INSTRUCCIONES:    string;
    FUENTE_CITA?:     string;
    ES_ADMINISTRABLE: number;
    SECCIONES:       InterfaceSeccionEncuesta[];
}

export interface InterfaceSeccionEncuesta {
    PK_SECCION:    number;
    FK_ENCUESTA:   number;
    NOMBRE:        string;
    NUMERO:        number;
    ORDEN:         number;
    OBJETIVO?:      string;
    INSTRUCCIONES: string;
    PREGUNTAS:     InterfacePreguntaEncuesta[];
}

export interface InterfacePreguntaEncuesta {
    PK_PREGUNTA:          number;
    FK_SECCION:           number;
    ORDEN:                number;
    PLANTEAMIENTO:        string;
    TEXTO_GUIA:           string;
    FK_TIPO_PREGUNTA:     number;
    NOMBRE_TIPO_PREGUNTA: string;
    RESPUESTAS:           InterfaceRespuestaPosible[];
}

export interface InterfaceRespuestaPosible {
    // VARIABLES DE RESPUESTA DEL USUARIO
    SELECCIONADA?:         number;
    ABIERTA?:              string;
    RANGO?:                number;
    ORDEN_RESPUESTA?:      number;

    // VARIABLES DE RESPUESTA POSIBLE
    PK_RESPUESTA_POSIBLE: number;
    FK_PREGUNTA:          number;
    RESPUESTA:            string;
    VALOR_NUMERICO?:      number;
    MINIMO?:              number;
    MAXIMO?:              number;
    ORDEN:                number;
    ES_MIXTA:             number;
}

/* INICIO INTERFACES PARA PROCESAR LAS RESPUESTAS */
export interface InterfaceCuestionarioResuelto {
    PREGUNTAS:     InterfacePreguntasResueltas[] | null;
}

export interface InterfacePreguntasResueltas {
    PK_PREGUNTA:   number | null;
    TIPO_PREGUNTA: number | null;
    RESPUESTAS:    InterfaceRespuestasResueltas[] | null;
}

export interface InterfaceRespuestasResueltas {
    PK_RESPUESTA:  number | null;
    ES_MIXTA:      number | null;
    ABIERTA:       string | null;
    RANGO:         number | null;
}
/* FIN INTERFACES PARA PROCESAR LAS RESPUESTAS */














