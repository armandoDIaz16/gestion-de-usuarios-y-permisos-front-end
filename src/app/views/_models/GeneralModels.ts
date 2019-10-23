export interface InterfaceEstadoCivil {
    PK_ESTADO_CIVIL: number;
    NOMBRE:          string;
    ABREVIATURA:     string;
}

export interface InterfaceSituacionResidencia {
    PK_SITUACION_RESIDENCIA: number;
    NOMBRE:                  string;
}

export interface InterfaceDatosCodigoPostal {
    PK_PAIS:                   number;
    NOMRBE_PAIS:               string;
    PK_ENTIDAD_FEDERATIVA:     number;
    NOMBRE_ENTIDAD_FEDERATIVA: number;
    PK_CIUDAD:                 number;
    NOMBRE_CIUDAD:             number;
    PK_CODIGO_POSTAL:          number;
    CODIGO_POSTAL:             number;
    COLONIAS:                  InterfaceColonias[];
}

export interface InterfaceColonias {
    PK_COLONIA:            number;
    FK_TIPO_ASENTAMIENTO?: number;
    NOMBRE:                number;
    ALIAS?:                number;
    ABREVIATURA?:          number;
}
