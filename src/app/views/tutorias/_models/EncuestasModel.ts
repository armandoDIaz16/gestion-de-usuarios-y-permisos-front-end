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
    PK_RESPUESTA_POSIBLE: number;
    FK_PREGUNTA:          number;
    RESPUESTA:            string;
    VALOR_NUMERICO?:      number;
    MINIMO?:              number;
    MAXIMO?:              number;
    ORDEN:                number;
}
