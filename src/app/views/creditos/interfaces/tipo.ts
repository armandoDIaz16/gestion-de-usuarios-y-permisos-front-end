export interface Tipo {
    PK_TIPO?: number;
    NOMBRE: string;
    VALOR: number;
    FK_USUARIO_REGISTRO?: number; 
	FECHA_REGISTRO?: string;
	FK_USUARIO_MODIFICACION?: number;
	FECHA_MODIFICACION?: string;
	BORRADO?: number;
}