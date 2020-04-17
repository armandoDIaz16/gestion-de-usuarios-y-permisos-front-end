import {Component, Input, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
// Iconos
import { faEdit, faTrashAlt, faPlus, faHdd, faTimes, faCalendarAlt, faInfoCircle, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';
// services
 import {PeriodosCadoService} from '../../services/capacitacion_docente/periodos-cado.service';
import { CursoCadoService } from '../../services/capacitacion_docente/curso-cado.service';
import {Curso} from '../../models/capacitacion_docente/cado-model.model';
import {Router, ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
// import {Object} from '@amcharts/amcharts4/.internal/fabric/fabric-impl';

@Component({
  selector: 'app-captura-curso',
  templateUrl: '../../views/capacitacion_docente/captura-curso.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})



export class CapturaCursoComponent implements OnInit {

    @ViewChild('filtro')filtro: ElementRef;
    @ViewChild('totalHoras')totalHoras: ElementRef;
    // botones
    @ViewChild('btnregistro')btnregistro: ElementRef;
    @ViewChild('btnmodificar')btnmodificar: ElementRef;
    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    // iconos
    edit = faEdit;
    delete = faTrashAlt;
    add = faPlus;
    save = faHdd;
    cancel = faTimes;
    date = faCalendarAlt;
    info = faInfoCircle;
    hora = faClock;
    mapa = faMapMarkerAlt;

    // datos
    public validado = false;
    instructor: string;
    idInstructor: number;
    usuario_en_sistema: number;
    participante: string;
    tipo_participante: string;

    curso: Curso = {
        pk_curso : -1,
        nombre_curso:  '',
        tipo_curso: -1,
        cupo_maximo: null,
        cupo_actual: -1,
        total_horas: null,
        pk_periodo: -1,
        pk_area_academica: -1,
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

    instructores: object;

    // llenado automatico periodos
        public lista_periodos: object; // periodos
        periodosArray: Array<Object>;
        public lista_area_academica: object; // areas
        areasArray: Array<Object>;
        public lista_docentes: object; // docentes
        docentesArray: Array<Object>;
        public lista_edificios: object; // edificios
        edificiosArray: Array<Object>;

  constructor(private periodo_service: PeriodosCadoService,
              private curso_service: CursoCadoService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private render: Renderer2) {
      this.participante = sessionStorage.getItem('participante');
      if ( this.participante !== '0') {
          this.tipo_participante = sessionStorage.getItem('tipo_participante');
      } else {
          this.tipo_participante = '-1';
      }
      this.carga_curso_param();
      const usuario = JSON.parse( sessionStorage.getItem('permisos'));
      this.usuario_en_sistema = usuario['numero_control'];
  }

  ngOnInit() {
      this.display = 'block';
      this.carga_periodos();
      this.carga_area_academica();
      this.consulta_edificios();
//      this.carga_instructor();

  }

    modificar_curso() {
        // console.log(this.periodo.fecha_fin);
        // console.log(this.fecha_actual_sistema);
        if (this.valida_form()) {
            Swal.fire({
                title: '¿Está seguro que desea modificar la información del curso?',
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
                    const arrayInstructores = [];
                    for (const instructor of this.curso.instructores) {
                        // console.log(edificio['PK_EDIFICIO']);
                        // console.log(this.curso.edificio);
                        arrayInstructores.push(instructor['PK_USUARIO']);

                    }
                    // console.log(arrayInstructores);
                    const body = {
                        pk_curso:  this.curso.pk_curso,
                        nombre_curso:  this.curso.nombre_curso,
                        tipo_curso:  this.curso.tipo_curso,
                        cupo_maximo: this.curso.cupo_maximo,
                        total_horas: this.curso.total_horas,
                        pk_periodo:  this.curso.pk_periodo,
                        pk_area_academica:  this.curso.pk_area_academica,
                        array_instructores: arrayInstructores,
                        fecha_inicio:   this.curso.fecha_inicio,
                        fecha_fin:  this.curso.fecha_fin,
                        hora_inicio:  formatDate(this.curso.hora_inicio, 'yyyy-MM-dd HH:mm:ss', 'en-US', ''),
                        hora_fin:    formatDate(this.curso.hora_fin, 'HH:mm:ss', 'en-US', ''),
                        edificio: this.curso.edificio,
                        espacio: this.curso.espacio,
                        estado_curso: this.curso.estado_curso,
                        no_control_usuario_registro: this.usuario_en_sistema
                    };
                    console.log(body);

                    // registrar mediante WS
                    this.curso_service.modifica_curso(body).subscribe(
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
                                this._init_components();
                                // this.loaderModal.hide();
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Se ha modificado la información del Curso correctamente!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                    // timer: 2000
                                });
                                // alert('Se ha registrado el periodo');
                                //  volver a consultar los periodos
                                this.router.navigateByUrl('/capacitacion_docente/fdf484eeeb011a5fb52cf33751b4e22f');
                                // this.ngOnInit();
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

                    // this.ngOnInit();
                }
            });
        }
    }


  carga_instructor() {
      if ( this.participante !== '0') {
          if(this.tipo_participante === '2') {
              this.curso_service.busca_instructor(this.participante).subscribe(
                  data => {
                      console.log(data);
                      this.curso.instructores = [];
                        this.curso.instructores[0] = data[0];
                      // this.render.setAttribute(this.filtro.nativeElement, 'disabled', 'true' );
                  },
                  error => {
                      console.error('no se cargaron el docente');

                  }
              );
              // this.curso.instructores = null;
          }
      }
  }

    registrar_curso() {
        // console.log(this.periodo.fecha_fin);
        // console.log(this.fecha_actual_sistema);
        if (this.valida_form()) {
            Swal.fire({
                title: '¿Está seguro que desea registrar el nuevo curso?',
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
                    const arrayInstructores = [];
                    for (const instructor of this.curso.instructores) {
                        // console.log(edificio['PK_EDIFICIO']);
                        // console.log(this.curso.edificio);
                         arrayInstructores.push(instructor['PK_USUARIO']);

                    }
        // console.log(arrayInstructores);
                    const body = {
                        nombre_curso:  this.curso.nombre_curso,
                        tipo_curso:  this.curso.tipo_curso,
                        cupo_maximo: this.curso.cupo_maximo,
                        total_horas: this.curso.total_horas,
                        pk_periodo:  this.curso.pk_periodo,
                        pk_area_academica:  this.curso.pk_area_academica,
                        array_instructores: arrayInstructores,
                        fecha_inicio:   this.curso.fecha_inicio,
                        fecha_fin:  this.curso.fecha_fin,
                        hora_inicio:  formatDate(this.curso.hora_inicio, 'yyyy-MM-dd HH:mm:ss', 'en-US', ''),
                        hora_fin:    formatDate(this.curso.hora_fin, 'HH:mm:ss', 'en-US', ''),
                        edificio: this.curso.edificio,
                        espacio: this.curso.espacio,
                        estado_curso: this.curso.estado_curso,
                        no_control_usuario_registro: this.usuario_en_sistema
                    };
                    // registrar mediante WS
                    this.curso_service.registra_curso(body).subscribe(
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
                                this._init_components();
                                // this.loaderModal.hide();
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Se ha registrado el nuevo Curso correctamente!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                    // timer: 2000
                                });
                                // alert('Se ha registrado el periodo');
                                //  volver a consultar los periodos
                                this.router.navigateByUrl('/capacitacion_docente/fdf484eeeb011a5fb52cf33751b4e22f');
                                // this.ngOnInit();
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

                    // this.ngOnInit();
                }
            });
        }
    } // fin registro curso

    registra_docente(pk_usuario: number, nombre: string, apellido1: string, apellido2: string ) {
      console.log(pk_usuario);
    this.instructor = `${nombre}  ${apellido1}  ${apellido2}`;
        this.idInstructor = pk_usuario;
        this.docentesArray = [];
    }

    filtro_instructor(event) {
      console.log(event.query);

        this.curso_service.filtro_docente(event.query).subscribe(
            data => {
                this.lista_docentes = data;
                this.docentesArray = [];

                // convierte el objeto en un arreglo para evitar problemas con ngFor
                // tslint:disable-next-line:forin
                for ( const i in this.lista_docentes) {
                    this.docentesArray.push( this.lista_docentes[i]);
                }
                console.log(this.lista_docentes);
                console.log(this.docentesArray);
            },
            error => {
                console.error('no se cargaron la lista de docentes');

            }
        );
    }
    back() {
        window.history.back();
    }
    autocompletaCampus() {

        for (const edificio of this.edificiosArray) {
            // console.log(edificio['PK_EDIFICIO']);
            // console.log(this.curso.edificio);

            if (edificio['PK_EDIFICIO'] == this.curso.edificio) {
                this.curso.campus = edificio['FK_CAMPUS'];
                // this.curso.campus = id_campus;
             }
        }
        // this.curso.edificio
      // this.curso.campus = id_campus;
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
                console.log(this.edificiosArray);
                console.log(this.lista_edificios);
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
                console.log(this.lista_area_academica);
                console.log(this.areasArray);
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
                }
                console.log(this.lista_periodos);
                console.log(this.periodosArray);
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

    _init_components() {
        this.curso = {
            pk_curso : -1,
            nombre_curso:  '',
            tipo_curso: -1,
            cupo_maximo: null,
            cupo_actual: -1,
            total_horas: null,
            pk_periodo: -1,
            pk_area_academica: -1,
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
    }

    valida_form() {
      // todo descomentar
        if (this.curso.nombre_curso.trim() === '') {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el nombre del curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del curso');
            return false;
        }
        if (this.curso.instructores == null || this.curso.instructores.length  <= 0 ) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el instructor  del curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.curso.cupo_maximo == null || this.curso.cupo_maximo <= -1) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el cupo Máximo del curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        if (!(this.curso.cupo_maximo % 1 === 0)) {
            Swal.fire({
                icon: 'info',
                title: 'El valor del cupo máximo no puede ser decimal, verificalo!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            return false;
        }


        if (this.curso.tipo_curso === -1) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el tipo de curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        if (this.curso.pk_area_academica === -1) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el área Académica',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.curso.total_horas == null || this.curso.total_horas < 30) {
            Swal.fire({
                icon: 'info',
                title: 'El total de horas del curso no puede ser menor a 30 Horas',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        // todo validar que la suma de horas x dias sea igual al total de horas del curso

        if (this.curso.campus === -1) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el campus donde se realizará el curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.curso.edificio === -1) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el edificio donde se realizará el curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.curso.espacio === '') {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el espacio donde se realizará el curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        return true;
    }
    calcularTotalHoras() {
      // test area
        /*console.log(this.totalHoras);
        console.log(this.totalHoras.nativeElement);
        console.log(this.render);*/

        if (this.validaciones_de_horas()) {

            //   fin test area

            let totalDias = 0;
            let totalHoras = 0;
            let totalFinal = 0;
            // let fechai = new Date(this.curso.fecha_inicio);
            // let fechaf = new Date(this.curso.fecha_fin);
            let horai = this.curso.hora_inicio;
            let horaf = this.curso.hora_fin;
// let r = new Date(this.curso.fecha_fin);
//             if (fechai < fechaf) {
                // entro
            let fechai    = new Date(this.curso.fecha_inicio).getTime();
            var fechaf    = new Date(this.curso.fecha_fin).getTime();

            const diff = fechaf - fechai;

            console.log(diff / (1000 * 60 * 60 * 24 ));
                totalDias = diff / (1000 * 60 * 60 * 24 );
                console.log('total dias ' + (totalDias + 1) );
                // if (horai < horaf) {
                    totalHoras = horaf.getHours() - horai.getHours();
                    console.log('total hrs ' + totalHoras);
                    totalFinal = totalHoras *  (totalDias + 1);
                    console.log('total total ' + totalFinal);
                    this.render.setProperty(this.totalHoras.nativeElement, 'value', totalFinal.toString());
                    // this.render.setValue(this.totalHoras.nativeElement, totalFinal.toString());
                    this.curso.total_horas = totalFinal;

                /* } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'La hora de inicio no puede ser mayor a la hora de finalización',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        // timer: 2000
                    });
                    // alert('Debes indicar el nombre del periodo');
                    return false;
                }*/
            /* } else {
                Swal.fire({
                    icon: 'info',
                    title: 'La fecha de inicio no puede ser mayor a la fecha de finalización',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                // alert('Debes indicar el nombre del periodo');
                return false;
            }*/

        } // fin validaciones de horas
    } // fin metodo de calcular horas

    validaciones_de_horas() {
        if (this.curso.fecha_inicio === '' || this.curso.fecha_fin === '' ) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar la fechas del curso para calcular el Total de Horas',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.curso.fecha_inicio > this.curso.fecha_fin) {
            Swal.fire({
                icon: 'info',
                title: 'La fecha de inicio no puede ser mayor a la fecha de finalización',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.curso.pk_periodo === -1) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar el Periodo al cual quieres asignar el curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        if (this.periodosArray.length > 0 ) {
            let temfechai = null;
            let temfechaf = null;
            for (let periodo of this.periodosArray) {
                       if (periodo['PK_PERIODO_CADO'] == this.curso.pk_periodo ) {
                           temfechai = formatDate(periodo['FECHA_INICIO'], 'yyyy-MM-dd', 'en-US', '');
                           // temfechai = periodo['FECHA_INICIO'];
                           temfechaf =   formatDate(periodo['FECHA_FIN'], 'yyyy-MM-dd', 'en-US', '');
                           // temfechaf = periodo['FECHA_FIN'];
                       }
            }
            // console.log(this.curso.fecha_inicio);
            // console.log(temfechai);
            if (this.curso.fecha_inicio < temfechai ) {
                Swal.fire({
                    icon: 'info',
                    title: 'La fecha de inicio del curso no puede ser menor  a la fecha de inicio del periodo ' +
                        formatDate(temfechai, 'dd-MM-yyyy', 'en-US', '') ,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                // alert('Debes indicar el nombre del periodo');
                return false;
            }
            // console.log(this.curso.fecha_fin);
            // console.log(temfechaf);
            if (this.curso.fecha_fin > temfechaf ) {
                Swal.fire({
                    icon: 'info',
                    title: 'La fecha de finalización del curso no puede ser mayor a la fecha de finalización del periodo ' +
                        formatDate(temfechaf, 'dd-MM-yyyy', 'en-US', '') ,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
                // alert('Debes indicar el nombre del periodo');
                return false;
            }
        }



        if (this.curso.hora_inicio == null || this.curso.hora_fin == null ) {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar las horas del curso para poder Calcular el Total de Horas',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
console.log(this.curso.hora_inicio.getHours());
        console.log(this.curso.hora_fin.getHours());
        if (this.curso.hora_inicio.getHours() >= this.curso.hora_fin.getHours()) {
            Swal.fire({
                icon: 'info',
                title: 'La hora de inicio no puede ser mayor a la hora de finalización',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }


        if (this.curso.hora_inicio.getHours() < 7) {
            Swal.fire({
                icon: 'info',
                title: 'La hora de inicio no puede ser menor a las 7:00 am, el horario de Cursos es de 7:00 am a 9:00 pm ',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        // console.log(this.curso.hora_fin.getHours());
        if (this.curso.hora_fin.getHours() >= 21 && this.curso.hora_fin.getMinutes() > 0 ) {
            Swal.fire({
                icon: 'info',
                title: 'La hora de finalización no puede ser mayor a las 9:00 pm, el horario de Cursos es de 7:00 am a 9:00 pm ',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }

        return true;
    }

    carga_curso_param() {

        this.activatedRouter.params.subscribe( param => {
            if ( Object.keys(param).length === 0) {
                console.log('no llego el parametro ' + param);
                this.carga_instructor();
            } else {
                console.log('si llego el parametro ' + param['id']);
                this.curso_service.busca_curso_por_pk(param['id']).subscribe(
                    data => {
                        console.log('cuerpo del curso');
                        console.log( data[0][0]);
                        const curso = data[0][0];
                        // this.curso.instructores = [];
                        // this.curso.instructores[0] = data[0];
                        // this.render.setAttribute(this.filtro.nativeElement, 'disabled', 'true' );
                        this.curso = {
                            pk_curso : curso['PK_CAT_CURSO_CADO'],
                            nombre_curso:  curso['NOMBRE_CURSO'],
                            tipo_curso: curso['TIPO_CURSO'],
                            cupo_maximo: curso['CUPO_MAXIMO'],
                            cupo_actual: -1,
                            total_horas: curso['TOTAL_HORAS'],
                            pk_periodo: curso['FK_PERIODO_CADO'],
                            pk_area_academica: curso['FK_AREA_ACADEMICA'] == null ? 0 : curso['FK_AREA_ACADEMICA'] ,
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

                        this.render.removeAttribute(this.btnmodificar.nativeElement, 'hidden');
                        this.render.setAttribute(this.btnregistro.nativeElement, 'hidden', '');

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

}// end class
