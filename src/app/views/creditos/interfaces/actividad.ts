export interface Actividad {
	
	PK_ACTIVIDAD?: number;
	NOMBRE: string;
    DESCRIPCION: string;
    LUGAR: string;
    FECHA: string;
    HORA: string;
    CUPO: number;
    FK_LINEAMIENTO: number;
    FK_TIPO: number;
    FK_RESPONSABLE: number;
    IMAGEN?: string;
	FK_USUARIO_REGISTRO?: number; 
	FECHA_REGISTRO?: string;
	FK_USUARIO_MODIFICACION?: number;
	FECHA_MODIFICACION?: string;
    BORRADO?: number;
    REGISTRADOS?: number;

}