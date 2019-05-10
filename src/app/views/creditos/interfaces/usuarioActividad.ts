export interface UsuarioActividad {
    PK_USUARIO_ACTIVIDAD?: number;
    FK_ACTIVIDAD: number;
    FK_ALUMNO: string;
    FK_USUARIO_REGISTRO?: number; 
	FECHA_REGISTRO?: string;
	FK_USUARIO_MODIFICACION?: number;
	FECHA_MODIFICACION?: string;
    BORRADO?: number;
    REGISTRABLE?: number;

}