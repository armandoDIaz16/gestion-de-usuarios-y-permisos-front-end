import { string } from '@amcharts/amcharts4/core'

export interface convocatorias{
    NO_CONTROL_CONV:string;
    DATOS:datoConvocatoria[];
}

export interface busqeudaSs{
  fecha:string;
  lugar:string;
  horario:string;
}
export interface datoConvocatoria{
    TURNO:string;
    FECHA_CONVOCATORIA:string;
    FK_ESPACIO_CONVOCATORIA:string;
    HORARIO_CONVOCATORIA:string;
    PERIODO:string;
}
export interface ICampus{
  NOMBRE:string;
  FK_TECNOLOGICO:string;
}
export interface sSEdificio{
  PK_EDIFICIO:string;
  PREFIJO:string;
  FK_CAMPUS:string;
}
export interface sSEspacio{
  PK_ESPACIO:string;
  FK_EDIFICIO:string;
  FK_TIPO_ESPACIO:string;
  NOMBRE:string;
  IDENTIFICADOR:string;
  CAPACIDAD:string;
}
export interface sSBusqueda{
  PK_CONVOCATORIA:string;
  FECHA_CONVOCATORIA:string;
  NOMBRE:string;//LUGAR 
  PERIODO:string;
}
