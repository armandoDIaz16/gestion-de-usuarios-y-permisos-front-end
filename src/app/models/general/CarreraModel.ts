export interface InterfaceCarrera {
    PK_CARRERA:                    number;
    NOMBRE:                        string;
    ABREVIATURA?:                   string;
    CLAVE_TECNM?:                   string;
    CLAVE_TECLEON?:                 number;
    ESTADO:                        number;
    FK_USUARIO_REGISTRO?:           number;
    FECHA_REGISTRO:                string;
    FK_USUARIO_MODIFICACION?:       number;
    FECHA_MODIFICACION?:            string;
    BORRADO:                       number;
    CLAVE_CARRERA?:                 string;
}
