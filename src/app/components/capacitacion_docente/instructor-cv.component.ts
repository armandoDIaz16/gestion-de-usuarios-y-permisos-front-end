import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PerfilService} from '../../services/perfil.service';
import {CvCadoService} from '../../services/capacitacion_docente/cv-cado.service';
import {CursoCadoService} from '../../services/capacitacion_docente/curso-cado.service';
import {CvCadoFunction} from '../../services/capacitacion_docente/cv-cado.function';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';
import {CV} from '../../models/capacitacion_docente/cado-model.model';
import Swal from 'sweetalert2';
import {
    faBookmark, faCalendarAlt,
    faCheck, faChevronDown, faChevronRight, faCircle, faClock,
    faEdit,
    faFilePdf,
    faFileUpload, faFolderOpen, faGraduationCap, faImage, faInfoCircle, faLink, faMapMarkerAlt,
    faPaperclip, faPaperPlane,
    faPlus, faPlusCircle,
    faThumbsDown, faTimes,
    faTrashAlt, faTrophy, faMobileAlt, faEnvelope
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-instructor-cv',
  templateUrl: '../../views/capacitacion_docente/instructor-cv.component.html',
  styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class InstructorCvComponent implements OnInit {

    // modal
    @ViewChild('loaderModal') loaderModal;
    // icons
    edit = faEdit;  delete = faTrashAlt;
    add = faPlus; pdf = faFilePdf;
    tel = faMobileAlt;
    mail = faEnvelope;
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
    public  mostrar_info = false;
    public pk_participante_parametro = '';

    // LOAD
    public display: string;
  constructor(private activatedRouter: ActivatedRoute,
              private perfil_service: PerfilService,
              private cv_service: CvCadoService,
              private curso_service: CursoCadoService,
              private render: Renderer2,
              private cv_service_function:  CvCadoFunction) {
      this.perfil = <InterfacePerfil> {};
  }

    async ngOnInit() {
      this.display = 'block'; // despliega modal de carga TecNM
      // carga sessionstorage
      this.carga_usuario_en_sistema();
        this.carga_cv();
        this.mostrar_info_privada();

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

    // metodos generales
    async carga_cv() {
        // carga param
        this.activatedRouter.params.subscribe( async param => {
            if ( Object.keys(param).length === 0) {
                // no llego el param
                console.log(' no llego el param');
                // consulta el cv del participante que entro a la sessión
                // consulta objeto CV
                // ASIGNA EL PK DEL PARTICIPANTE EN SISTEMA AL DEL PARAMETRO
                this.pk_participante_parametro = this.pk_participante_sistema;
                try {
                    // const data_perfil = await this.perfil_service.get_perfil(this.usuario_en_sistema);
                    let data_perfil = await this.perfil_service.get_perfil_CV(this.usuario_en_sistema);
                    data_perfil = data_perfil['data'];
                    if (data_perfil) {
                        this.perfil = <InterfacePerfil>data_perfil;
                    }
                    const data_cv = await this.cv_service.busca_participante_cv(this.pk_participante_sistema);
                    console.log(data_cv);
                    const cv = <Array<object>>data_cv['cv'];
                    if (cv == null || cv.length <= 0) {
                        // no tiene cv
                        // this.crear_cv(this.pk_participante_sistema);
                    } else {
                        // si tiene cv
                        this.cargar_datos_cv(cv[0]);
                    }
                    // carga catalagos
                    // this.carga_tipos_formacion();
                    // this.consulta_institutos();
                    this.display = 'none';
                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo cargar el curriculum, intentelo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                }
            } else {
                // si llego el param
                console.log(' si llego el param');
                console.log(param['pk_participante']);
                this.pk_participante_parametro = param['pk_participante'];
                try {
                    // consulta objeto CV
                    const data_cv = await this.cv_service.busca_participante_cv(param['pk_participante']);
                    console.log(data_cv);

                    let data_perfil = await this.perfil_service.get_perfil_CV(data_cv['FK_USUARIO']);
                    data_perfil = data_perfil['data'];
                    if (data_perfil) {
                        this.perfil = <InterfacePerfil>data_perfil;
                    }
                    const cv = <Array<object>> data_cv['cv'];
                    if ( cv == null || cv.length <= 0) {
                        // no tiene cv
                        // this.crear_cv(this.pk_participante_sistema);
                    } else {
                        // si tiene cv
                        this.cargar_datos_cv(cv[0]);
                    }
                    // carga catalagos
                    // this.carga_tipos_formacion();
                    // this.consulta_institutos();
                    this.display = 'none';

                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo cargar el curriculum, intentelo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                }
            }
        });
    }
    carga_usuario_en_sistema() {
        this.usuario_en_sistema = sessionStorage.getItem('IdUsuario');

        this.pk_participante_sistema = sessionStorage.getItem('participante');
        if ( this.pk_participante_sistema !== '0') {
            this.tipo_participante = sessionStorage.getItem('tipo_participante');
        }
    }
    mostrar_info_privada() {
        // this.mostrar_info = (this.tipo_participante === '4') ? true : false; sin simplificar
        if (this.tipo_participante === '4') {
            this.mostrar_info = true;
        } else if (this.pk_participante_sistema === this.pk_participante_parametro) {
            this.mostrar_info = true;
        } else {
            this.mostrar_info = false;
        }
      // this.mostrar_info = (this.tipo_participante === '4');
      //   this.mostrar_info = (this.pk_participante_sistema === this.pk_participante_parametro);
        console.log(this.mostrar_info);
        console.log(this.pk_participante_sistema);
        console.log(this.pk_participante_parametro);
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

}
