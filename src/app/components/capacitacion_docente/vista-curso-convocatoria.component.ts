// angular
import {Component, Renderer2, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// icons
import {
    faCalendarAlt,
    faClock,
    faEdit,
    faHdd,
    faThumbsDown,
    faCircle,
    faCheck,
    faFilePdf,
    faPaperclip,
    faFileUpload,
    faInfoCircle,
    faMapMarkerAlt,
    faPlus,
    faTimes,
    faTrashAlt,
    faPaperPlane,
    faTrophy,
    faGraduationCap,
    faImage,
    faLink,
    faPlusCircle,
    faFolderOpen,
    faChevronRight,
    faChevronDown,
    faBookmark,
    faUsers,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
// modelos
import {AreaAcademica, Campus, Curso, Edificio_Curso, FichaTecnica, Periodo} from '../../models/capacitacion_docente/cado-model.model';
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
import {GlobalesCadoFunction} from '../../services/capacitacion_docente/globales-cado.function';

@Component({
  selector: 'app-vista-curso-convocatoria',
  templateUrl: '../../views/capacitacion_docente/vista-curso-convocatoria.component.html',
  styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class VistaCursoConvocatoriaComponent implements OnInit {

    // modal
    @ViewChild('loaderModal') loaderModal;
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
    people = faUsers; signin = faSignInAlt;
    flechader = faChevronRight;   flechaabajo = faChevronDown;

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
        comentarios: [],
        lugar: {}
    };
    public curso: Curso = {
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
    public periodo: Periodo = {
        pk_periodo_cado: -1,
        nombre_periodo: '',
        fecha_inicio: '',
        fecha_fin: ''
    };
    public edificio: Edificio_Curso = {
    PK_EDIFICIO: -1,
    FK_CAMPUS:  -1,
    NOMBRE: '',
    PREFIJO: '',
    CAPACIDAD: ''
    };
    public campus: Campus = {
    PK_CAMPUS: -1,
    NOMBRE: '',
    FK_INSTITUCION: -1
    };
    public area_academica: AreaAcademica = {
    PK_AREA_ACADEMICA: -1,
    FK_INSTITUCION: -1,
    NOMBRE: '',
    ABREVIATURA: '',
    ESTADO:  ''
    };

// data
    public display: string;
    public pk_participante_sistema: string;
    public tipo_participante: string;
    public usuario_en_sistema: string;
    public texto_tipo_servicio: string;
    public texto_tipo_curso: string;
    public periodo_curso: object;

    constructor( private objGobalesCadoFunction: GlobalesCadoFunction,
                 private ficha_service: FichaTecnicaCadoService,
                 private periodo_service: PeriodosCadoService,
                 private curso_service: CursoCadoService,
                 private activatedRouter: ActivatedRoute,
                 private render: Renderer2,
                 private fichaFunction: FichaTecnicaCadoFunction) { }

  ngOnInit() {
      this.display = 'block'; // despliega modal de carga TecNM
      // carga sessionstorage
      this.carga_usuario_en_sistema();
      // carga param
      this.activatedRouter.params.subscribe( async param => {
          if ( Object.keys(param).length === 0) {
              // no llego el param
              /*this.carga_periodos();
              this.carga_area_academica();
              this.consulta_edificios();
              this.consulta_institutos();
              this.carga_estados_curso();*/
          } else {
              // si llego el param
              try {
                  const data = await this.curso_service.busca_curso_por_pk(param['idCurso']);
                  console.log(data);
                  this.procesa_curso_param(data);
                  this.carga_periodos();
                  /*this.carga_area_academica();
                  this.consulta_edificios();
                  this.consulta_institutos();
                  this.carga_estados_curso();*/
                  this.display = 'none'; // despliega modal de carga TecNM
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

  // metodos generales
    carga_usuario_en_sistema() {
        this.usuario_en_sistema = sessionStorage.getItem('IdUsuario');
        this.pk_participante_sistema = sessionStorage.getItem('participante');
        if ( this.pk_participante_sistema !== '0') {
            this.tipo_participante = sessionStorage.getItem('tipo_participante');
        }
    }
    procesa_curso_param(data: any) {
        // console.log( data[0][0]);
        const curso = data[0][0];
        /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        * +++++++++++++++++++++++++++++++++++++++++++++CURSO+++++++++++++++++++++++++++++++++*/
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
            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        * +++++++++++++++++++++++++++++++++++++++++++++FICHA TECNICA+++++++++++++++++++++++++++++++++*/
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
                    lugar: curso['OBJ_FICHA_TECNICA']['lugar'],
                };
            }
            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            * +++++++++++++++++++++++++++++++++++++++++++++PERIODO CURSO+++++++++++++++++++++++++++++++++*/
            if ( Object.keys(curso['OBJ_PERIODO']).length > 0 ) {
                // construimos el periodo
                this.periodo = {
                    pk_periodo_cado: curso['OBJ_PERIODO']['PK_PERIODO_CADO'],
                    nombre_periodo: curso['OBJ_PERIODO']['NOMBRE_PERIODO'],
                    fecha_inicio: curso['OBJ_PERIODO']['FECHA_INICIO'],
                    fecha_fin: curso['OBJ_PERIODO']['FECHA_FIN']
                };
            }
            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            * +++++++++++++++++++++++++++++++++++++++++++++AREA ACADEMICA+++++++++++++++++++++++++++++++++*/
            if ( Object.keys(curso['OBJ_AREA_ACADEMICA']).length > 0 ) {
                // construimos el area
                 this.area_academica = {
                    PK_AREA_ACADEMICA: curso['OBJ_AREA_ACADEMICA']['PK_AREA_ACADEMICA'],
                    FK_INSTITUCION: curso['OBJ_AREA_ACADEMICA']['FK_INSTITUCION'],
                    NOMBRE: curso['OBJ_AREA_ACADEMICA']['NOMBRE'],
                    ABREVIATURA: curso['OBJ_AREA_ACADEMICA']['ABREVIATURA'],
                    ESTADO:  curso['OBJ_AREA_ACADEMICA']['ESTADO']
                    };
            }
            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            * +++++++++++++++++++++++++++++++++++++++++++++EDIFICIO+++++++++++++++++++++++++++++++++*/
            if ( Object.keys(curso['OBJ_EDIFICIO']).length > 0 ) {
                // construimos el edificio
                this.edificio = {
                    PK_EDIFICIO: curso['OBJ_EDIFICIO']['PK_EDIFICIO'],
                    FK_CAMPUS:  curso['OBJ_EDIFICIO']['FK_CAMPUS'],
                    NOMBRE: curso['OBJ_EDIFICIO']['NOMBRE'],
                    PREFIJO: curso['OBJ_EDIFICIO']['PREFIJO'],
                    CAPACIDAD: curso['OBJ_EDIFICIO']['CAPACIDAD']
                };
            }
            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            * +++++++++++++++++++++++++++++++++++++++++++++CAMPUS +++++++++++++++++++++++++++++++++*/
            if ( Object.keys(curso['OBJ_EDIFICIO']['campus']).length > 0 ) {
                // construimos el edificio
                this.campus = {
                    PK_CAMPUS: curso['OBJ_EDIFICIO']['campus']['PK_CAMPUS'],
                    NOMBRE: curso['OBJ_EDIFICIO']['campus']['NOMBRE'],
                    FK_INSTITUCION: curso['OBJ_EDIFICIO']['campus']['FK_INSTITUCION']
                };
            }
        }
        // carga texto servicio ficha
        this.prepara_textos();
    }
    prepara_textos() {
        // carga texto servicio ficha
        for ( const i in this.objGobalesCadoFunction.tipoServicioArray) {
            if (this.objGobalesCadoFunction.tipoServicioArray[i]['PK_TIPO_SERVICIO'] == this.ficha.tipo_servicio)
                this.texto_tipo_servicio = this.objGobalesCadoFunction.tipoServicioArray[i]['NOMBRE'];
        }
        if (this.ficha.tipo_servicio == 7)
            this.texto_tipo_servicio = this.ficha.otro_servicio;

        // carga texto tipo curso
        for ( const i in this.objGobalesCadoFunction.tipoCursoArray) {
            if (this.objGobalesCadoFunction.tipoCursoArray[i]['PK_TIPO'] == this.curso.tipo_curso)
                this.texto_tipo_curso = this.objGobalesCadoFunction.tipoCursoArray[i]['NOMBRE'];

        }
    }

}
