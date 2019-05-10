export interface Lineamiento {
	
	PK_LINEAMIENTO?: number;
	NOMBRE: string;
	LIMITE: number;
	FK_USUARIO_REGISTRO?: number; 
	FECHA_REGISTRO?: string;
	FK_USUARIO_MODIFICACION?: number;
	FECHA_MODIFICACION?: string;
	BORRADO?: number;

}