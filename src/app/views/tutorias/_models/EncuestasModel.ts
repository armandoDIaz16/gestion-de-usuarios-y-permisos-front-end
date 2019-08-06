export interface InterfaceEncuestaPendiente {
    PK_APLICACION_ENCUESTA: number;
    FK_USUARIO:             number;
    FECHA_APLICACION:       String;
    FECHA_RESPUESTA?:       String;
    ESTADO_APLICACION:      number;
    PK_ENCUESTA:            number;
    NOMBRE:                 String;
    ESTADO_ENCUESTA:        number;
}

export interface InterfaceEncuestaCompleta {
    PK_ENCUESTA:      number;
    NOMBRE:           String;
    OBJETIVO?:        String;
    INSTRUCCIONES:    String;
    FUENTE_CITA?:     String;
    ES_ADMINISTRABLE: number;
    SECCIONES:       InterfaceSeccionEncuesta[];
}

export interface InterfaceSeccionEncuesta {
    PK_SECCION:    number;
    FK_ENCUESTA:   number;
    NOMBRE:        String;
    NUMERO:        number;
    ORDEN:         number;
    OBJETIVO:      String;
    INSTRUCCIONES: String;
    PREGUNTAS:     InterfacePreguntaEncuesta[];
}

export interface InterfacePreguntaEncuesta {
    PK_PREGUNTA:          number;
    FK_SECCION:           number;
    ORDEN:                number;
    PLANTEAMIENTO:        String;
    TEXTO_GUIA:           String;
    FK_TIPO_PREGUNTA:     number;
    NOMBRE_TIPO_PREGUNTA: String;
    RESPUESTAS:           InterfaceRespuestaPosible[];
}

export interface InterfaceRespuestaPosible {
    PK_RESPUESTA_POSIBLE: number;
    FK_PREGUNTA:          number;
    RESPUESTA:            String;
    VALOR_NUMERICO?:      number;
    MINIMO?:              number;
    MAXIMO?:              number;
    ORDEN:                number;
}
