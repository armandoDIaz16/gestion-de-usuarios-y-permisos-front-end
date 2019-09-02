export interface InterfacePerfil {
    PK_USAURIO:            string;
    PERFIL_COMPLETO:       number;
    NOMBRE:                string;
    PRIMER_APELLIDO:       string;
    SEGUNDO_APELLIDO?:     string;
    CURP:                  string;
    NUMERO_CONTROL:        string;
    CARRERA:               string;
    SEMESTRE:              string;
    FECHA_NACIMIENTO?:     string;
    SEXO?:                 number;
    ESTADO_CIVIL?:         string;
    CORREO1:               string;
    CORREO2?:              string;
    CORREO_INSTITUCIONAL?: string;
    TELEFONO_CASA:         string;
    TELEFONO_MOVIL:        string;
    CODIGO_POSTAL?:        string;
    COLONIA?:              string;
    CALLE?:                string;
    SITUACION_RESIDENCIA?: number;
    NUMERO_EXTERIOR?:      string;
    NUMERO_INTERIOR?:      string;
    ENTIDAD_FEDERATIVA?:   string;
    CIUDAD?:               string;
    NOMBRE_CONTACTO?:      string;
    PARENTESCO_CONTACTO?:  string;
    TELEFONO_CONTACTO?:    string;
    CORREO_CONTACTO?:      string;
}

export interface InterfaceEstadoCivil {
    PK_ESTADO_CIVIL: number;
    NOMBRE:          string;
    ABREVIATURA:     string;
}
