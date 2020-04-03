export interface InterfaceConferencia {
    PK_CONFERENCIAS:         number;
    TEMA:                    string;
    FECHA:                   string;
    LUGAR:                   string;
    DESCRIPCION:             string;
    NOMBRE_EXPOSITOR:        string;
    CURRICULUM_EXPOSITOR?:   string;
    ESTADO:                  number;
}
