// angular
import {Component, Renderer2, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// icons
import {faCalendarAlt, faClock, faEdit, faHdd, faPaperclip, faFileUpload, faInfoCircle, faMapMarkerAlt, faPlus, faTimes, faTrashAlt, faPaperPlane, faTrophy, faGraduationCap, faImage, faLink,  faPlusCircle, faFolderOpen, faChevronRight, faChevronDown, faBookmark } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-registro-ficha-tecnica',
  templateUrl: '../../views/capacitacion_docente/registro-ficha-tecnica.component.html',
  styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class RegistroFichaTecnicaComponent implements OnInit {

// element html references
    @ViewChild('inputOtroTipoCurso')inputOtroTipoCurso: ElementRef;
    // modal
    @ViewChild('loaderModal') loaderModal;
    @ViewChild('capturaTema') capturaTema;
    @ViewChild('modificaTema')modificaTema;
    // form
    formaElementosDidacticos: FormGroup;
    // formaContenidoTematico: FormGroup;
    // icons
    edit = faEdit;  delete = faTrashAlt;
    add = faPlus;
    adjunto = faPaperclip;
    seccion = faBookmark;
    subir = faFileUpload;
    circulomas = faPlusCircle;
    cancel = faTimes;
    date = faCalendarAlt;
    info = faInfoCircle;
    hora = faClock;
    mapa = faMapMarkerAlt;
    enviar = faPaperPlane;
    cup = faTrophy;
    graduacion = faGraduationCap;
    img = faImage;
    link = faLink;
    folder = faFolderOpen;
    flechader = faChevronRight;
    flechaabajo = faChevronDown;

    // datos de apoyo
    public validado = false;
    public display: string;
    public display2: string;
    public periodo_curso: object;
    public usuario_en_sistema: string;
    public elemento_apoyo = '';
    public criterio_apoyo = '';
    public instrumentocriterio_apoyo = '';
    public valor_criterio_apoyo: number;
    public competencia_apoyo = '';
    public fuente_informacion_apoyo = '';
    public nombre_tema_apoyo = '';
    public actividad_aprendizaje_apoyo = '';
    public tiempo_programado_apoyo: number;
    public indice_contenido: number;
    // listas
    public lista_docentes: object; // docentes
    private docentesArray: Array<Object>;
    public lista_area_academica: object; // areas
    areasArray: Array<Object>;
    public lista_periodos: object; // periodos
    periodosArray: Array<Object>;
    public lista_edificios: object; // edificios
    edificiosArray: Array<Object>;
    public lista_institutos: object; // institutos
    institutosArray: Array<Object>;
    public lista_temas: object; // temas

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
    fuentes_informacion: []
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

  constructor( private ficha_service: FichaTecnicaCadoService,
                private periodo_service: PeriodosCadoService,
               private curso_service: CursoCadoService,
               private activatedRouter: ActivatedRoute,
               private render: Renderer2,
               private fichaFunction: FichaTecnicaCadoFunction,
               private fb: FormBuilder) {
      this.carga_curso_param();
      this.crearFormularioElementosDidacticos();
  }

  ngOnInit() {
      this.display = 'block'; // despliega modal de carga TecNM
      // this.display2 = 'block';
      this.carga_periodos();
      this.carga_usuario_en_sistema();
      this.carga_area_academica();
      this.consulta_edificios();
      this.consulta_institutos();

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
                // console.log(this.lista_periodos);
                // console.log(this.periodosArray);
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
                }
                // console.log(this.edificiosArray);
                // console.log(this.lista_edificios);
                this.autocompletaCampus();
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
                }
                // console.log(this.institutosArray);
                // console.log(this.lista_institutos);
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
                }
                // console.log(this.lista_area_academica);
                // console.log(this.areasArray);
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

// seccion de metodos  descripcion_servicio
    guardar_descripcion_servicio() {
        if (this.validar_seccion_descripcion_servicio()) {
            // definiendo body
            let error = false;
            let mensaje = '';

            const body = {
                pk_ficha: this.ficha.pk_ficha,
                introduccion:  this.ficha.introduccion,
                justificacion:  this.ficha.justificacion,
                objetivo_general: this.ficha.objetivo_general,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.ficha_service.guardar_descripcion_servicio(body).subscribe(
                data => {  //  200 ok
                    console.log(data);
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
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                    }
                },
                error => { // cuando ocurre un error
                    // alert('Ha ocurrido un error');
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
    }
    validar_seccion_descripcion_servicio() {
      if (this.ficha.introduccion.trim() === '') {
          Swal.fire({
              icon: 'info',
              title: 'Debes indicar la introducción de la ficha técnica',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
          return false;
      }
      if (this.ficha.justificacion.trim() === '') {
          Swal.fire({
              icon: 'info',
              title: 'Debes indicar la justificación de la ficha técnica',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
            return false;
      }
      if (this.ficha.objetivo_general.trim() === '') {
          Swal.fire({
              icon: 'info',
              title: 'Debes indicar el objetivo general de la ficha técnica',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
            return false;
      }
      if (this.ficha.pk_ficha <= 0 ) {
          Swal.fire({
              icon: 'error',
              title: 'La ficha técnica del curso no ha sido asignada, intenta más tarde',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
            return false;
      }
      return true;
    }

// seccion  de metodosinformacion_servicio
    guardar_informacion_servicio() {
      const resultado_validacion = this.fichaFunction.validar_seccion_informacion_servicio(this.ficha, this.curso);
      if (resultado_validacion === true) {
          // codigo para registrar la info
          // prepara body
          let error = false;
          let mensaje = '';

          const body = {
              pk_ficha: this.ficha.pk_ficha,
              tipo_servicio:  this.ficha.tipo_servicio,
       // 1:Curso 2:Curso - taller 3:Taller 4:Diplomado 5:Serie de platicas 6:Simposium 7:Otro
              otro_servicio: this.ficha.tipo_servicio == 7 ? this.ficha.otro_servicio : '' ,
              lugar_institucion:  this.ficha.lugar_institucion,
              fk_usuario_modifica: this.usuario_en_sistema
          };
          // registrar mediante WS
          this.ficha_service.guardar_informacion_servicio(body).subscribe(
              data => {  //  200 ok
                  console.log(data);
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
    actualizaImagen(evt: any) {
        Swal.fire({
            title: '¿Está seguro que desea modificar la imagen del curso?',
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
                        icon: 'info',
                        title: 'Seleccione la foto del curso',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                // console.log(archivo);
                this.loaderModal.show();
                // datos
                const myReader: FileReader = new FileReader();
                // preparamos el periodo para que aparezca algo asi AGO2019-ENE2020
                const periodo = this.preparaTextoPeriodo();
                myReader.onloadend = async (e) => {
                    const body  = {
                        // 'PK_ENCRIPTADA':  sessionStorage.getItem('IdEncriptada'),
                        'PK_CURSO' : this.curso.pk_curso,
                        'PERIODO' : periodo,
                        'NOMBRE_ARCHIVO': archivo.name.split('.').shift(),
                        'EXTENSION':      archivo.name.split('.').pop(),
                        'CONTENIDO':      myReader.result
                    };
                    this.ficha_service.registra_foto_curso(body).subscribe(
                        data => {
                            // console.log(data);
                            // return;
                            this.curso.imagen_curso = data + '';
                        },
                        error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo actualizar la foto del curso, intente, más tarde!',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                            });
                        }
                    );
                };
                myReader.readAsDataURL(archivo);
                this.loaderModal.hide();
            }
        });
    }
    autocompletaCampus() {
        for (const edificio of this.edificiosArray) {
            if (edificio['PK_EDIFICIO'] == this.curso.edificio) {
                this.curso.campus = edificio['FK_CAMPUS'];
            }
        }
    }
    filtro_instructor(event) {
        // console.log(event.query);
        this.curso_service.filtro_docente(event.query).subscribe(
            data => {
                this.lista_docentes = data;
                this.docentesArray = [];
                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_docentes) {
                    this.docentesArray.push( this.lista_docentes[i]);
                }
                // console.log(this.lista_docentes);
                // console.log(this.docentesArray);
            },
            error => {
                console.error('no se cargaron la lista de docentes');

            }
        );
    }

// seccion de metodos elementos_didacticos
    guardar_elementos_didacticos() {
      // console.log('guardar guardar_elementos_didacticos');
      //   console.log(this.elementos_didacticos);
        const resultado_validacion = this.fichaFunction.validar_seccion_elementos_didacticos(this.elementos_didacticos);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_ficha: this.ficha.pk_ficha,
                array_elementos_didacticos: this.elementos_didacticos,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.ficha_service.guardar_elementos_didacticos(body).subscribe(
                data => {  //  200 ok
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
    add_elemento_didactico() {
        if (!(this.elemento_apoyo == '')) {
            console.log(this.elemento_apoyo);
            // armamos el objeto para agregarlo a la lista de elementos en la ficha
            const body_elemento = {
                PK_MATERIAL_DIDACTICO: -1,
                FK_FICHA_TECNICA: this.ficha.pk_ficha,
                NOMBRE_MATERIAL: this.elemento_apoyo
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.elementos_didacticos.push(body_elemento);
            this.elemento_apoyo = '';
        }
    }
    borrar_elemento_didactico(i: number) {
        this.elementos_didacticos.splice(i, 1);
    }

    // seccion de metodos criterios de evaluacion
    guardar_criterios_evaluacion() {
        // console.log('guardar guardar_elementos_didacticos');
        //   console.log(this.elementos_didacticos);
        const resultado_validacion = this.fichaFunction.validar_seccion_criterios_evaluacion(this.criterios_evaluacion);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_ficha: this.ficha.pk_ficha,
                array_criterios_evaluacion: this.criterios_evaluacion,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.ficha_service.guardar_criterios_evaluacion(body).subscribe(
                data => {  //  200 ok
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
    add_criterio() {
        const resultado_validacion = this.fichaFunction.validar_criterios_evaluacion(this.criterio_apoyo,
                                                                                     this.valor_criterio_apoyo,
                                                                                     this.instrumentocriterio_apoyo);
    if (resultado_validacion === true) {
        // armamos el objeto para agregarlo a la lista de elementos en la ficha
        const body_criterio = {
            PK_CRITERIO_EVALUACION: -1,
            FK_FICHA_TECNICA: this.ficha.pk_ficha,
            NOMBRE_CRITERIO: this.criterio_apoyo,
            VALOR_CRITERIO: this.valor_criterio_apoyo,
            INSTRUMENTO_DE_EVALUACION: this.instrumentocriterio_apoyo
        };
        // creamos un nuevo elemento html con el elemento
        // actualizamos el array
        this.criterios_evaluacion.push(body_criterio);
        // reseteamos valores
        this.criterio_apoyo = '';
        this.valor_criterio_apoyo = null;
        this.instrumentocriterio_apoyo = '';
        } else {
        Swal.fire({
            icon: 'info',
            title: resultado_validacion,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        });
        }
    }
    borrar_criterio(i: number) {
        this.criterios_evaluacion.splice(i, 1);
    }

    // seccion de metodos competencia
    guardar_competencias() {
        const resultado_validacion = this.fichaFunction.validar_seccion_competencias(this.competencias);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_ficha: this.ficha.pk_ficha,
                array_competencias: this.competencias,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.ficha_service.guardar_competencias(body).subscribe(
                data => {  //  200 ok
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
    add_competencia() {
        if (!(this.competencia_apoyo.trim() === '')) {
            // armamos el objeto para agregarlo a la lista de competencias en la ficha
            const body_competencia = {
                PK_COMPETENCIA_CURSO: -1,
                FK_FICHA_TECNICA: this.ficha.pk_ficha,
                TEXTO_COMPETENCIA: this.competencia_apoyo
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.competencias.push(body_competencia);
            // reseteamos valores
            this.competencia_apoyo = '';
        }
    }
    borrar_competencia(i: number) {
        this.competencias.splice(i, 1);
    }

    // seccion de metodos fuente de informacion
    guardar_fuentes_informacion() {
        const resultado_validacion = this.fichaFunction.validar_seccion_fuentes_informacion(this.fuentes_informacion);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_ficha: this.ficha.pk_ficha,
                array_fuentes: this.fuentes_informacion,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.ficha_service.guardar_fuentes_informacion(body).subscribe(
                data => {  //  200 ok
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
    add_fuente_informacion() {
        if (!(this.fuente_informacion_apoyo.trim() === '')) {
            // armamos el objeto para agregarlo a la lista de fuentes de informacion en la ficha
            const body_fuente = {
                PK_FUENTE_INFORMACION: -1,
                FK_FICHA_TECNICA: this.ficha.pk_ficha,
                TEXTO_FUENTE: this.fuente_informacion_apoyo
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.fuentes_informacion.push(body_fuente);
            // reseteamos valores
            this.fuente_informacion_apoyo = '';
        }
    }
    borrar_fuente_informacion(i: number) {
        this.fuentes_informacion.splice(i, 1);
    }

    // seccion de metodos contenido tematico
    guardar_contenidos_tematicos() {
        const resultado_validacion = this.fichaFunction.validar_seccion_contenidos_tematicos(this.contenido_tematico);
        if (resultado_validacion === true) {
            // codigo para registrar la info
            // prepara body
            let error = false;
            let mensaje = '';
            const body = {
                pk_ficha: this.ficha.pk_ficha,
                array_temas: this.contenido_tematico,
                fk_usuario_modifica: this.usuario_en_sistema
            };
            // registrar mediante WS
            this.ficha_service.guardar_contenidos_tematicos(body).subscribe(
                data => {  //  200 ok
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
    add_contenido_tematico() {
        const resultado_validacion = this.fichaFunction.validar_contenido_tematico(this.contenido_modal.nombre_tema,
            this.contenido_modal.tiempo_horas,
            this.contenido_modal.actividad_aprendizaje, this.curso);
        if (resultado_validacion === true) {
            // armamos el objeto para agregarlo a la lista de elementos en la ficha
            const body_tema = {
                PK_CONTENIDO_TEMATICO: -1,
                FK_FICHA_TECNICA: this.ficha.pk_ficha,
                NOMBRE_TEMA: this.contenido_modal.nombre_tema,
                ACTIVIDAD_APRENDIZAJE: this.contenido_modal.actividad_aprendizaje,
                TIEMPO_TEMA: this.contenido_modal.tiempo_horas
            };
            // creamos un nuevo elemento html con el elemento
            // actualizamos el array
            this.contenido_tematico.splice(this.indice_contenido, 0, body_tema);
            // this.contenido_tematico.push(body_tema);
            // reseteamos valores
            this.init_contenido_modal();
            // ocultamos ventana
            this.capturaTema.hide();
        } else {
            Swal.fire({
                icon: 'info',
                title: resultado_validacion,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }
    update_edit_contenido_tematico() {
      // console.log('antes de modificar');
      const indice = this.contenido_modal.indice_array;
        // console.log(this.contenido_tematico[indice]);
        const obj_mod = this.contenido_tematico[indice];
        obj_mod['NOMBRE_TEMA'] = this.contenido_modal.nombre_tema;
        obj_mod['TIEMPO_TEMA'] = this.contenido_modal.tiempo_horas;
        obj_mod['ACTIVIDAD_APRENDIZAJE'] = this.contenido_modal.actividad_aprendizaje;
        this.contenido_tematico[indice] = obj_mod;
        // console.log('despues modificar');
        // console.log(this.contenido_tematico[indice]);
        this.modificaTema.hide();
    }
    borrar_contenido_tematico(i: number) {
        this.contenido_tematico.splice(i, 1);
        console.log('borrado'+i);
    }
    editar_contenido_tematico(i: number) {
      this.init_contenido_modal();
      // obtenemos el objeto del array
        console.log(i);
        const obj_contenido =  this.contenido_tematico[i];
        console.log(obj_contenido);
        // lo añadimos al objeto para que aparezca en el modal
        this.contenido_modal = {
            pk_tema:  obj_contenido['PK_CONTENIDO_TEMATICO'],
            nombre_tema: obj_contenido['NOMBRE_TEMA'],
            actividad_aprendizaje: obj_contenido['ACTIVIDAD_APRENDIZAJE'],
            tiempo_horas:  obj_contenido['TIEMPO_TEMA'],
            indice_array: i
        };
        // mostramos la ventana modal
      this.modificaTema.show();
    }
    mostrarModal(i: number) {
        console.log(this.contenido_tematico.length);
        this.capturaTema.show();
        this.init_contenido_modal();
        this.indice_contenido = i;
        // console.log(this.indice_contenido);

    }
    init_contenido_modal() {
        this.contenido_modal = {
            pk_tema:  -1,
            nombre_tema: '',
            actividad_aprendizaje: '',
            tiempo_horas:    null,
            indice_array:    -1
        };
    }
    agregaArchivo(evt: any, pk_tema: number) {
      if (pk_tema <= 0 ) {
          Swal.fire({
              icon: 'info',
              title: 'Debes primero guardar la sección de Contenido Tematico para poder añadir  algún recurso a los temas',
              showConfirmButton: true,
              confirmButtonText: 'OK',
          });
          return;
      }
        Swal.fire({
            title: '¿Está seguro que desea agregar este nuevo recurso?',
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
                        icon: 'info',
                        title: 'Seleccione el archivo',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                console.log(evt.target.files);
                // console.log(archivo);
                this.loaderModal.show();
                for (const file of evt.target.files) {
                    console.log(file);
                    // datos
                    const myReader: FileReader = new FileReader();
                    // preparamos el periodo para que aparezca algo asi AGO2019-ENE2020
                    const periodo = this.preparaTextoPeriodo();
                    myReader.onloadend = async (e) => {
                        const body  = {
                            // 'PK_ENCRIPTADA':  sessionStorage.getItem('IdEncriptada'),
                            'PK_CURSO' : this.curso.pk_curso,
                            'PERIODO' : periodo,
                            'NOMBRE_ARCHIVO': file.name,
                            'EXTENSION':      file.name.split('.').pop(),
                            'CONTENIDO':      myReader.result,
                            'FK_CONTENIDO_TEMATICO': pk_tema,
                             pk_ficha: this.ficha.pk_ficha
                        };
                        console.log(body);
                        this.ficha_service.registra_archivo_adjunto(body).subscribe(
                            data => {
                                // console.log(data);
                                // return;
                                // this.curso.imagen_curso = data + '';
                                this.lista_temas = data;
                                this.ficha.contenido_tematico = [];
                                // convierte el objeto en un arreglo para evitar problemas con ngFor
                                // tslint:disable-next-line:forin
                                for ( const i in this.lista_temas) {
                                    this.ficha.contenido_tematico.push( this.lista_temas[i]);
                                }
                                // console.log(data);
                                // console.log(data['contenido_tematico']);
                                // this.ficha.contenido_tematico = data['contenido_tematico'];
                                // this.contenido_tematico(data);
                                // this.contenido_tematico = null;
                            },
                            error => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'No se pudo almacenar el archivo adjunto, intente, más tarde!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                });
                            }
                        );
                    };
                    myReader.readAsDataURL(file);
                }

                //
                // // datos
                // const myReader: FileReader = new FileReader();
                // // preparamos el periodo para que aparezca algo asi AGO2019-ENE2020
                // const periodo = this.preparaTextoPeriodo();
                // myReader.onloadend = async (e) => {
                //     const body  = {
                //         // 'PK_ENCRIPTADA':  sessionStorage.getItem('IdEncriptada'),
                //         'PK_CURSO' : this.curso.pk_curso,
                //         'PERIODO' : periodo,
                //         'NOMBRE_ARCHIVO': archivo.name,
                //         'EXTENSION':      archivo.name.split('.').pop(),
                //         'CONTENIDO':      myReader.result
                //     };
                //     this.ficha_service.registra_foto_curso(body).subscribe(
                //         data => {
                //             // console.log(data);
                //             // return;
                //             this.curso.imagen_curso = data + '';
                //         },
                //         error => {
                //             Swal.fire({
                //                 icon: 'error',
                //                 title: 'No se pudo actualizar la foto del curso, intente, más tarde!',
                //                 showConfirmButton: true,
                //                 confirmButtonText: 'OK',
                //             });
                //         }
                //     );
                // };
                // myReader.readAsDataURL(archivo);
                this.loaderModal.hide();
            }
        });
    }
    borrar_archivo_tema(pk_archivo: number, nombre_archivo: string) {
        Swal.fire({
            title: '¿Estás seguro de eliminar ' + nombre_archivo.substr(0, 25 ) + ' ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {
                // data
                let error = false;
                let mensaje = '';
                // mostrar modal carga
                this.loaderModal.show();
                        this.ficha_service.elimina_archivo_por_pk(pk_archivo, this.ficha.pk_ficha).subscribe(
                            data => {
                                // quitar modal carga
                                console.log(data);
                                this.lista_temas = data[0]['temas'];
                                this.ficha.contenido_tematico = [];
                                // convierte el objeto en un arreglo
                                for ( const i in this.lista_temas) {
                                    this.ficha.contenido_tematico.push( this.lista_temas[i]);
                                }
                                this.loaderModal.hide();//  200 ok
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
                            },
                            error => { // cuando ocurre un error
                                // quitar modal carga
                                this.loaderModal.hide();
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK'
                                });
                            }
                        );
                // quitar modal carga
                this.loaderModal.hide();
            }
        });
    }

// metodos generales
    carga_curso_param() {
        this.activatedRouter.params.subscribe( param => {
            // console.log('carga_curso_param' + param);
            if ( Object.keys(param).length === 0) {
                // console.log('no llego el parametro ' + param);
            } else {
                // console.log('si llego el parametro ' + param['idcurso']);
                this.curso_service.busca_curso_por_pk(param['idcurso']).subscribe(
                    data => {
                        // console.log( data[0][0]);
                        const curso = data[0][0];
                        // this.curso.instructores = [];
                        // this.curso.instructores[0] = data[0];
                        // this.render.setAttribute(this.filtro.nativeElement, 'disabled', 'true' );
                        // armamos el curso
                        this.curso = {
                            pk_curso : curso['PK_CAT_CURSO_CADO'],
                            nombre_curso:  curso['NOMBRE_CURSO'],
                            tipo_curso: curso['TIPO_CURSO'],
                            cupo_maximo: curso['CUPO_MAXIMO'],
                            cupo_actual: -1,
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
                            // console.log("es null la fk_ficha");
                            // si la pk de la ficha es null entonces se la creamos
                            this.crear_actualizar_ficha( curso['PK_CAT_CURSO_CADO'] );

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
                                };
                                this.verificaOtroServicio();
                            }
                        }
                    },
                    error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo cargar el curso, intentelo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                    }
                ); // fin busca curso
            } // fin else si llego param
        }); // fin activate route
    } // fin metodo
    crear_actualizar_ficha(pk_curso) {
        const body = {
            pk_curso:  pk_curso
        };
        this.ficha_service.crear_actualizar_ficha(body).subscribe(
            data => {
                // console.log('crear_actualizar_ficha' + data);
                this.ficha.pk_ficha = data['pk_ficha'];
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo asignar la ficha técnica al curso, intente, más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                });
            }
        );
    }
    verificaOtroServicio() {
        // 1:Curso 2:Curso - taller 3:Taller 4:Diplomado 5:Serie de platicas 6:Simposium 7:Otro
      if (this.ficha.tipo_servicio == 7) {
          this.render.removeAttribute(this.inputOtroTipoCurso.nativeElement, 'hidden');
      }
    }
    preparaTextoPeriodo() {
        if ( this.periodosArray.length > 0 && this.curso.pk_periodo > 0 ) {
            for ( const i in this.periodosArray) {
                if (this.curso.pk_periodo == this.periodosArray[i]['PK_PERIODO_CADO'])
                    this.periodo_curso = this.periodosArray[i];
            }
            let periodo = formatDate(new Date(this.periodo_curso['FECHA_INICIO']), 'MMMM', 'es-ES', '');
            periodo = periodo + formatDate(new Date(this.periodo_curso['FECHA_INICIO']), 'yyyy', 'es-ES', '');
            periodo = periodo + '-' + formatDate(new Date(this.periodo_curso['FECHA_FIN']), 'MMMM', 'es-ES', '');
            periodo = periodo + formatDate(new Date(this.periodo_curso['FECHA_FIN']), 'yyyy', 'es-ES', '');
            return periodo = periodo.toUpperCase();
        } else {
            return 'PERIODO' + formatDate(new Date(), 'MMMM', 'es-ES', '').toUpperCase();
        }
    }
    back() {
        // metodo para cancelar la operacion
        window.history.back();
    }
    carga_usuario_en_sistema() {
        this.usuario_en_sistema = sessionStorage.getItem('IdUsuario');
    }
    crearFormularioElementosDidacticos() {
        this.formaElementosDidacticos = this.fb.group({
            // elementos_didacticos: this.fb.array([])
        });

    }

}
