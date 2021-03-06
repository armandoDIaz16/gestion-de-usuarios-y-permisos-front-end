export interface InterfaceAlumno {
    PK_USUARIO:            number;
    NUMERO_CONTROL:        string;
    NOMBRE:                string;
    PRIMER_APELLIDO:       string;
    SEGUNDO_APELLIDO:      string;
    SEMESTRE:              number;
    CARRERA:               string;
    FK_COLONIA?:            number;
    FK_ESTADO_CIVIL?:       number;
    FK_CARRERA?:            number;
    FK_GRUPO_SANGUINEO?:    number;
    FECHA_NACIMIENTO?:      string;
    CURP?:                  string;
    SEXO?:                  number;
    NACIONALIDAD?:          string;
    TELEFONO_CASA?:         string;
    TELEFONO_MOVIL?:        string;
    CORREO1?:               string;
    CORREO2?:               string;
    CORREO_INSTITUCIONAL?:  string;
    NSS?:                   string;
    CALLE?:                 string;
    NUMERO_EXTERIOR?:       string;
    NUMERO_INTERIOR?:       string;
    NOMBRE_CONTACTO?:       string;
    PARENTESCO_CONTACTO?:   string;
    TELEFONO_CONTACTO?:     string;
    CORREO_CONTACTO?:       string;

    // datos de encuestas
    ENCUESTAS_ACTIVAS?:     number;
    ENCUESTAS_CONTESTADAS?: number;
    HORARIO?:               InterfaceMateriaHorario[];
}

export interface InterfaceMateriaHorario {
    PERIODO:       number;
    ClaveMateria: string;
    Nombre:        string;
    Docente:       number;
    Aula:          string;
    DIAS:       InterfaceDiaHorario;
}

export interface InterfaceDiaHorario {
    LUNES:      string;
    MARTES:     string;
    MIERCOLES:  string;
    JUEVES:     string;
    VIERNES:    string;
}

export interface InterfaceAlumnoTutoria {
    PK_GRUPO_TUTORIA_DETALLE: number;
    PK_USUARIO: string;
    PK_ENCRIPTADA?: string;
    NOMBRE: string;
    PRIMER_APELLIDO?: string;
    SEGUNDO_APELLIDO?: string;
    CURP: string;
    NUMERO_CONTROL?: string;
    SEMESTRE?: number;
    FOTO_PERFIL?: string;
    // DATOS DE CARRERA
    PK_CARRERA?: number;
    CARRERA?: string;
    TUTOR?: string;
}
