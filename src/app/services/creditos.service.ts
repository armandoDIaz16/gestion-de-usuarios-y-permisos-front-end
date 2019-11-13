import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lineamiento } from '../views/creditos/interfaces/lineamiento';
import { Actividad } from '../views/creditos/interfaces/actividad';
import {UsuarioActividad } from '../views/creditos/interfaces/usuarioActividad';
import { AsistenteActividad } from '../views/creditos/interfaces/asistenteActividad';
import { AsistenciaAlumnoActividad } from '../views/creditos/interfaces/asistenciaAlumnoActividad';
import { GenericServicesService } from './generic-services.service';



@Injectable({
  providedIn: 'root'
})
export class CreditosService extends GenericServicesService{

  constructor(private httpclient: HttpClient,
              private genericServicesService: GenericServicesService ) {  super(httpclient); }

  //API_ENDPOINT = "http://localhost:8000/api";
  private API_ENDPOINT = GenericServicesService.API_ENDPOINT;
  private headers = GenericServicesService.HEADERS;

  get(){
  	return this.httpclient.get(this.API_ENDPOINT + 'lineamientos', this.headers);
  }

  save(lineamiento: Lineamiento){
  	return this.httpclient.post(this.API_ENDPOINT + 'lineamientos', lineamiento,  this.headers);
  }
 

  put(lineamiento){
  return this.httpclient.put(this.API_ENDPOINT + 'lineamientos/' + lineamiento.PK_LINEAMIENTO, lineamiento,  this.headers);
  }

  delete(id){
    return this.httpclient.delete(this.API_ENDPOINT + 'lineamientos/' + id);
  }
/*-------------------------------------Tipos-----------------*/
getTipos(){
  return this.httpclient.get(this.API_ENDPOINT + 'tipos');
}
/*-------------------------------------Actividades -------*/

  getActividades(){ /* para la gestion de las actividades, obtiene la vista actividades_v */
    return this.httpclient.get(this.API_ENDPOINT + 'actividades');
  }

  getActividadById(PK_ACTIVIDAD){
    return this.httpclient.get(this.API_ENDPOINT + 'actividad-por-id/' + PK_ACTIVIDAD);
  }

  getActividadesRaw(){
    return this.httpclient.get(this.API_ENDPOINT + 'actividades-raw');
  }

  getActividadesDisponibles(id){ /* Para los alumnos */
    return this.httpclient.get(this.API_ENDPOINT + 'actividades-disponibles/' + id);
  }

  getActividadesInscitas(id){/* Para los alumnos */
    return this.httpclient.get(this.API_ENDPOINT + 'actividades/' + id);
  }

  saveActividades(actividad: Actividad){
  	return this.httpclient.post(this.API_ENDPOINT + 'actividades', actividad,  this.headers);
  }
  deleteActividades(id){
    return this.httpclient.delete(this.API_ENDPOINT + 'actividades/' + id);
  }
  putActividades(actividad){
        return this.httpclient.put(this.API_ENDPOINT + 'actividades/' + actividad.PK_ACTIVIDAD, actividad,  this.headers);
  
    }

/*-------------------------------------ALumno Actividades -------*/
getRegistrados(PK_ACTIVIDAD){
  
  return this.httpclient.get(this.API_ENDPOINT + 'alumno-actividades/' + PK_ACTIVIDAD);

}

saveAlumnoActividad(usuarioActividad: UsuarioActividad){
  	return this.httpclient.post(this.API_ENDPOINT + 'alumno-actividades', usuarioActividad,  this.headers);

}

/* ----------------------------Asistencia ALumno Actividades ---------- */
getListaActividades(FK_LINEAMIENTO, FK_ALUMNO){
  return this.httpclient.get(this.API_ENDPOINT + 'lista-actividades/'+ FK_LINEAMIENTO + '/' + FK_ALUMNO);
}


/*-----------------------------ALumno Creditos -------------------------*/
getCreditosbyAlumno(FK_ALUMNO){
  return this.httpclient.get(this.API_ENDPOINT + 'alumno-creditos/' + FK_ALUMNO);
}

/* ----------------------------Responsables de actividad --------------- */
getResponsables(){//para mostrar a los responsables al mmomento de registrar una actividad
  return this.httpclient.get(this.API_ENDPOINT + 'responsables-actividad');
}

getActRes(FK_ALUMNO){//mostrar las actividades designadas a un reponsable en especifico
  return this.httpclient.get(this.API_ENDPOINT + 'responsables-actividad/' + FK_ALUMNO);
}

getListaAsistencia(PK_ACTIVIDAD){//mostrar la lista de asistentes a alguna actividad en específico
  return this.httpclient.get(this.API_ENDPOINT + 'responsable-lista-asistentes/' + PK_ACTIVIDAD);

}

getAsistentes(PK_ACTIVIDAD){//mostrar los alumnos designados para tomar asistencia en una actividad
  return this.httpclient.get(this.API_ENDPOINT + 'asistentes-actividad/' + PK_ACTIVIDAD);
}

getAlumnoByNc(NUM_CONTROL){
  return this.httpclient.get(this.API_ENDPOINT + 'alumnos-num-control/' + NUM_CONTROL);
}

getPkUsuario(NUM_CONTROL){
  return this.httpclient.get(this.API_ENDPOINT + 'userid-num-control/' +  NUM_CONTROL);
}

RegistrarAsistAct(asistenteActividad: AsistenteActividad){
  return this.httpclient.post(this.API_ENDPOINT + 'asistentes-actividad', asistenteActividad,  this.headers); 
}

eliminarAsistAct(ID){
  return this.httpclient.delete(this.API_ENDPOINT + 'asistentes-actividad/' + ID);
}
    
/*------------------------------- Alumnos con el rol para registrar asistencias -----------------------*/

getActTomaAsist(PK_USUARIO){//Lista  de actividades en las que el alumno tomará asistencia
  return this.httpclient.get(this.API_ENDPOINT + 'actividades-tomar-asistencia/' + PK_USUARIO);
}

habilitarRegistro(PK_ACTIVIDAD){
  return this.httpclient.get(this.API_ENDPOINT + 'registrar-asistencia/' + PK_ACTIVIDAD, {responseType: 'text'});
}

eliminarAsistente(PK_USUARIO, PK_ACTIVIDAD){
  return this.httpclient.get(this.API_ENDPOINT + 'eliminar-asistente-act/' + PK_USUARIO + '/' + PK_ACTIVIDAD);
}

eliminarRolAsistente(PK_USUARIO){
  return this.httpclient.get(this.API_ENDPOINT + 'eliminar-rol-asistente/' + PK_USUARIO);
}

/*----------------------------- Servicios escolares -------------------------------------------------*/

getCreditorPorValidar(){
  return this.httpclient.get(this.API_ENDPOINT + 'creditos-por-validar');
}

getCreditosPorValidarByNumC(NUM_CONTROL){
  return this.httpclient.get(this.API_ENDPOINT + 'creditos-por-validar-nc/' + NUM_CONTROL);
}
getCreditosValidadosByNumC(NUM_CONTROL){
  return this.httpclient.get(this.API_ENDPOINT + 'creditos-validados-nc/' + NUM_CONTROL);
}
getCreditosPorValidarByLin(LINEAMIENTO){
  return this.httpclient.get(this.API_ENDPOINT + 'creditos-por-validar-ln/' + LINEAMIENTO);
}
getCreditosValidadosByLin(LINEAMIENTO){
  return this.httpclient.get(this.API_ENDPOINT + 'creditos-validados-ln/' + LINEAMIENTO);
}

getActByCredito(PK_ALUMNO_CREDITO){
  return this.httpclient.get(this.API_ENDPOINT + 'actividades-credito-cumplidos/' + PK_ALUMNO_CREDITO);
}

validarCreditos(PK_ALUMNO_CREDITO){
  return this.httpclient.put(this.API_ENDPOINT + 'validar-credito/' + PK_ALUMNO_CREDITO,  this.headers );
}
getCreditosValidados(){
  return this.httpclient.get(this.API_ENDPOINT + 'creditos-validados');
}

generarConstancia(data){
  return this.httpclient.post(this.API_ENDPOINT + 'generar-constancia/', data, this.headers);

}
/* 
verConstancia(PK_ALUMNO_CREDITO){
  return this.httpclient.get(this.API_ENDPOINT + '/constancia-view/' + PK_ALUMNO_CREDITO,  {responseType: 'arraybuffer'});
} */



/**registro de enttrada y salida actividades */

registrarEntrada(asistenciaAlumnoActividad: AsistenciaAlumnoActividad){
  return this.httpclient.post(this.API_ENDPOINT + 'asistencia-alumnos', asistenciaAlumnoActividad,  this.headers);

}



/*-----------------ADMINISTRADOR DE USUARIOS --------- */
singupAdmin(data){
  
  return this.httpclient.post(this.API_ENDPOINT + 'signupAdminCC', data);
}

getUsuarioByCurp(curp){
  return this.httpclient.get(this.API_ENDPOINT + 'usuario-by-curp/' + curp);
}

AgregarUsuarioCA(usuario){
 return this.httpclient.get(this.API_ENDPOINT + 'agregar-user-ca/' + usuario);
}

AgregarUsuarioJC(usuario){
  return this.httpclient.get(this.API_ENDPOINT + 'agregar-user-jc/' + usuario);
 }
 AgregarUsuarioRA(usuario){
  return this.httpclient.get(this.API_ENDPOINT + 'agregar-user-ra/' + usuario);
 }
 AgregarUsuarioTE(usuario){
   return this.httpClient.get(this.API_ENDPOINT + 'agregar-user-te/' + usuario);
 }

 
 /*----------------Subir listas en excel ------------------------*/
 enviarExcel(file){
 return this.httpClient.post(this.API_ENDPOINT + 'import-excel-ac', file, {responseType: 'text'});
 }


 
 /*--------------------generar constancias ---------------------*/
 getAlumnosByCarrera(carrera){
  return this.httpClient.get(this.API_ENDPOINT + 'creditos-carrera/' + carrera );
}

/*---------------------OBTENER CLAVE DE CARRERA ----------------------*/
getClaveCarrera(PK_USUARIO){
  console.log("data que llega: " + PK_USUARIO);
  return this.httpClient.get(this.API_ENDPOINT + 'get-clave-carrera/' + PK_USUARIO);
}



}
