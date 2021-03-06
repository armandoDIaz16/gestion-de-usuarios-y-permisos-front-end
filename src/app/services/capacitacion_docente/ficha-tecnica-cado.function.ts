// import Swal from "sweetalert2";
import {FichaTecnica, Curso} from '../../models/capacitacion_docente/cado-model.model';
import {Injectable} from '@angular/core';
import {FichaTecnicaCadoService} from './ficha-tecnica-cado.service';
// import Swal from "sweetalert2";
import {CursoCadoService} from './curso-cado.service';

@Injectable({
    providedIn: 'root'
})
export class FichaTecnicaCadoFunction  {

  constructor(private ficha_service: FichaTecnicaCadoService,
              private curso_service: CursoCadoService) {}


    validar_seccion_elementos_didacticos( elementosArray: Array<Object>) {

        if (elementosArray.length <= 0 ) {
            return 'Debes agregar algún elemento didactico';
        }
        return true;
    }
    validar_seccion_criterios_evaluacion( criteriosArray: Array<Object>) {
        if (criteriosArray.length <= 0 ) {
            return 'Debes agregar algún Criterio de evaluación a la lista';
        }
        return true;
    }
    validar_seccion_competencias( competenciasArray: Array<Object>) {
        if (competenciasArray.length <= 0 ) {
            return 'Debes agregar alguna Competencia a la lista';
        }
        return true;
    }
    validar_seccion_fuentes_informacion( fuentesArray: Array<Object>) {
        if (fuentesArray.length <= 0 ) {
            return 'Debes agregar alguna Fuente de información a la lista';
        }
        return true;
    }
    validar_seccion_contenidos_tematicos( temasArray: Array<Object>) {
        if (temasArray.length <= 0 ) {
            return 'Debes agregar algún tema a la lista';
        }
        return true;
    }

        validar_contenido_tematico( tema: string, tiempo: number, actividad: string, curso: Curso) {

        if (tema.trim()  ==  '' ) {
            return 'Debes indicar el nombre del tema';
        }
        if (tiempo ==  null  || tiempo <= 0 ) {
            return 'Indica un tiempo valido para el tema';
        }
        if (tiempo > curso.total_horas ) {
            return 'El tiempo del tema no puede ser mayor al total de horas del curso, verificalo! ';
        }
        // si no es entero
        if (!(tiempo % 1 === 0)) {
            return 'El tiempo del tema no puede ser decimal, verificalo! ';
        }
        if (actividad.trim()  ==  '' ) {
            return 'Debes indicar una actividad de aprendizaje para el tema';
        }
        return true;
    }
    validar_criterios_evaluacion( criterio: string, valor: number, instrumento: string) {

        if (criterio.trim()  ==  '' ) {
            return 'Debes indicar el Criterio de evaluación ';
        }
        if (valor ==  null  || valor <= 0  || valor > 100 ) {
            return 'Indica un valor del Criterio valido ';
        }
        if (!(valor % 1 === 0)) {
            return 'El valor del Criterio no puede ser decimal, verificalo!';
        }
        if (instrumento.trim()  ==  '' ) {
            return 'Debes indicar el Instrumento de evaluación ';
        }
        return true;
    }

    validar_seccion_informacion_servicio( ficha: FichaTecnica, curso: Curso) {
        // 1:Curso 2:Curso - taller 3:Taller 4:Diplomado 5:Serie de platicas 6:Simposium 7:Otro
        if (ficha.tipo_servicio  == 7 &&
            ( ficha.otro_servicio == null || ficha.otro_servicio.trim() === '' ) ) {
            return 'Debes indicar el otro tipo de servicio';
        }
        if (ficha.tipo_servicio  <= 0) {
            return 'Debes indicar el tipo de servicio';
        }

        if (ficha.lugar_institucion <= 0) {
            return 'Debes indicar el Instituto Tecnológico, centro o unidad donde se llevará a cabo el curso';
        }
        if (curso.imagen_curso == null  ) {
            return 'Debes adjuntar una imagen al curso';
        }
        if (ficha.pk_ficha <= 0 ) {
            return 'La ficha técnica del curso no ha sido asignada, intenta más tarde';

        }
        return true;
    }

    actualiza_estatus_curso(curso: Curso, estatus: number, loaderModal: any , Swal: any) {
        //datos
        let error = false;
        let mensaje = '';
        loaderModal.show();
        // estatus 5 es  ENVIADO A REVISIÓN
        this.curso_service.actualiza_estatus_curso(curso.pk_curso, estatus).subscribe(
            data => {
                console.log(data);
                loaderModal.hide();//  200 ok
                // console.log(data);
                for ( const i in data) {
                    if (data[i]['estado'] === 'error') {
                        error = true;
                        mensaje = data[i]['mensaje'];
                    }
                }
                if (error) {
                    if (mensaje === '')
                        mensaje = '¡Lo sentimos ha ocurrido un error, intentalo más tarde!';

                    Swal.fire({
                        icon: 'error',
                        title: mensaje,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                    // return false;
                } else {
                    //actualizamos el estado a ENVIADO A REVISIÓN
                    curso.estado_curso = estatus;
                    for ( const i in data) {
                        if (data[i]['estado'] === 'exito')
                            mensaje = data[i]['mensaje'];
                    }
                    if (mensaje === '')
                        mensaje = '¡Se envió la información correctamente!';

                    Swal.fire({
                        icon: 'success',
                        title: mensaje,
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                    // return curso;
                }
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se pudo enviar la información, intentelo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                // return false;
            }
        );
    }

}
