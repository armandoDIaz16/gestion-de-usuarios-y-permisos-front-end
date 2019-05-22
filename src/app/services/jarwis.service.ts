import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

  control(data) {
    return this.http.post(`${this.baseUrl}/control`, data)
  }
  hora(control, dia) {
    return this.http.get(`${this.baseUrl}/Hora?control=` + control + `&dia=` + dia)
  }
  horaAll(control) {
    return this.http.get(`${this.baseUrl}/HoraAll?control=` + control)
  }
  materia(control) {
    return this.http.get(`${this.baseUrl}/Materia?control=` + control)
  }
  datos(id) {
    return this.http.get(`${this.baseUrl}/Datos?id=` + id)
  }
  promedio(control) {
    return this.http.get(`${this.baseUrl}/Promedio?control=` + control)
  }
  MateriAsesor(control) {
    return this.http.get(`${this.baseUrl}/MateriAsesor?control=` + control)
  }
  obtenerAsesor() {
    return this.http.get(`${this.baseUrl}/Asesor`)
  }
  obtenerAsesorAsigna() {
    return this.http.get(`${this.baseUrl}/AsesorAsigna`)
  }
  obtenerAsesorPeriodo(periodo) {
    return this.http.get(`${this.baseUrl}/AsesorPeriodo?periodo=` + periodo)
  }
  obtenerSolicitud() {
    return this.http.get(`${this.baseUrl}/Solicitudes`)
  }
  obtenerSolicitudAsigna() {
    return this.http.get(`${this.baseUrl}/SolicitudesAsigna`)
  }
  obtenerSolicitudPeriodo(periodo) {
    return this.http.get(`${this.baseUrl}/SolicitudesPeriodo?periodo=` + periodo)
  }
  seguimiento(control) {
    return this.http.get(`${this.baseUrl}/Seguimiento?control=` + control)
  }
  allMaterias() {
    return this.http.get(`${this.baseUrl}/AllMaterias`)
  }
  claveGrupo() {
    return this.http.get(`${this.baseUrl}/ClaveGrupo`)
  }  
  
  addclave(clavegrupo) {
    return this.http.get(`${this.baseUrl}/ClaveHorario?clavegrupo=`+clavegrupo)
  }
  getAsesoria() {
    return this.http.get(`${this.baseUrl}/Asesoria`)
  }
  getAsesoriaPeriodo(periodo) {
    return this.http.get(`${this.baseUrl}/AsesoriaPeriodo?periodo=` + periodo)
  }
  getAsesoriaGrupo() {
    return this.http.get(`${this.baseUrl}/AsesoriaGrupo`)
  }
  getAsesoriaGrupoPeriodo(periodo) {
    return this.http.get(`${this.baseUrl}/AsesoriaGrupoPeriodo?periodo=` + periodo)
  }
  asesoriaInd(idind) {
    return this.http.get(`${this.baseUrl}/AsesoriaId?idind=` + idind)
  }
  docente() {
    return this.http.get(`${this.baseUrl}/Docentes`)
  }
  nameAses(id) {
    return this.http.get(`${this.baseUrl}/NameAses?id=` + id)
  }
  asesorSesion(id) {
    return this.http.get(`${this.baseUrl}/AsesorSesion?id=` + id)
  }










  solicitud(data) {
    return this.http.post(`${this.baseUrl}/SolicitudAsesoria`, data)
  }
  solicitudAsesor(data) {
    return this.http.post(`${this.baseUrl}/SolicitudAsesor`, data)
  }
  actualizAsesor(data) {
    return this.http.post(`${this.baseUrl}/ActualizAsesor`, data)
  }
  actualizaSolicitud(data) {
    return this.http.post(`${this.baseUrl}/ActualizaSolicitud`, data)
  }
  borrAsesor(data) {
    return this.http.post(`${this.baseUrl}/BorrAsesor`, data)
  }
  borraSolicitud(data) {
    return this.http.post(`${this.baseUrl}/BorraSolicitud`, data)
  }
  asignaIndividual(data) {
    return this.http.post(`${this.baseUrl}/AsignaIndividual`, data)
  }
  asignaGrupal(data) {
    return this.http.post(`${this.baseUrl}/AsignaGrupal`, data)
  }
  actualizaInd(data) {
    return this.http.post(`${this.baseUrl}/ActualizaInd`, data)
  }
  borraInd(data) {
    return this.http.post(`${this.baseUrl}/BorraInd`, data)
  }
  actualizaGrup(data) {
    return this.http.post(`${this.baseUrl}/ActualizaGrupo`, data)
  }
  borraGrup(data) {
    return this.http.post(`${this.baseUrl}/BorraGru`, data)
  }
  motivo(data) {
    return this.http.post(`${this.baseUrl}/Motivo`, data)
  }
  compromisoUser(data) {
    return this.http.post(`${this.baseUrl}/CompromisoUser`, data)
  }
  evaluacion(data) {
    return this.http.post(`${this.baseUrl}/EvaluacionSatisfaccion`, data)
  }
  compromisoAsesor(data) {
    return this.http.post(`${this.baseUrl}/CompromisoAsesor`, data)
  }
}

/* ?token=`+localStorage.getItem('token') */
