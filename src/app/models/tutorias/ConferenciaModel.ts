export interface InterfaceConferencia {
    PK_JORNADA:         number;
    TEMA:                    string;
    FECHA:                   string;
    LUGAR:                   string;
    DESCRIPCION:             string;
    NOMBRE_EXPOSITOR:        string;
    CURRICULUM_EXPOSITOR?:   string;
    ESTADO:                  number;
}
