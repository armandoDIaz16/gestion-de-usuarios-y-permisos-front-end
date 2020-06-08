// angular
import {Component, Renderer2, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// icons
import {faCalendarAlt, faClock, faEdit, faHdd, faThumbsDown, faCircle, faCheck, faFilePdf, faPaperclip, faFileUpload, faInfoCircle, faMapMarkerAlt, faPlus, faTimes, faTrashAlt, faPaperPlane, faTrophy, faGraduationCap, faImage, faLink,  faPlusCircle, faFolderOpen, faChevronRight, faChevronDown, faBookmark } from '@fortawesome/free-solid-svg-icons';
// modelos
import {Contenido_Tematico, Curso, FichaTecnica} from '../../models/capacitacion_docente/cado-model.model';
// alerts
import Swal from 'sweetalert2';
// navegar
import {ActivatedRoute} from '@angular/router';
// servicios
import {CursoCadoService} from '../../services/capacitacion_docente/curso-cado.service';
import { FichaTecnicaCadoService } from '../../services/capacitacion_docente/ficha-tecnica-cado.service';
import {PeriodosCadoService} from '../../services/capacitacion_docente/periodos-cado.service';
// helpers
import {formatDate} from '@angular/common';

// servicios de funciones
import { FichaTecnicaCadoFunction } from '../../services/capacitacion_docente/ficha-tecnica-cado.function';
@Component({
  selector: 'app-ver-ficha-tecnica',
  templateUrl: '../../views/capacitacion_docente/ver-ficha-tecnica.component.html',
  styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class VerFichaTecnicaComponent implements OnInit {

// element html references
    @ViewChild('inputOtroTipoCurso')inputOtroTipoCurso: ElementRef;
    // modal
    @ViewChild('loaderModal') loaderModal;
    // form
    formaElementosDidacticos: FormGroup;
    // formaContenidoTematico: FormGroup;
    // icons
    edit = faEdit;  delete = faTrashAlt;
    add = faPlus; pdf = faFilePdf;
    adjunto = faPaperclip; aceptar = faCheck;
    seccion = faBookmark; bad = faThumbsDown;
    subir = faFileUpload; opcion = faCircle;
    circulomas = faPlusCircle;     cancel = faTimes;
    date = faCalendarAlt;    info = faInfoCircle;
    hora = faClock;    mapa = faMapMarkerAlt;
    enviar = faPaperPlane;    cup = faTrophy;
    graduacion = faGraduationCap;    img = faImage;
    link = faLink;    folder = faFolderOpen;
    flechader = faChevronRight;   flechaabajo = faChevronDown;

    // datos de apoyo
    public validado = false;
    public display: string;
    public periodo_curso: object;
    public usuario_en_sistema: string;
    public area_texto: string = '';
    public texto_instucion: '';
    public texto_edificio: '';
    public texto_campus: string;
    public comentario: string = '';
    public pk_participante_sistema: string;
    public tipo_participante: string;
    // public texto_periodo: string;
    public texto_tipo_curso: string;
    public texto_estado_curso: string;
    public texto_tipo_servicio: string = '';

    // listas
    public lista_area_academica: object; // areas
    areasArray: Array<Object>;
    public lista_cursos: object; // estados curso
    cursosArray: Array<Object>;
    public lista_periodos: object; // periodos
    periodosArray: Array<Object>;
    public lista_edificios: object; // edificios
    edificiosArray: Array<Object>;
    public lista_institutos: object; // institutos
    institutosArray: Array<Object>;
    public lista_comentarios: object; // lista_comentarios
// modelos
    ficha: FichaTecnica = {
        pk_ficha:   -1,
        lugar_institucion : 1, // 1 es por defautl el ITL todo revisar valor de la BD en produccion
        introduccion: '',
        justificacion: '',
        objetivo_general: '',
        tipo_servicio: -1,
        otro_servicio: '',
        // ------------------------
        fecha_registro: '',
        hora_registro: '',
        contenido_tematico: [], // este contendra los archivos aenxados por tema
        elementos_didacticos: [],
        criterios_evaluacion: [],
        competencias: [],
        fuentes_informacion: [],
        comentarios: []
    };
    private contenido_modal: Contenido_Tematico = {
        pk_tema:  -1,
        nombre_tema: '',
        actividad_aprendizaje: '',
        tiempo_horas:    null,
        indice_array:    -1
    };
    private curso: Curso = {
        pk_curso : -1,
        nombre_curso:  '',
        tipo_curso: -1,
        cupo_maximo: null,
        cupo_actual: -1,
        total_horas: null,
        pk_periodo: -1,
        pk_area_academica: -1,
        fk_ficha_tecnica: -1,
        imagen_curso: '',
        instructores: null,
        fecha_inicio:   '',
        fecha_fin:  '',
        hora_inicio:  null,
        hora_fin:    null,
        campus: -1,
        edificio: -1,
        espacio: '',
        estado_curso: 1
    };

    public tipoServicioArray = [
        {
            'PK_TIPO_SERVICIO': 1,
            'NOMBRE': 'Curso'
        },
        {
            'PK_TIPO_SERVICIO': 2,
            'NOMBRE': 'Curso - taller'
        },
        {
            'PK_TIPO_SERVICIO': 3,
            'NOMBRE': 'Taller'
        },
        {
            'PK_TIPO_SERVICIO': 4,
            'NOMBRE': 'Diplomado'
        },
        {
            'PK_TIPO_SERVICIO': 5,
            'NOMBRE': 'Serie de platicas'
        },
        {
            'PK_TIPO_SERVICIO': 6,
            'NOMBRE': 'Simposium'
        },
        {
            'PK_TIPO_SERVICIO': 7,
            'NOMBRE': 'Otro'
        },
    ];
    public tipoCursoArray = [
        {
            'PK_TIPO': 1,
            'NOMBRE': 'Formación Docente'
        },
        {
            'PK_TIPO': 2,
            'NOMBRE': 'Actualización Profesional'
        },
        {
            'PK_TIPO': 3,
            'NOMBRE': 'Diplomado'
        },
    ];

    constructor( private ficha_service: FichaTecnicaCadoService,
                 private periodo_service: PeriodosCadoService,
                 private curso_service: CursoCadoService,
                 private activatedRouter: ActivatedRoute,
                 private render: Renderer2,
                 private fichaFunction: FichaTecnicaCadoFunction,
                 private fb: FormBuilder) {
        this.crearFormularioElementosDidacticos();
    }

   async ngOnInit() {
        this.display = 'block'; // despliega modal de carga TecNM
       // carga sessionstorage
       this.carga_usuario_en_sistema();
       // carga param
        this.activatedRouter.params.subscribe( async param => {
            if ( Object.keys(param).length === 0) {
                // no llego el param
                this.carga_periodos();
                this.carga_area_academica();
                this.consulta_edificios();
                this.consulta_institutos();
                this.carga_estados_curso();
            } else {
                // si llego el param
                try {
                 const data = await this.curso_service.busca_curso_por_pk(param['idcurso']);
                this.procesa_curso_param(data);
                this.carga_periodos();
                this.carga_area_academica();
                this.consulta_edificios();
                this.consulta_institutos();
                this.carga_estados_curso();
                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo cargar el curso, intentelo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        // timer: 2000
                    });
                }
            }
        });
    }

// geters
    get elementos_didacticos() {
        return this.ficha.elementos_didacticos;
    }
    get criterios_evaluacion() {
        return this.ficha.criterios_evaluacion;
    }
    get competencias() {
        return this.ficha.competencias;
    }
    get fuentes_informacion() {
        return this.ficha.fuentes_informacion;
    }
    get contenido_tematico() {
        return this.ficha.contenido_tematico;
    }
    get comentarios() {
        return this.ficha.comentarios;
    }

    // set contenido_tematico(contenido_tematico: Array<Object>) {
    //      this.ficha.contenido_tematico = contenido_tematico;
    // }

// metodos de carga  catalagos
    carga_periodos() {
        this.lista_periodos = null;
        this.periodo_service.consulta_periodos_activos().subscribe (
            data => {
                this.lista_periodos = data;
                this.periodosArray = [];
                // ajusta la fecha a tipo date
                for ( const i in this.lista_periodos) {
                    const fecha = new Date(this.lista_periodos[i].FECHA_FIN);
                    this.lista_periodos[i].FECHA_FIN = fecha;
                }
                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_periodos) {
                    this.periodosArray.push( this.lista_periodos[i] );
                    // obtiene el periodo del curso
                    if (this.curso.pk_periodo == this.lista_periodos[i]['PK_PERIODO_CADO'])
                        this.periodo_curso = this.lista_periodos[i];
                }

                // this.texto_periodo = this.preparaTextoPeriodo();


            },
            error => {
                console.error('no se cargaron los periodos');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargaron los periodos intentelo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        );
    }
    consulta_edificios() {
        this.lista_edificios = null;
        this.curso_service.consulta_edificios().subscribe (
            data => {
                this.lista_edificios = data;
                this.edificiosArray = [];
                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_edificios) {
                    this.edificiosArray.push( this.lista_edificios[i]);
                    // carga texto reporte
                    if (this.lista_edificios[i]['PK_EDIFICIO'] == this.curso.edificio) {
                        this.texto_edificio = this.lista_edificios[i]['PREFIJO'];
                        this.texto_edificio += ' ';
                        this.texto_edificio += this.lista_edificios[i]['NOMBRE'];
                        this.texto_campus = 'Campus ' + this.lista_edificios[i]['FK_CAMPUS'];
                    }
                }
                this.display = 'none';
            },
            error => {
                console.error('no se cargaron la lista de Edificios');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista de Edificios  intentelo más tarde!',
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
                    // carga texto reporte
                    if (this.lista_institutos[i]['PK_INSTITUCION'] == this.ficha.lugar_institucion) {
                        this.texto_instucion =   this.lista_institutos[i]['NOMBRE'];
                    }
                }

                // this.texto_instucion = this.institutosArray[this.ficha.lugar_institucion - 1]['NOMBRE'];
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
    carga_area_academica() {
        this.lista_area_academica = null;
        this.curso_service.consulta_area_academica().subscribe (
            data => {
                this.lista_area_academica = data;
                this.areasArray = [];
                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_area_academica) {
                    this.areasArray.push( this.lista_area_academica[i]);
                    if(this.lista_area_academica[i]['PK_AREA_ACADEMICA'] == this.curso.pk_area_academica) {
                        this.area_texto =  this.lista_area_academica[i]['NOMBRE'];
                    }
                }
                if(this.curso.pk_area_academica  == 0 ) {
                    this.area_texto = 'Para todas las áreas';
                }
                // asignamos el area
                // this.area_texto = this.areasArray[this.curso.pk_area_academica]['NOMBRE'];

            },
            error => {
                console.error('no se cargaron la lista de Áreas Académicas');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista de Áreas Académicas intentelo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        );
    }

    carga_estados_curso() {
        this.lista_cursos = null;
        this.curso_service.carga_estados_curso().subscribe (
            data => {
                this.lista_cursos = data;
                this.cursosArray = [];
                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_cursos) {
                    this.cursosArray.push( this.lista_cursos[i]);
                    if(this.lista_cursos[i]['PK_ESTADO_CURSO'] == this.curso.estado_curso) {
                        this.texto_estado_curso =  this.lista_cursos[i]['NOMBRE_ESTADO'];
                    }
                }
            },
            error => {
                console.error('no se cargaron la lista de Áreas Académicas');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista de estados del Curso, intentelo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        );
    }


    // seccion comentarios
    add_comentario() {
        // console.log('comentario');
        if (  this.ficha.pk_ficha == null || this.ficha.pk_ficha <= 0) {
            Swal.fire({
                icon: 'info',
                title: 'Aún no puedes añadir comentarios, el instructor no ha creado la ficha técnica',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
            return false;
            }

        if (this.comentario !== '' && this.comentario.length < 500 ) {
            Swal.fire({
                title: '¿Está seguro que desea guardar el comentario?',
                // text: "You won't be able to revert this!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.value) {
                    // definiendo body
                    let error = false;
                    let mensaje = '';
                    this.loaderModal.show();
                    // console.log(arrayInstructores);
                    const body = {
                        pk_ficha: this.ficha.pk_ficha,
                        pk_participante: this.pk_participante_sistema,
                        texto_comentario: this.comentario
                    };
                    // console.log(body);

                    // registrar mediante WS
                    this.ficha_service.guarda_comentario(body).subscribe(
                        data => {  //  200 ok
                            // console.log(data);
                            console.log(data);
                            this.lista_comentarios = data[0]['comentarios'];
                            this.ficha.comentarios = [];
                            // convierte el objeto en un arreglo
                            for ( const i in this.lista_comentarios) {
                                this.ficha.comentarios.push( this.lista_comentarios[i]);
                            }
                            this.loaderModal.hide();
                            for (const i in data) {
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
                                this.comentario = '';
                                // this.loaderModal.hide();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Se guardo el comentario  exitosamente!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                    // timer: 2000
                                });
                            }
                        },
                        error => { // cuando ocurre un error
                            this.loaderModal.hide();
                            Swal.fire({
                                icon: 'error',
                                title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                // timer: 2000
                            });
                        }
                    );
                }
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Captura un comentario valido, admite solo 500 caracteres por comentario',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
        }
    }

// metodos generales
    back() {
        // metodo para cancelar la operacion
        window.history.back();
    }
    carga_usuario_en_sistema() {
        this.usuario_en_sistema = sessionStorage.getItem('IdUsuario');

        this.pk_participante_sistema = sessionStorage.getItem('participante');
        if ( this.pk_participante_sistema !== '0') {
            this.tipo_participante = sessionStorage.getItem('tipo_participante');
        }
    }
    // este metodo no se usa
    crearFormularioElementosDidacticos() {
        this.formaElementosDidacticos = this.fb.group({
            // elementos_didacticos: this.fb.array([])
        });

    }
    prepara_texto_ficha_coordinador() {
        // carga texto servicio ficha
        for ( const i in this.tipoServicioArray) {
            if (this.tipoServicioArray[i]['PK_TIPO_SERVICIO'] == this.ficha.tipo_servicio)
                this.texto_tipo_servicio = this.tipoServicioArray[i].NOMBRE;
        }
        if (this.ficha.tipo_servicio == 7)
            this.texto_tipo_servicio = this.ficha.otro_servicio;

        // carga texto tipo curso
        for ( const i in this.tipoCursoArray) {
            if (this.tipoCursoArray[i]['PK_TIPO'] == this.curso.tipo_curso)
                this.texto_tipo_curso = this.tipoCursoArray[i].NOMBRE;

        }
        // carga texto estado curso
        // for ( const i in this.estadoCursoArray) {
        //     if (this.estadoCursoArray[i]['PK_ESTADO'] == this.curso.estado_curso)
        //         this.texto_estado_curso = this.estadoCursoArray[i].NOMBRE;
        // }
    }

    autorizar_ficha() {
        // estatus 2 autorizada
        if(this.curso.estado_curso == 2) {
            Swal.fire({
                icon: 'warning',
                title: 'La ficha técnica ya fue autorizada',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
            return false;
        }
        Swal.fire({
            title: '¿Está seguro que desea autorizar la ficha técnica?',
            // text: "You won't be able to revert this!",
            input: 'textarea',
            icon: 'question',
            inputPlaceholder: 'Capture algún comentario',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#bbb',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {
             const answer = result.value;
             this.comentario = answer;
                // definiendo body
                let error = false;
                let mensaje = '';
                this.loaderModal.show();
                // console.log(arrayInstructores);
                const body = {
                    pk_ficha: this.ficha.pk_ficha,
                    pk_participante: this.pk_participante_sistema,
                    texto_comentario: this.comentario
                };
                // console.log(body);

                // registrar mediante WS
                this.ficha_service.guarda_comentario(body).subscribe(
                    data => {  //  200 ok
                        // console.log(data);
                        console.log(data);
                        this.lista_comentarios = data[0]['comentarios'];
                        this.ficha.comentarios = [];
                        // convierte el objeto en un arreglo
                        for ( const i in this.lista_comentarios) {
                            this.ficha.comentarios.push( this.lista_comentarios[i]);
                        }
                        this.loaderModal.hide();
                        for (const i in data) {
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
                            this.comentario = '';
                        }
                    },
                    error => { // cuando ocurre un error
                        this.loaderModal.hide();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                    }
                ); // fin guarda coemntario

                //datos
                error = false;
                 mensaje = '';
                this.loaderModal.show();
                // estatus 2 autorizado
                this.curso_service.actualiza_estatus_curso(this.curso.pk_curso, 2).subscribe(
                    data => {
                        console.log(data);
                        this.loaderModal.hide(); //  200 ok
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
                            // actualizamos el estado a  estatus 2 autorizado
                            this.curso.estado_curso = 2;
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
                        this.loaderModal.hide();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Lo sentimos ha ocurrido un error, no se pudo enviar la información, intentelo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                        // return false;
                    }
                    ); // fin actualiza estatus
            } else if ( result.value == '') {
                console.log(result);
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes capturar el comentario',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        });


    }
    rechazar_ficha() {
        // estatus 3 rechazada
        if(this.curso.estado_curso == 3) {
            Swal.fire({
                icon: 'warning',
                title: 'La ficha técnica ya fue rechazada',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
            return false;
        }
        Swal.fire({
            title: '¿Está seguro que desea rechazar la ficha técnica?',
            // text: "You won't be able to revert this!",
            input: 'textarea',
            icon: 'question',
            inputPlaceholder: 'Capture algún comentario',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#bbb',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {
                this.comentario =  result.value;
                // definiendo body
                let error = false;
                let mensaje = '';
                this.loaderModal.show();
                // console.log(arrayInstructores);
                const body = {
                    pk_ficha: this.ficha.pk_ficha,
                    pk_participante: this.pk_participante_sistema,
                    texto_comentario: this.comentario
                };
                // console.log(body);

                // registrar mediante WS
                this.ficha_service.guarda_comentario(body).subscribe(
                    data => {  //  200 ok
                        // console.log(data);
                        console.log(data);
                        this.lista_comentarios = data[0]['comentarios'];
                        this.ficha.comentarios = [];
                        // convierte el objeto en un arreglo
                        for ( const i in this.lista_comentarios) {
                            this.ficha.comentarios.push( this.lista_comentarios[i]);
                        }
                        this.loaderModal.hide();
                        for (const i in data) {
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
                            this.comentario = '';
                        }
                    },
                    error => { // cuando ocurre un error
                        this.loaderModal.hide();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                    }
                ); // fin guarda coemntario

                //datos
                error = false;
                mensaje = '';
                this.loaderModal.show();
                // estatus 3  rechazada
                this.curso_service.actualiza_estatus_curso(this.curso.pk_curso, 3).subscribe(
                    data => {
                        console.log(data);
                        this.loaderModal.hide(); //  200 ok
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
                            // actualizamos el estado a  estatus 3 rechazada
                            this.curso.estado_curso = 3;
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
                        this.loaderModal.hide();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Lo sentimos ha ocurrido un error, no se pudo enviar la información, intentelo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                        // return false;
                    }
                ); // fin actualiza estatus
            } else if ( result.value == '') {
                console.log(result);
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes capturar el comentario',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        });


    }
    descargar_ficha_pdf() {
        window.print();
    }
    procesa_curso_param(data: any) {
     // console.log( data[0][0]);
            const curso = data[0][0];
            // armamos el curso
            this.curso = {
                pk_curso : curso['PK_CAT_CURSO_CADO'],
                nombre_curso:  curso['NOMBRE_CURSO'],
                tipo_curso: curso['TIPO_CURSO'],
                cupo_maximo: curso['CUPO_MAXIMO'],
                cupo_actual: curso['CUPO_ACTUAL'],
                total_horas: curso['TOTAL_HORAS'],
                pk_periodo: curso['FK_PERIODO_CADO'],
                pk_area_academica: curso['FK_AREA_ACADEMICA'] == null ? 0 : curso['FK_AREA_ACADEMICA'] ,
                imagen_curso: curso['RUTA_IMAGEN_CURSO'],
                instructores: curso['INSTRUCTORES'],
                fecha_inicio: curso['FECHA_INICIO'],
                fecha_fin: curso['FECHA_FIN'],
                hora_inicio: new Date( curso['HORA_INICIO']),
                hora_fin:    new Date( curso['HORA_FIN']),
                campus: -1,
                edificio: curso['FK_EDIFICIO'],
                espacio: curso['NOMBRE_ESPACIO'],
                estado_curso: curso['ESTADO_CURSO']
            };
            if ( curso['FK_FICHA_TECNICA_CADO'] == null ) {

            } else {
                // console.log("no es null la fk_ficha");
                // this.ficha.pk_ficha = curso['FK_FICHA_TECNICA_CADO'];
                console.log(curso['OBJ_FICHA_TECNICA']);
                // console.log('tamaño de llaves' + Object.keys(curso['OBJ_FICHA_TECNICA']).length);
                if ( Object.keys(curso['OBJ_FICHA_TECNICA']).length > 0 ) {
                    this.ficha = { // armamos la ficha
                        pk_ficha: curso['OBJ_FICHA_TECNICA']['PK_CAT_FICHA_TECNICA'],
                        lugar_institucion : curso['OBJ_FICHA_TECNICA']['FK_LUGAR'], // 1 es por defautl el ITL
                        introduccion: curso['OBJ_FICHA_TECNICA']['INTRODUCCION'],
                        justificacion: curso['OBJ_FICHA_TECNICA']['JUSTIFICACION'],
                        objetivo_general: curso['OBJ_FICHA_TECNICA']['OBJETIVO_GENERAL'],
                        tipo_servicio: curso['OBJ_FICHA_TECNICA']['TIPO_SERVICIO'],
                        otro_servicio: curso['OBJ_FICHA_TECNICA']['OTRO_SERVICIO'],
                        // ------------------------
                        fecha_registro: curso['OBJ_FICHA_TECNICA']['FECHA_MODIFICACION'],
                        hora_registro: curso['OBJ_FICHA_TECNICA']['FECHA_MODIFICACION'],
                        contenido_tematico: curso['OBJ_FICHA_TECNICA']['contenido_tematico'], // este contendra los archivos
                        elementos_didacticos: curso['OBJ_FICHA_TECNICA']['material_didactico'],
                        criterios_evaluacion: curso['OBJ_FICHA_TECNICA']['criterios_evaluacion'],
                        competencias: curso['OBJ_FICHA_TECNICA']['competencias'],
                        fuentes_informacion:  curso['OBJ_FICHA_TECNICA']['fuentes_informacion'],
                        comentarios:  curso['OBJ_FICHA_TECNICA']['comentarios'],
                    };
                }
            }
            // carga texto servicio ficha
            this.prepara_texto_ficha_coordinador();
    }

}
