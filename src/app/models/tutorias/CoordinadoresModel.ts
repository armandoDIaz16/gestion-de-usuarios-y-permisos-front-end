export interface InterfaceCoordinadoresDepartamentales {
    PK_USUARIO:            number;
    PK_ENCRIPTADA:         string;
    FOTO_PERFIL?:          string;
    NUMERO_CONTROL:        string;
    NOMBRE:                string;
    PRIMER_APELLIDO?:      string;
    SEGUNDO_APELLIDO?:     string;
    CURP:                  string;
    CORREO1:               string;
    CORREO_INSTITUCIONAL?: string;
    TELEFONO_CASA?:        string;
    TELEFONO_MOVIL?:       string;
    PK_AREA_ACADEMICA?:    number;
    AREA_ACADEMICA?:       string;
    NOMBRE_CONTACTO?:      string;
    TELEFONO_CONTACTO?:    string;
}
