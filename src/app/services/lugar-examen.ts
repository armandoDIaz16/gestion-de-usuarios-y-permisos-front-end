export interface IEspacio {
}
export interface ITurno {
    DIAS?: (DIASEntity)[] | null;
    HORAS?: (HORASEntity)[] | null;
}
export interface DIASEntity {
    DIA: string;
}
export interface HORASEntity {
    HORA: string;
}
export interface IEdificio {
    PK_EDIFICIO: string;
    CAMPUS: string;
    EDIFICIO: string;
    PREFIJO: string;
}
export interface ITipoEspacio {
    PK_TIPO_ESPACIO: string;
    NOMBRE: string;
}
export interface ITurno2 {
    PK_TURNO: string;
    DIA: string;
    HORA: string;
}
export interface IGrupo {
}

