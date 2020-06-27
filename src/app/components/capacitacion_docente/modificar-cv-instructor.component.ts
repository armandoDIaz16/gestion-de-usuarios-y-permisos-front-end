// angular
import {Component, Renderer2, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// icons
import {faCalendarAlt, faClock, faEdit, faHdd, faEnvelope, faFileUpload, faInfoCircle, faMapMarkerAlt, faPlus, faTimes, faTrashAlt, faPaperPlane, faTrophy, faGraduationCap, faImage, faLink,  faPlusCircle, faFolderOpen, faChevronRight, faChevronDown, faBookmark } from '@fortawesome/free-solid-svg-icons';
// modelos
import {CV} from '../../models/capacitacion_docente/cado-model.model';
// alerts
import Swal from 'sweetalert2';
// navegar
import {ActivatedRoute, Router} from '@angular/router';
// servicios
import {CursoCadoService} from '../../services/capacitacion_docente/curso-cado.service';
// helpers
import {formatDate} from '@angular/common';

// servicios de funciones
import { CvCadoFunction } from '../../services/capacitacion_docente/cv-cado.function';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';
import {PerfilService} from '../../services/perfil.service';
import {CvCadoService} from '../../services/capacitacion_docente/cv-cado.service';

@Component({
  selector: 'app-modificar-cv-instructor',
  templateUrl: '../../views/capacitacion_docente/modificar-cv-instructor.component.html',
  styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class ModificarCvInstructorComponent implements OnInit {

    // element html references
    @ViewChild('inputOtroTipoFormacion')inputOtroTipoFormacion: ElementRef;
    @ViewChild('otraInstitucion')otraInstitucion: ElementRef;

    // modal
    @ViewChild('loaderModal') loaderModal;

    // icons
    edit = faEdit;  delete = faTrashAlt;
    add = faPlus;
    mail = faEnvelope;
    seccion = faBookmark;
    cancel = faTimes;
    date = faCalendarAlt;
    info = faInfoCircle;
    hora = faClock;
    enviar = faPaperPlane;
    cup = faTrophy;
    img = faImage;
    link = faLink;

// modelos
    cv: CV = {
    pk_cv:   -1,
    rfc:      '',
    biografia:  '',
    fk_participante: -1,
    // ------------------------
    formacion_academica: [], // este contendra el tipo formacion
    experiencia_laboral: [],
    experiencia_docente: [],
    productos_academicos: [],
    participacion_instructor: []
    };

// datos
    public usuario_en_sistema: string;
    public pk_participante_sistema: string;
    public tipo_participante: string;
    public perfil: InterfacePerfil = null;
    public nombre_institucion_exp_docente: string;
// datos form
    public nombre_formacion_apoyo: string;
    public tipo_formacion_apoyo: number;
    public otro_tipo_formacion_apoyo: string;
    public nombre_institucion_apoyo: string;
    public fecha_titulacion_apoyo: string;
    public cedula_apoyo: number;
    public puesto_form: string;
    public empresa_form: string;
    public permanencia1_form: string;
    public permanencia2_form: string;
    public actividades_cargo_form: string;
    public actividad_form: string;
    public desc_actividad_form: string;
    public fecha_actividad_form: string;
    public curso_form: string;
    public empresa_curso_form: string;
    public total_horas_curso_form: number;
    public fecha_curso_form: string;
    public materia_form: string;
    public institucion_materia_form: number;
    public otra_institucion_materia_form: string;
    public fecha1_periodo_form: string;
    public fecha2_periodo_form: string;


    public lista_tipos_formacion: object; // edificios
    formacionArray: Array<Object>;
    public lista_institutos: object; // institutos
    institutosArray: Array<Object>;

    //
    public display: string;

  constructor(  private activatedRouter: ActivatedRoute,
                private perfil_service: PerfilService,
                private cv_service: CvCadoService,
                private curso_service: CursoCadoService,
                private render: Renderer2,
                private cv_service_function:  CvCadoFunction,
                private router: Router,
              ) {
      this.init_formacion_components();
      this.init_experiencia_laboral_components();
      this.init_prductos_academicos_components();
      this.init_participacion_instructor_components();
      this.init_experiencia_docente_components();
      this.perfil = <InterfacePerfil> {};
  }
// inits
   ngOnInit() {
      this.display = 'block'; // despliega modal de carga TecNM
       this.carga_usuario_en_sistema();
      this.valida_completa_perfil();
  }
    init_formacion_components() {
        this.tipo_formacion_apoyo = -1;
        this.nombre_formacion_apoyo = '';
        this.otro_tipo_formacion_apoyo = '';
        this.nombre_institucion_apoyo = '';
        this.fecha_titulacion_apoyo = '';
        this.cedula_apoyo = null;
    }
    init_experiencia_laboral_components() {
        this.puesto_form = '';
        this.empresa_form = '';
        this.permanencia1_form = '';
        this.permanencia2_form = '';
        this.actividades_cargo_form = '';
    }
    init_prductos_academicos_components() {
        this.actividad_form = '';
        this.desc_actividad_form = '';
        this.fecha_actividad_form = '';
    }
    init_participacion_instructor_components() {
        this.curso_form = '';
        this.empresa_curso_form = '';
        this.total_horas_curso_form = null;
        this.fecha_curso_form = '';
    }
    init_experiencia_docente_components() {
        this.materia_form = '';
        this.institucion_materia_form = -1;
        this.otra_institucion_materia_form = '';
        this.fecha1_periodo_form = '';
        this.fecha2_periodo_form = '';
    }

    // geters
    get formacion_academica_list() {
        return this.cv.formacion_academica;
    }
    get experiencia_laboral_list() {
        return this.cv.experiencia_laboral;
    }
    get prductos_academicos_list() {
        return this.cv.productos_academicos;
    }
    get participacion_instructor_list() {
        return this.cv.participacion_instructor;
    }
    get experiencia_docente_list() {
        return this.cv.experiencia_docente;
    }

    // carga catalagos
    carga_tipos_formacion() {
        this.lista_tipos_formacion = null;

        this.cv_service.carga_tipos_formacion().subscribe (
            data => {
                this.lista_tipos_formacion = data;
                this.formacionArray = [];

                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_tipos_formacion) {
                    this.formacionArray.push( this.lista_tipos_formacion[i]);
                }
                // console.log(this.formacionArray);
                // console.log(this.lista_tipos_formacion);
                this.display = 'none';
            },
            error => {
                console.error('no se cargaron la lista de tipos de formación');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista  de tipos de formación  intentelo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                this.display = 'none';
            }
        );
    }
    consulta_institutos() {
        this.lista_institutos = null;
        this.curso_service.consulta_institutos().subscribe (
            data => {
                this.lista_institutos = data;
                this.institutosArray = [];
                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_institutos) {
                    this.institutosArray.push( this.lista_institutos[i]);
                }
                console.log(this.institutosArray);
                console.log(this.lista_institutos);
                this.display = 'none';
            },
            error => {
                console.error('no se cargaron la lista de Institutos');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista de Institutos intentelo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                this.display = 'none';
            }
        );
    }

    // seccion datos personales
    guardar_datos_personales() {
        const resultado_validacion = this.cv_service_function.validar_seccion_datos_personales(this.cv, this.perfil);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';

            const body = {
                pk_cv: this.cv.pk_cv,
                pk_participante: this.cv.fk_participante,
                rfc: this.cv.rfc,
                biografia: this.cv.biografia,
                fk_usuario_registra: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.cv_service.guardar_datos_personales(body).subscribe(
                data => {  //  200 ok
                    this.procesa_respuesta(data, mensaje, error);
                },
                error => { // cuando ocurre un error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    actualiza_foto(evt: any) {
        Swal.fire({
            title: '¿Está seguro que desea actualizar la foto la perfil?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {
                const archivo: File = evt.target.files[0];
                if (!archivo) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Seleccione la foto de perfil',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                // this.loaderModal.show();
                const myReader: FileReader = new FileReader();
                myReader.onloadend = async (e) => {
                    const body = {
                        'PK_ENCRIPTADA': sessionStorage.getItem('IdEncriptada'),
                        'NOMBRE_ARCHIVO': archivo.name.split('.').shift(),
                        'EXTENSION': archivo.name.split('.').pop(),
                        'CONTENIDO': myReader.result
                    };

                    this.perfil_service.cambia_foto(body).subscribe(
                        data => {
                            this.perfil.FOTO_PERFIL = data + '';
                        },
                        error => {
                        }
                    );
                };
                myReader.readAsDataURL(archivo);

                // this.loaderModal.hide();
            }
        });
    }

    // seccion formacion academica
    verificaOtroTipoFormacion() {
        // 1:Licenciatura 2: Maestría  3: Doctorado 4:Especialidad 5:otros estudios
        if (this.tipo_formacion_apoyo == 5) {
            console.log(this.tipo_formacion_apoyo);
            this.render.removeAttribute(this.inputOtroTipoFormacion.nativeElement, 'hidden');
        } else {
            this.render.setAttribute(this.inputOtroTipoFormacion.nativeElement, 'hidden','');
        }
    }
    verificaOcultaOtroTipoFormacion() {
        // 1:Licenciatura 2: Maestría  3: Doctorado 4:Especialidad 5:otros estudios
        if (this.tipo_formacion_apoyo == 5) {
            this.render.setAttribute(this.inputOtroTipoFormacion.nativeElement, 'hidden','');
        }
    }
    add_formacion_academica() {
        const resultado_validacion = this.cv_service_function.validar_formacion_academica(
                                                                        this.tipo_formacion_apoyo,
                                                                        this.nombre_formacion_apoyo,
                                                                        this.nombre_institucion_apoyo,
                                                                        this.fecha_titulacion_apoyo,
                                                                        this. otro_tipo_formacion_apoyo);
        if (resultado_validacion === true) {
            // preparamos texto formación
            let mombre_tipo_formacion = '';
            for ( const i in this.formacionArray) {
                if (this.formacionArray[i]['PK_TIPO_FORMACION_ACADEMICA'] == this.tipo_formacion_apoyo)
                    mombre_tipo_formacion = this.formacionArray[i]['NOMBRE_TIPO'];
            }
            const tipo_formacion = {
                NOMBRE_TIPO: mombre_tipo_formacion
            };
            // armamos el objeto para agregarlo a la lista de elementos en la ficha

            const body_formacion = {
                PK_FORMACION_ACADEMICA_CV: -1,
                FK_CV: this.cv.pk_cv,
                TIPO_FORMACION : this.tipo_formacion_apoyo,
                OTRO_TIPO      : this.otro_tipo_formacion_apoyo,
                NOMBRE_CARRERA : this.nombre_formacion_apoyo,
                INSTITUCION    : this.nombre_institucion_apoyo,
                FECHA_TITULACION : this.fecha_titulacion_apoyo,
                // enviamos -1 para no registrar el dato ya que es un dato opcional
                CEDULA_PROFESIONAL : this.cedula_apoyo == null ? -1 : this.cedula_apoyo,
                tipo_formacion      :  tipo_formacion,
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.formacion_academica_list.push(body_formacion);
            // reseteamos valores
            this.verificaOcultaOtroTipoFormacion();
            this.init_formacion_components();

        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    borrar_formacion_academica(i: number) {
        this.formacion_academica_list.splice(i, 1);
    }
    guardar_formacion_academica() {
        const resultado_validacion = this.cv_service_function.validar_seccion_formacion_academica(this.formacion_academica_list);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_cv: this.cv.pk_cv,
                array_formacion_academica: this.formacion_academica_list,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.cv_service.guardar_formacion_academica(body).subscribe(
                data => {  //  200 ok
                    // console.log(data);
                    this.procesa_respuesta(data, mensaje, error);
                },
                error => { // cuando ocurre un error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }

    // seccion experiencia laboral
    add_experiencia_laboral() {
        const resultado_validacion = this.cv_service_function.validar_experiencia_laboral(
                                                            this.puesto_form,
                                                            this.empresa_form,
                                                            this.permanencia1_form,
                                                            this.permanencia2_form,
                                                            this. actividades_cargo_form);
        if (resultado_validacion === true) {
            // armamos el objeto para agregarlo a la lista de elementos en la ficha
            const body_experiencia_laboral = {
                PK_EXPERIENCIA_LABORAL_CV: -1,
                FK_CV: this.cv.pk_cv,
                NOMBRE_PUESTO : this.puesto_form,
                NOMBRE_EMPRESA    : this.empresa_form,
                FECHA_INICIO_PERMANENCIA : this.permanencia1_form,
                FECHA_FIN_PERMANENCIA : this.permanencia2_form,
                ACTIVIDADES_A_CARGO : this.actividades_cargo_form,
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.experiencia_laboral_list.push(body_experiencia_laboral);
            // reseteamos valores
            this.init_experiencia_laboral_components();

        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    borrar_experiencia_laboral(i: number) {
        this.experiencia_laboral_list.splice(i, 1);
    }
    guardar_experiencia_laboral() {
        const resultado_validacion = this.cv_service_function.validar_seccion_experiencia_laboral(this.experiencia_laboral_list);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_cv: this.cv.pk_cv,
                array_experiencia_laboral: this.experiencia_laboral_list,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.cv_service.guardar_experiencia_laboral(body).subscribe(
                data => {  //  200 ok
                    // console.log(data);
                    this.procesa_respuesta(data, mensaje, error);
                },
                error => { // cuando ocurre un error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }

    // seccion experiencia docente
    verificaOtraInstitucion() {
        // 0: otra institucion , 1 en adelante las pk de los institutos registrados en la tabla
        // CAT_INSTITUCION
        if (this.institucion_materia_form == 0) {
            console.log(this.tipo_formacion_apoyo);
            this.render.removeAttribute(this.otraInstitucion.nativeElement, 'hidden');
        } else {
            this.render.setAttribute(this.otraInstitucion.nativeElement, 'hidden','');
        }
    }
    verificaOcultaOtraInstitucion() {
        // 1:Licenciatura 2: Maestría  3: Doctorado 4:Especialidad 5:otros estudios
        if (this.institucion_materia_form == 0) {
            this.render.setAttribute(this.otraInstitucion.nativeElement, 'hidden','');
        }
    }
    add_experiencia_docente() {
        const resultado_validacion = this.cv_service_function.validar_experiencia_docente(
            this.materia_form,
            this.institucion_materia_form,
            this.otra_institucion_materia_form,
            this.fecha1_periodo_form,
            this. fecha2_periodo_form);
        if (resultado_validacion === true) {
            // preparamos texto institucion
            this.nombre_institucion_exp_docente = '';
            for ( const i in this.institutosArray) {
                if (this.institutosArray[i]['PK_INSTITUCION'] == this.institucion_materia_form)
                    this.nombre_institucion_exp_docente = this.institutosArray[i]['NOMBRE'];
            }
            const instituto = {
                NOMBRE: this.nombre_institucion_exp_docente
            };
            // armamos el objeto para agregarlo a la lista de elementos en la ficha

            const body_exp_docente = {
                PK_EXPERIENCIA_DOCENTE_CV: -1,
                FK_CV: this.cv.pk_cv,
                FK_INSTITUCION              : this.institucion_materia_form,
                NOMBRE_OTRA_INSTITUCION      : this.otra_institucion_materia_form,
                NOMBRE_MATERIA             : this.materia_form,
                FECHA_INICIO_PERIODO               : this.fecha1_periodo_form,
                FECHA_FIN_PERIODO               : this.fecha2_periodo_form,
                instituto  : instituto
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.experiencia_docente_list.push(body_exp_docente);
            // reseteamos valores
            this.verificaOcultaOtraInstitucion();
            this.init_experiencia_docente_components();

        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    borrar_experiencia_docente(i: number) {
        this.experiencia_docente_list.splice(i, 1);
    }
    guardar_seccion_experiencia_docente() {
        const resultado_validacion = this.cv_service_function.validar_seccion_experiencia_docente(this.experiencia_docente_list);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_cv: this.cv.pk_cv,
                array_experiencia_docente: this.experiencia_docente_list,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.cv_service.guardar_seccion_experiencia_docente(body).subscribe(
                data => {  //  200 ok
                    // console.log(data);
                    this.procesa_respuesta(data, mensaje, error);
                },
                error => { // cuando ocurre un error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }

    // seccion productos academicos
    add_producto_academico() {
        const resultado_validacion = this.cv_service_function.validar_productos_academicos(
            this.actividad_form,
            this.desc_actividad_form,
            this.fecha_actividad_form);

        if (resultado_validacion === true) {
            // armamos el objeto para agregarlo a la lista de elementos en la ficha
            const body_prodcuto = {
                PK_EXPERIENCIA_LABORAL_CV: -1,
                FK_CV: this.cv.pk_cv,
                NOMBRE_PRODUCTO : this.actividad_form,
                DESCRIPCION    : this.desc_actividad_form,
                FECHA_PRODUCTO : this.fecha_actividad_form,
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.prductos_academicos_list.push(body_prodcuto);
            // reseteamos valores
            this.init_prductos_academicos_components();

        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    borrar_producto_academico(i: number) {
        this.prductos_academicos_list.splice(i, 1);
    }
    guardar_productos_academicos() {
        const resultado_validacion = this.cv_service_function.validar_seccion_productos_academicos(this.prductos_academicos_list);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_cv: this.cv.pk_cv,
                array_prductos_academicos: this.prductos_academicos_list,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.cv_service.guardar_productos_academicos(body).subscribe(
                data => {  //  200 ok
                    // console.log(data);
                    this.procesa_respuesta(data, mensaje, error);
                },
                error => { // cuando ocurre un error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }

    // seccion productos academicos
    add_participacion_instructor() {
        const resultado_validacion = this.cv_service_function.validar_participacion_instructor(
            this.curso_form,
            this.empresa_curso_form,
            this.total_horas_curso_form,
            this.fecha_curso_form);

        if (resultado_validacion === true) {
            // armamos el objeto para agregarlo a la lista de elementos en el cv
            const body_participacion = {
                PK_PARTICIPACION_INSTRUCTOR_CV: -1,
                FK_CV: this.cv.pk_cv,
                TITULO_CURSO : this.curso_form,
                NOMBRE_INSTITUCION    : this.empresa_curso_form,
                HRS_DURACION_CURSO : this.total_horas_curso_form,
                FECHA_IMPARTICION : this.fecha_curso_form,
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.participacion_instructor_list.push(body_participacion);
            // reseteamos valores
            this.init_participacion_instructor_components();

        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    borrar_participacion_instructor(i: number) {
        this.participacion_instructor_list.splice(i, 1);
    }
    guardar_seccion_participacion_instructor() {
        const resultado_validacion = this.cv_service_function.validar_seccion_participacion_instructor(this.participacion_instructor_list);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_cv: this.cv.pk_cv,
                array_participacion_instructor: this.participacion_instructor_list,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.cv_service.guardar_seccion_participacion_instructor(body).subscribe(
                data => {  //  200 ok
                    // console.log(data);
                    this.procesa_respuesta(data, mensaje, error);
                },
                error => { // cuando ocurre un error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }



    // metodos generales
    carga_usuario_en_sistema() {
        this.usuario_en_sistema = sessionStorage.getItem('IdUsuario');

        this.pk_participante_sistema = sessionStorage.getItem('participante');
        if ( this.pk_participante_sistema !== '0') {
            this.tipo_participante = sessionStorage.getItem('tipo_participante');
        }
    }
    cargar_datos_cv(cv: any) {
        if ( Object.keys(cv).length > 0 ) {
            this.cv = { // armamos el cv
                pk_cv: cv['PK_CV_PARTICIPANTE'],
                rfc : cv['RFC'],
                biografia:  cv['BIOGRAFIA'],
                fk_participante: cv['FK_PARTICIPANTE_CADO'],
                // ------------------------
                formacion_academica: cv['formaciones'], // este contendra el tipo formacion
                experiencia_laboral: cv['experiencias_laborales'],
                experiencia_docente: cv['experiencia_docente'],
                productos_academicos: cv['productos_academicos'],
                participacion_instructor: cv['participacion_instructor'],
            };
            // this.verificaOtrainstituion();
        }
    }
    async valida_completa_perfil() {
        // validamos que haya capturado su CV
        this.display = 'block';
        let data_perfil = await this.perfil_service.get_perfil_CV(this.usuario_en_sistema);
        data_perfil = data_perfil['data'];
        console.log(data_perfil);
        if (data_perfil) {
            this.perfil = <InterfacePerfil>data_perfil;
            if (!this.cv_service_function.valida_datos_perfil(this.perfil)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Antes de capturar tu CV, debes completar la información de tu perfil',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                await this.router.navigateByUrl('/usuarios/c67214e3855338c12a68dfa2c87eb47f');
            } else {
                // consulta objeto CV
                const data_cv = await this.cv_service.busca_participante_cv(this.pk_participante_sistema);
                console.log(data_cv);
                const cv = <Array<object>> data_cv['cv'];
                if ( cv == null || cv.length <= 0) {
                    // no tiene cv
                    this.crear_cv(this.pk_participante_sistema);
                } else {
                    // si tiene cv
                    this.cargar_datos_cv(cv[0]);
                }
                // carga catalagos
                this.carga_tipos_formacion();
                this.consulta_institutos();
                this.display = 'none';
            }
        }
    }
  crear_cv(pk_participante: string) {
        const body = {
            pk_participante:  pk_participante
        };
        this.cv_service.crear_actualizar_cv(body).subscribe(
            data => {
                // console.log('crear_actualizar_ficha' + data);
                this.cv.pk_cv = data['pk_cv'];
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo asignar el CV al  participante, intente, más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                });
            }
        );
    }
  procesa_respuesta(data: any, mensaje: string, error: boolean) {
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
      } else {
          for ( const i in data) {
              if (data[i]['estado'] === 'exito')
                  mensaje = data[i]['mensaje'];
          }
          if (mensaje === '')
              mensaje = '¡Se guardo la sección correctamente!';

          Swal.fire({
              icon: 'success',
              title: mensaje,
              showConfirmButton: true,
              confirmButtonText: 'OK'
          });
      }
    }
}
