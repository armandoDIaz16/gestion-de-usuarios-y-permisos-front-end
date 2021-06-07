// import Swal from "sweetalert2";
import {FichaTecnica, Curso, CV} from '../../models/capacitacion_docente/cado-model.model';
import {Injectable} from '@angular/core';
import {FichaTecnicaCadoService} from './ficha-tecnica-cado.service';
// import Swal from "sweetalert2";
import {CursoCadoService} from './curso-cado.service';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';

@Injectable({
    providedIn: 'root'
})
export class CvCadoFunction {

    constructor() {
    }

valida_datos_perfil( perfil: InterfacePerfil) {
    if (perfil.CORREO_INSTITUCIONAL == null || perfil.CORREO_INSTITUCIONAL.trim() == '') {
        return false;
    }
    if (perfil.TELEFONO_MOVIL == null || perfil.TELEFONO_MOVIL.trim() == '') {
        return false;
    }
    if (perfil.CORREO_INSTITUCIONAL == null || perfil.CORREO_INSTITUCIONAL.trim() == '') {
        return false;
    }
    if (perfil.FECHA_NACIMIENTO == null || perfil.FECHA_NACIMIENTO.trim() == '') {
        return false;
    }
    if (perfil.SEXO == null || perfil.SEXO < 0 ) {
        return false;
    }

        return true;
}

    validar_seccion_formacion_academica(formacionArray: Array<Object>) {

        if (formacionArray.length <= 0) {
            return 'Debe capturar los datos referentes a la formación académica';
        }
        return true;
    }
    validar_seccion_experiencia_docente(ExperienciaArray: Array<Object>) {

        if (ExperienciaArray.length <= 0) {
            return 'Debe capturar  las 3 experiencias como  docente  más recientes';
        }
        if (ExperienciaArray.length > 3) {
            return 'Solo debe capturar las 3 experiencias como  docente más recientes';
        }
        return true;

    }
    validar_seccion_experiencia_laboral(ExperienciaArray: Array<Object>) {

        if (ExperienciaArray.length <= 0) {
            return 'Debe capturar  las 3 experiencias laborales  más recientes';
        }
        if (ExperienciaArray.length > 3) {
            return 'Solo debe capturar las 3 experiencias laborales más recientes';
        }
        return true;

    }
    validar_seccion_productos_academicos(ProductosArray: Array<Object>) {

        if (ProductosArray.length <= 0) {
            return 'Debe capturar  al menos 1 producto académico para guardar la sección ';
        }
        if (ProductosArray.length > 3) {
            return 'Solo debe capturar máximo 3 productos académicos más recientes';
        }
        return true;

    }
    validar_seccion_participacion_instructor(ParticipacionArray: Array<Object>) {

        if (ParticipacionArray.length <= 0) {
            return 'Debe capturar  al menos una participación como instuctor para guardar la sección ';
        }
        if (ParticipacionArray.length > 3) {
            return 'Solo debe capturar máximo 3 participaciones como instructor más recientes';
        }
        return true;

    }
    validar_productos_academicos(actividad_form: string, desc_actividad_form: string, fecha_actividad_form: string) {

        if (actividad_form.trim() === '') {
            return 'Debes capturar el nombre de la actividad o producto';
        }
        if (actividad_form.length > 200 ) {
            return 'El nombre de la actividad o producto no debe exceder los 200 caracteres';
        }
        if (desc_actividad_form.trim() === '') {
            return 'Debes capturar la descripción de la actividad o producto';
        }
        if (desc_actividad_form.length > 300 ) {
            return 'La descripción de la actividad o producto no debe exceder los 300 caracteres';
        }
        if (fecha_actividad_form.trim() === '') {
            return 'Debes capturar la fecha de la actividad o producto';
        }
        return true;
    }
    validar_participacion_instructor(curso_form: string, empresa_curso_form: string, total_horas_curso_form: number,
                                     fecha_curso_form: string) {

        if (curso_form.trim() === '') {
            return 'Debes capturar el nombre del curso impartido';
        }
        if (curso_form.length > 200 ) {
            return 'El nombre del curso no debe exceder los 200 caracteres';
        }
        if (empresa_curso_form.trim() === '') {
            return 'Debes capturar la institución donde se impartió el curso';
        }
        if (empresa_curso_form.length > 200 ) {
            return 'El nombre de la institución no debe exceder los 200 caracteres';
        }
        if (total_horas_curso_form == null ) {
            return 'Debes capturar el total de horas';
        }
        if (total_horas_curso_form <= 0 ) {
            return 'El total de horas no puede ser un valor 0 o menor, captura un valor válido';
        }
        if (fecha_curso_form.trim() === '') {
            return 'Debes capturar la fecha de cuando se impartió el curso';
        }
        return true;
    }

    validar_experiencia_laboral(puesto_form: string, empresa_form: string, permanencia1_form: string,
                                permanencia2_form: string, actividades_cargo_form: string) {

        if (puesto_form.trim() === '') {
            return 'Debes capturar el nombre del puesto desempeñado';
        }
        if (puesto_form.length > 200 ) {
            return 'El nombre del puesto no debe exceder los 200 caracteres';
        }
        if (empresa_form.trim() === '') {
            return 'Debes indicar el nombre de la empresa';
        }
        if (empresa_form.length > 200 ) {
            return 'El nombre de la empresa no debe exceder los 200 caracteres';
        }
        if (permanencia1_form.trim() === '') {
            return 'Debes capturar la fecha de permanencia de inicio';
        }
        if (permanencia2_form != null) {
            if (permanencia1_form > permanencia2_form) {
            return 'La fecha de permanencia de inicio no puede ser mayor a la ' +
                'fecha de permanencia de finalización';
            }
        }
        if (actividades_cargo_form.trim() === '') {
            return 'Debes capturar las actividades desempeñadas en este puesto';
        }
        if (actividades_cargo_form.length > 400 ) {
            return 'Las actividades no deben exceder los 400 caracteres';
        }
        return true;
    }
    validar_formacion_academica(tipo_formacion: number, nombre_formacion: string, institucion: string,
                                fecha_titulacion: string, otro_estudios: string) {

        if (nombre_formacion.trim() === '') {
            return 'Debes capturar el nombre de la carrera';
        }
        if (nombre_formacion.length > 200 ) {
            return 'El nombre de la carrera no debe exceder los 200 caracteres';
        }
        if (tipo_formacion == null || tipo_formacion <= 0) {
            return 'Debes Seleccionar  un tipo de formación';
        }
        if (tipo_formacion == 5 && otro_estudios.trim() === '') {
            return 'Debes capturar el nombre del otro tipo de formación';
        }
        if (institucion.trim() === '') {
            return 'Debes indicar el nombre de la institución';
        }
        if (institucion.length > 200 ) {
            return 'El nombre de la institución no debe exceder los 200 caracteres';
        }
        if (fecha_titulacion.trim() === '') {
            return 'Debes capturar la fecha de titulación';
        }
        return true;
    }
    validar_experiencia_docente(materia_form: string, institucion_materia_form: number, otra_institucion_materia_form: string,
                                fecha1_periodo_form: string, fecha2_periodo_form: string) {

        if (materia_form.trim() === '') {
            return 'Debes capturar el nombre de la materia';
        }
        if (materia_form.length > 200 ) {
            return 'El nombre de la materia no debe exceder los 200 caracteres';
        }
        if (institucion_materia_form == null || institucion_materia_form < 0) {
            return 'Debes Seleccionar  una institución';
        }
        if (institucion_materia_form == 0 && otra_institucion_materia_form.trim() === '') {
            return 'Debes capturar el nombre de la otra institución';
        }
        if (institucion_materia_form == 0 && otra_institucion_materia_form.length > 200 ) {
            return 'El nombre de la otra institución no debe exceder los 200 caracteres';
        }
        if (fecha1_periodo_form.trim() === '') {
            return 'Debes capturar la fecha de inicio del periodo';
        }
        if (fecha2_periodo_form.trim() === '') {
            return 'Debes capturar la fecha de finalización del periodo';
        }
        if (fecha1_periodo_form > fecha2_periodo_form) {
            return 'La fecha de inicio del periodo no puede ser mayor a la ' +
                'fecha de  finalización';
        }
        return true;
    }

    validar_seccion_datos_personales(cv: CV, perfil: InterfacePerfil ) {

        if (cv.rfc.trim() == '' || cv.rfc.length < 12 || cv.rfc.length > 13 ) {
            return 'Debes capturar un RFC valido';
        }
        if (cv.biografia.trim() == '' || cv.biografia.length < 50 || cv.biografia.length > 500 ) {
            return 'Debes capturar tu biografía mínimo 50 caracteres máximo 500';
        }

        if (perfil.FOTO_PERFIL == null  ||  perfil.FOTO_PERFIL.trim() == '' ) {
            return 'Debes agregar una fotografía al CV';
        }

        if (cv.pk_cv <= 0) {
            return 'Debes recargar la página, para refrescar la información del CV';
        }

        return true;
    }
}
