import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericServicesService} from './generic-services.service';

@Injectable({
    providedIn: 'root'
})
export class JarwisService extends GenericServicesService {
    constructor(private http: HttpClient,
                private genericServicesService: GenericServicesService) {
        super(http);
    }

    /*  private baseUrl = 'http://127.0.0.1:8000/api';*/
    private baseUrl = GenericServicesService.API_ENDPOINT;
    //private baseUrl = 'http://localhost:8000/api/';

    /*
    * Llamada a servicio para validar número de control
    * en obtención de contraseña
    * */
    control(data) {
        return this.http.post(`${this.baseUrl}control`, data);
    }

    /*
    * Llamada a servicio para validar el curp y registrar nuevo usuario
    * en obtención de contraseña
    * */
    signup(data) {
        return this.http.post(`${this.baseUrl}signup`, data);
    }

    login(data) {
        return this.http.post(`${this.baseUrl}login`, data);
    }

    sendPasswordResetLink(data) {
        return this.http.post(`${this.baseUrl}sendPasswordResetLink`, data);
    }

    changePassword(data) {
        return this.http.post(`${this.baseUrl}resetPassword`, data);
    }

    hora(control, dia) {
        return this.http.get(`${this.baseUrl}Hora?control=` + control + `&dia=` + dia);
    }

    horaAll(control) {
        return this.http.get(`${this.baseUrl}HoraAll?control=` + control);
    }

    materia(control) {
        return this.http.get(`${this.baseUrl}Materia?control=` + control);
    }

    datos(id) {
        return this.http.get(`${this.baseUrl}Datos?id=` + id);
    }

    promedio(control) {
        return this.http.get(`${this.baseUrl}Promedio?control=` + control);
    }

    MateriAsesor(control) {
        return this.http.get(`${this.baseUrl}MateriAsesor?control=` + control);
    }

    obtenerAsesor() {
        return this.http.get(`${this.baseUrl}Asesor`);
    }

    obtenerAsesorAsigna() {
        return this.http.get(`${this.baseUrl}AsesorAsigna`);
    }

    obtenerAsesorPeriodo(periodo) {
        return this.http.get(`${this.baseUrl}AsesorPeriodo?periodo=` + periodo);
    }

    obtenerSolicitud() {
        return this.http.get(`${this.baseUrl}Solicitudes`);
    }

    obtenerSolicitudAsigna() {
        return this.http.get(`${this.baseUrl}SolicitudesAsigna`);
    }

    obtenerSolicitudPeriodo(periodo) {
        return this.http.get(`${this.baseUrl}SolicitudesPeriodo?periodo=` + periodo);
    }

    seguimiento(control) {
        return this.http.get(`${this.baseUrl}Seguimiento?control=` + control);
    }

    allMaterias() {
        return this.http.get(`${this.baseUrl}AllMaterias`);
    }

    claveGrupo() {
        return this.http.get(`${this.baseUrl}ClaveGrupo`);
    }

    addclave(clavegrupo) {
        return this.http.get(`${this.baseUrl}ClaveHorario?clavegrupo=` + clavegrupo);
    }

    getAsesoria() {
        return this.http.get(`${this.baseUrl}Asesoria`);
    }

    getAsesoriaPeriodo(periodo) {
        return this.http.get(`${this.baseUrl}AsesoriaPeriodo?periodo=` + periodo);
    }

    getAsesoriaGrupo() {
        return this.http.get(`${this.baseUrl}AsesoriaGrupo`);
    }

    getAsesoriaGrupoPeriodo(periodo) {
        return this.http.get(`${this.baseUrl}AsesoriaGrupoPeriodo?periodo=` + periodo);
    }

    asesoriaInd(idind) {
        return this.http.get(`${this.baseUrl}AsesoriaId?idind=` + idind);
    }

    docente() {
        return this.http.get(`${this.baseUrl}Docentes`);
    }

    nameAses(id) {
        return this.http.get(`${this.baseUrl}NameAses?id=` + id);
    }

    asesorSesion(id) {
        return this.http.get(`${this.baseUrl}AsesorSesion?id=` + id);
    }

    alumnoAsesoriaLista(id) {
        return this.http.get(`${this.baseUrl}AlumnosAsesoria?id=` + id);
    }

    alumnoAsesoriaListaMateria(id, materialis) {
        return this.http.get(`${this.baseUrl}AlumnosAsesoriaMateria?id=` + id + `&materialis=` + materialis);
    }

    obtenerSesion(id, materiafin) {
        return this.http.get(`${this.baseUrl}Sesion?id=` + id + `&materiafin=` + materiafin);
    }

    getReprobados() {
        return this.http.get(`${this.baseUrl}Reprobados`);
    }

    getMateriasReprobadas(selectreprobado) {
        return this.http.get(`${this.baseUrl}Recursando?selectreprobado=` + selectreprobado);
    }

    getMateriasRecursando(clavemateriasituacion, selectreprobado) {
        return this.http.get(`${this.baseUrl}MateriaRepeticion?clavemateriasituacion=` + clavemateriasituacion + `&selectreprobado=` + selectreprobado);
    }

    asesorFinal() {
        return this.http.get(`${this.baseUrl}AsesorFinal`);
    }

    asesorFinalPeriodo(a) {
        return this.http.get(`${this.baseUrl}AsesorFinalPeriodo?periodo=` + a);
    }

    complementaria(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        window.open(`${this.baseUrl}PdfComplementaria?destinatario=` + a + `&suscribe=` + b + `&estudiante=` + c + `&control=` + d + `&carrera=` + e
            + `&actividad=` + f + `&desempeno=` + g + `&valor=` + h + `&periodo=` + i + `&extiende=` + j + `&nombre1=` + k + `&cargo1=` + l
            + `&nombre2=` + m + `&cargo2=` + n);
    }

    servicio(a, b, c, d, e, f, g, h, i, j, k) {
        window.open(`${this.baseUrl}PdfServicio?oficio=` + a + `&asunto=` + b + `&director=` + c + `&atencion=` + d + `&prestador=` + e
            + `&carreraSer=` + f + `&controlSer=` + g + `&periodoSer=` + h + `&caracter=` + i + `&diasmes=` + j + `&atentamente=` + k);
    }

    getMotivos() {
        return this.http.get(`${this.baseUrl}TodosMotivos`);
    }

    getMotivosPeriodo(a) {
        return this.http.get(`${this.baseUrl}MotivosPeriodo?periodo=` + a);
    }

    getComprimisoUser() {
        return this.http.get(`${this.baseUrl}TodosCompromisoUser`);
    }

    getComprimisoUserPeriodo(a) {
        return this.http.get(`${this.baseUrl}CompromisoUserPeriodo?periodo1=` + a);
    }

    getComprimisoAsesor() {
        return this.http.get(`${this.baseUrl}TodosCompromisoAsesor`);
    }

    getComprimisoAsesorPeriodo(a) {
        return this.http.get(`${this.baseUrl}CompromisoAsesorPeriodo?periodo2=` + a);
    }

    getEvaluacion() {
        return this.http.get(`${this.baseUrl}TodosEvaluacion`);
    }

    getEvaluacionPeriodo(a) {
        return this.http.get(`${this.baseUrl}EvaluacionPeriodo?periodo3=` + a);
    }

    getCalificacion() {
        return this.http.get(`${this.baseUrl}TodosCalificacion`);
    }

    getCalificacionPeriodo(a) {
        return this.http.get(`${this.baseUrl}CalificacionPeriodo?periodo4=` + a);
    }

    getSesiones() {
        return this.http.get(`${this.baseUrl}TodosSesiones`);
    }

    getSesionesPeriodo(a) {
        return this.http.get(`${this.baseUrl}SesionesPeriodo?periodo5=` + a);
    }

    getAsistencia() {
        return this.http.get(`${this.baseUrl}TodosAsistencia`);
    }

    getAsistenciaPeriodo(a) {
        return this.http.get(`${this.baseUrl}AsistenciaPeriodo?periodo6=` + a);
    }

    getReporteFinal() {
        return this.http.get(`${this.baseUrl}TodosReporteFinal`);
    }

    getReporteFinalPeriodo(a) {
        return this.http.get(`${this.baseUrl}ReporteFinalPeriodo?periodo7=` + a);
    }

    getAsignacion() {
        return this.http.get(`${this.baseUrl}TodosAsignacion`);
    }

    getSituacionPeriodo(a) {
        return this.http.get(`${this.baseUrl}SituacionPeriodo?periodo2=` + a);
    }

    getAsesores() {
        return this.http.get(`${this.baseUrl}TodosAsesores`);
    }

    getAsesoresPeriodo(a) {
        return this.http.get(`${this.baseUrl}AsesoresPeriodo?periodo=` + a);
    }

    getSesionAsesor(a) {
        return this.http.get(`${this.baseUrl}SesionAsesor?id=` + a);
    }

    getCorreosAlumnos(a) {
        return this.http.get(`${this.baseUrl}CorreosAlumnos?id=` + a);
    }

    getListaAlumnos(a) {
        return this.http.get(`${this.baseUrl}ListaAlumnos?id=` + a);
    }

    getAsesorCorreo(a) {
        return this.http.get(`${this.baseUrl}CorreoAsesor?id=` + a);
    }


    solicitud(data) {
        return this.http.post(`${this.baseUrl}SolicitudAsesoria`, data);
    }

    solicitudAsesor(data) {
        return this.http.post(`${this.baseUrl}SolicitudAsesor`, data);
    }

    actualizAsesor(data) {
        return this.http.post(`${this.baseUrl}ActualizAsesor`, data);
    }

    actualizaSolicitud(data) {
        return this.http.post(`${this.baseUrl}ActualizaSolicitud`, data);
    }

    borrAsesor(data) {
        return this.http.post(`${this.baseUrl}BorrAsesor`, data);
    }

    borraSolicitud(data) {
        return this.http.post(`${this.baseUrl}BorraSolicitud`, data);
    }

    asignaIndividual(data) {
        return this.http.post(`${this.baseUrl}AsignaIndividual`, data);
    }

    asignaGrupal(data) {
        return this.http.post(`${this.baseUrl}AsignaGrupal`, data);
    }

    actualizaInd(data) {
        return this.http.post(`${this.baseUrl}ActualizaInd`, data);
    }

    borraInd(data) {
        return this.http.post(`${this.baseUrl}BorraInd`, data);
    }

    actualizaGrup(data) {
        return this.http.post(`${this.baseUrl}ActualizaGrupo`, data);
    }

    borraGrup(data) {
        return this.http.post(`${this.baseUrl}BorraGru`, data);
    }

    motivo(data) {
        return this.http.post(`${this.baseUrl}Motivo`, data);
    }

    compromisoUser(data) {
        return this.http.post(`${this.baseUrl}CompromisoUser`, data);
    }

    evaluacion(data) {
        return this.http.post(`${this.baseUrl}EvaluacionSatisfaccion`, data);
    }

    compromisoAsesor(data) {
        return this.http.post(`${this.baseUrl}CompromisoAsesor`, data);
    }

    creaSesion(data) {
        return this.http.post(`${this.baseUrl}CreaSesion`, data);
    }

    creaLista(data) {
        return this.http.post(`${this.baseUrl}CreaLista`, data);
    }

    creaFin(data) {
        return this.http.post(`${this.baseUrl}CreaFin`, data);
    }

    asignaSituacion(data) {
        return this.http.post(`${this.baseUrl}AsignaSituacion`, data);
    }

    enviarCorreo(data) {
        return this.http.post(`${this.baseUrl}EnviarCorreoPAAE`, data);
    }

    creaCalificacion(data) {
        return this.http.post(`${this.baseUrl}CreaCalificacion`, data);
    }
}

/* ?token=`+localStorage.getItem('token') */
