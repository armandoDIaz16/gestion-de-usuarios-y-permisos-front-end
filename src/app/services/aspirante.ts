export interface IAspirante {
  PREFICHA: string;
  FECHA_REGISTRO: string;
  NUMERO_PREFICHA: string;
  ESTATUS: string;
  FOLIO_CENEVAL: string;
  name: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  FECHA_NACIMIENTO: string;
  SEXO: string;
  CURP: string;
  FK_ESTADO_CIVIL: string;
  CALLE: string;
  FK_COLONIA: string;
  TELEFONO_CASA: string;
  TELEFONO_MOVIL: string;
  email: string;
  PROMEDIO: string;
  ESPECIALIDAD: string;
}

export interface IReferencia {
  REFERENCIA: string;
  FECHA_LIMITE_PAGO: string;
  CLAVE: number;
  MONTO: string;
}

export interface IAspirantes {
  PREFICHA: string;
  NUMERO_PREFICHA: string;
  CURP: string;
  NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  CORREO: string;
  TELEFONO_CASA: string;
  TELEFONO_MOVIL: string;
  CARRERA1: string;
  CARRERA2: string;
  ESTATUS: string;
}

export interface IEstatus {
  PK_ESTATUS_ASPIRANTE: string;
  NOMBRE: string;
}

export interface IGraficaEstatus {
  NOMBRE: string;
  CANTIDAD: string;
}
export interface IGraficaCarreras {
  NOMBRE: string;
  CANTIDAD: string;
}

export interface IGraficaCampus {
  NOMBRE: string;
  CANTIDAD: string;
}

export interface IGrupos {
  PREFICHA: string;
  CLAVE_CARRERA: string;
  FOLIO_CENEVAL: string;
  NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
}


