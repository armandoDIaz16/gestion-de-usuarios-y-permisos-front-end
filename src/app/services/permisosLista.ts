export interface IPermisos {
    PK_SISTEMA: string;
    NOMBRE: string;
    ROLES?: (ROLESEntity)[] | null;
}
export interface ROLESEntity {
    PK_ROL: string;
    NOMBRE: string;
    MODULOS?: (MODULOSEntity | null)[] | null;
}
export interface MODULOSEntity {
    PK_MODULO: string;
    NOMBRE: string;
    ACCIONES?: (ACCIONESEntity)[] | null;
}
export interface ACCIONESEntity {
    PK_ACCION: string;
    NOMBRE: string;
}
  