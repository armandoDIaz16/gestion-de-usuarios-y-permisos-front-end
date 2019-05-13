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
  obtenerAsesorPeriodo(periodo) {
    return this.http.get(`${this.baseUrl}/AsesorPeriodo?periodo=` + periodo)
  }
  obtenerSolicitud() {
    return this.http.get(`${this.baseUrl}/Solicitudes`)
  }
  solicitud(data) {
    return this.http.post(`${this.baseUrl}/SolicitudAsesoria`, data)
  }
  solicitudAsesor(data) {
    return this.http.post(`${this.baseUrl}/SolicitudAsesor`, data)
  }
}

/* ?token=`+localStorage.getItem('token') */
