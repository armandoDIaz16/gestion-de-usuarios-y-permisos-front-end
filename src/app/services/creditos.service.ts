import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lineamiento } from '../views/creditos/interfaces/lineamiento';
import { Actividad } from '../views/creditos/interfaces/actividad';
import {UsuarioActividad } from '../views/creditos/interfaces/usuarioActividad';
import { AsistenteActividad } from '../views/creditos/interfaces/asistenteActividad';



@Injectable({
  providedIn: 'root'
})
export class CreditosService {
API_ENDPOINT = "http://localhost:8000/api";

  constructor(private httpclient: HttpClient) { }

  get(){
  	return this.httpclient.get(this.API_ENDPOINT + '/lineamientos');
  }

  save(lineamiento: Lineamiento){
  	const Headers = new HttpHeaders({'Content-Type':'application/json'});
  	console.log("en el servicio: " + lineamiento);
  	return this.httpclient.post(this.API_ENDPOINT + '/lineamientos', lineamiento, {headers : Headers});
  }

  put(lineamiento){
  const Headers = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpclient.put(this.API_ENDPOINT + '/lineamientos/' + lineamiento.PK_LINEAMIENTO, lineamiento, {headers : Headers});

  }

  delete(id){
    return this.httpclient.delete(this.API_ENDPOINT + '/lineamientos/' + id);
  }
/*-------------------------------------Tipos--------------*/
getTipos(){
  return this.httpclient.get(this.API_ENDPOINT + '/tipos');
}
/*-------------------------------------Actividades -------*/

  getActividades(){ /* para la gestion de las actividades */
    return this.httpclient.get(this.API_ENDPOINT + '/actividades');
  }

  getActividadesDisponibles(id){ /* Para los alumnos */
    return this.httpclient.get(this.API_ENDPOINT + '/actividades-disponibles/' + id);
  }

  getActividadesInscitas(id){/* Para los alumnos */
    return this.httpclient.get(this.API_ENDPOINT + '/actividades/' + id);
  }

  saveActividades(actividad: Actividad){
  	const Headers = new HttpHeaders({'Content-Type':'application/json'});
  	return this.httpclient.post(this.API_ENDPOINT + '/actividades', actividad, {headers : Headers});
  }
  deleteActividades(id){
    return this.httpclient.delete(this.API_ENDPOINT + '/actividades/' + id);
  }
  putActividades(actividad){
    
    const Headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpclient.put(this.API_ENDPOINT + '/actividades/' + actividad.PK_ACTIVIDAD, actividad, {headers : Headers});
  
    }

/*-------------------------------------ALumno Actividades -------*/
getRegistrados(PK_ACTIVIDAD){
  
  return this.httpclient.get(this.API_ENDPOINT + '/alumno-actividades/' + PK_ACTIVIDAD);

}

saveAlumnoActividad(usuarioActividad: UsuarioActividad){
  //console.log(usuarioActividad);
  const Headers = new HttpHeaders({'Content-Type':'application/json'});
  	return this.httpclient.post(this.API_ENDPOINT + '/alumno-actividades', usuarioActividad, {headers : Headers});

}

/* ----------------------------Asistencia ALumno Actividades ---------- */
getListaActividades(FK_LINEAMIENTO, FK_ALUMNO){
  return this.httpclient.get(this.API_ENDPOINT + '/lista-actividades/'+ FK_LINEAMIENTO + '/' + FK_ALUMNO);
}


/*-----------------------------ALumno Creditos -------------------------*/
getCreditosbyAlumno(FK_ALUMNO){
  return this.httpclient.get(this.API_ENDPOINT + '/alumno-creditos/' + FK_ALUMNO);
}

/* ----------------------------Responsables de actividad --------------- */
getResponsables(){//para mostrar a los responsables al mmomento de registrar una actividad
  return this.httpclient.get(this.API_ENDPOINT + '/responsables-actividad');
}

getActRes(FK_ALUMNO){//mostrar las actividades designadas a un reponsable en especifico
  return this.httpclient.get(this.API_ENDPOINT + '/responsables-actividad/' + FK_ALUMNO);
}

getListaAsistencia(PK_ACTIVIDAD){//mostrar la lista de asistentes a alguna actividad en específico
  return this.httpclient.get(this.API_ENDPOINT + '/responsable-lista-asistentes/' + PK_ACTIVIDAD);

}

getAsistentes(PK_ACTIVIDAD){//mostrar los alumnos designados para tomar asistencia en una actividad
  return this.httpclient.get(this.API_ENDPOINT + '/asistentes-actividad/' + PK_ACTIVIDAD);
}

getAlumnoByNc(NUM_CONTROL){
  return this.httpclient.get(this.API_ENDPOINT + '/alumnos-num-control/' + NUM_CONTROL);
}

getPkUsuario(P_APELLIDO, S_APELLIDO, NOMBRE){
  return this.httpclient.get(this.API_ENDPOINT + '/alumnos-num-control/' + P_APELLIDO + '/' + S_APELLIDO + '/' + NOMBRE);
}

RegistrarAsistAct(asistenteActividad: AsistenteActividad){
  //console.log(asistenteActividad);
   const Headers = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpclient.post(this.API_ENDPOINT + '/asistentes-actividad', asistenteActividad, {headers : Headers}); 
}
    

}
