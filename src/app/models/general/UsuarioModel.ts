export interface InterfaceUsuario {
    PK_USUARIO: string;
    PK_ENCRIPTADA?: string;
    NOMBRE: string;
    PRIMER_APELLIDO?: string;
    SEGUNDO_APELLIDO?: string;
    CURP: string;
    NUMERO_CONTROL?: string;
    SEMESTRE?: number;
    FECHA_NACIMIENTO?: string;
    SEXO?: number;
    TEXTO_SEXO?: string;
    CORREO1?: string;
    CORREO2?: string;
    CORREO_INSTITUCIONAL?: string;
    TELEFONO_CASA?: string;
    TELEFONO_MOVIL?: string;
    CALLE?: string;
    NUMERO_EXTERIOR?: string;
    NUMERO_INTERIOR?: string;
    NOMBRE_CONTACTO?: string;
    PARENTESCO_CONTACTO?: string;
    TELEFONO_CONTACTO?: string;
    CORREO_CONTACTO?: string;
    PERFIL_COMPLETO?: string;
    FOTO_PERFIL?: string;
    // DATOS DE CARRERA
    PK_CARRERA?: number;
    CARRERA?: string;
    // DATOS DE CODIGO POSTAL
    PK_CODIGO_POSTAL?: number;
    CODIGO_POSTAL?: string;
    // DATOS ESTADO CIVIL
    PK_ESTADO_CIVIL?: number;
    ESTADO_CIVIL?: string;
    // DATOS SITUACION RESIDENCIA
    PK_SITUACION_RESIDENCIA?: number;
    SITUACION_RESIDENCIA?: string;
    // DATOS ENTIDAD FEDERATIVA
    PK_ENTIDAD_FEDERATIVA?: number;
    ENTIDAD_FEDERATIVA?: string;
    // DATOS DE CIUDAD
    CIUDAD?: string;
    // DATOS COLONIA
    PK_COLONIA?: number;
    COLONIA?: string;
    // DATOS AREA ACADEMICA
    PK_AREA_ACADEMICA?: number;
    AREA_ACADEMICA?: string;
}
