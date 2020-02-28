import {Component, Input, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
// Iconos
import { faEdit, faTrashAlt, faPlus, faHdd, faTimes, faCalendarAlt, faInfoCircle, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';
// services
 import {PeriodosCadoService} from '../../services/capacitacion_docente/periodos-cado.service';
import { CursoCadoService } from '../../services/capacitacion_docente/curso-cado.service';
import {Curso} from '../../models/capacitacion_docente/cado-model.model';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-captura-curso',
  templateUrl: '../../views/capacitacion_docente/captura-curso.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})



export class CapturaCursoComponent implements OnInit {

    @ViewChild('filtro')filtro: ElementRef;

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
              private render: Renderer2) {
      const usuario = JSON.parse( sessionStorage.getItem('permisos'));
      this.usuario_en_sistema = usuario['numero_control'];
  }

  ngOnInit() {
      this.display = 'block';
      this.carga_periodos();
      this.carga_area_academica();
      this.consulta_edificios();
      this.carga_instructor();

  }

  carga_instructor() {
      this.participante = sessionStorage.getItem('participante');
      if ( this.participante !== '0') {
          this.tipo_participante = sessionStorage.getItem('tipo_participante');
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
                                }
                            }
                            if (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                });
                                /*this._init_components();
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
                                // this.ngOnInit();*/
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
            console.log(edificio['PK_EDIFICIO']);
            console.log(this.curso.edificio);

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
                this.display = 'none';
            },
            error => {
                console.error('no se cargaron la lista de Edificios');
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista de Edificios  reportelo a Sistemas!',
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
                    title: '¡Lo sentimos ha ocurrido un error, no se cargó la lista de Áreas Académicas reportelo a Sistemas!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        );
    }
    carga_periodos() {
        this.lista_periodos = null;
            this.periodo_service.consulta_periodos().subscribe (
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
                    title: '¡Lo sentimos ha ocurrido un error, no se cargaron los periodos reportelo a Sistemas!',
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
   /*   // todo descomentar
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
        if (this.idInstructor === -1) {
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

        if (this.curso.cupo_maximo === -1) {
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

        if (this.curso.fecha_inicio === '') {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar la fecha de inicio del curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        if (this.curso.fecha_fin === '') {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar la fecha de finallización del curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        if (this.curso.hora_inicio === '') {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar la hora de inicio del curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        if (this.curso.hora_fin === '') {
            Swal.fire({
                icon: 'info',
                title: 'Debes indicar la hora de finallización del curso',
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
                title: 'Debes indicar el espacio done se realizará el curso',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                // timer: 2000
            });
            // alert('Debes indicar el nombre del periodo');
            return false;
        }
        */
        return true;
    }

}
