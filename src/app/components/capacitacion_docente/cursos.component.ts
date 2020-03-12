// Angular libs
import { Component, OnInit, ViewChild } from '@angular/core';
// Services

// Modelos

// Funciones

// Iconos
import {faEdit, faTrashAlt, faPlus, faCalendarAlt, faTimes, faInfoCircle, faSearch, faClock} from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';
import {CursoCadoService} from '../../services/capacitacion_docente/curso-cado.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: '../../views/capacitacion_docente/cursos.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class CursosComponent implements OnInit {

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    // icons
    fecha = faCalendarAlt;
    hora = faClock;
    add = faPlus;
    search = faSearch;
    info = faInfoCircle;
    edit = faEdit;
    delete = faTrashAlt;

    // data
    participante: string;
    tipo_participante: string;
    pk_usuario_en_sistema: string;
    index = 3;
    // llenado automatico periodos
    public lista_periodos_cursos: object; // periodos cursos
    periodosCursosArray: Array<Object>;

    prueba = ['', '' , '' , ''  , ''   , '' ];

  constructor(private curso_service: CursoCadoService,
              private router: Router) {
      this.carga_usuario_session();
  }

  ngOnInit() {
      this.display = 'block';
      this.carga_periodos_cursos();
  }

  carga_usuario_session() {
      this.participante = sessionStorage.getItem('participante');
      if ( this.participante !== '0') {
          this.tipo_participante = sessionStorage.getItem('tipo_participante');
      }
      // this.pk_usuario_en_sistema = sessionStorage.getItem('IdUsuario');
  }


    modificarCurso(pk_curso: number) {
        console.log('pk del curso modificar' + pk_curso);
        this.router.navigateByUrl('/capacitacion_docente/7b44125ec5b3b7b61b000cdee93c6796/' + pk_curso);


    }


    eliminarCurso(pk_curso: number, estado_curso: number) {
      console.log('pk del curso delete ' + pk_curso);
        // console.log(pk_periodo);
        // console.log(pk_periodo);
        // console.log(pk_periodo);
        // eliminar periodo
        Swal.fire({
            title: '¿Está seguro que desea eliminar el  curso propuesto?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {

                // por autorizar
                // if (estado_curso === 1) {


                // definiendo body
                const body = {
                    pk_periodo_curso: pk_curso,
                    participante: this.participante
                };

                let error = false;
                let mensaje = '';
                console.log(estado_curso);
                    // estado curso 1 = por autoprizar //si esta en por autorizar que lo elimine logicamente
                if (estado_curso == 1) {
                // eliminar mediante WS
                //     console.log('entro if');
                    this.eliminarCursoPorService(body, error, mensaje);
            } else if(estado_curso == 2) { // estado curso 2 = autorizado // todo si esta autorizado que  desincriba a las personas inscritas

                } else if (estado_curso == 3) { // estado curso 3 = rechazado // todo si esta rechazdo que lo elimine logicamnete
                    // eliminar mediante WS
                    this.eliminarCursoPorService(body, error, mensaje);
                    } else if (estado_curso == 4) { // estado curso 4 = evaluado // todo si esta terminado y con evaluaciones que  no lo permita
                    Swal.fire({
                        icon: 'info',
                        title: '¡Lo sentimos no se puede eliminar un curso que ya ha sido evaluado!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        // timer: 2000
                    });
                        return false;
                     }
            } // fin confirmacion
        }); // fin confirmacion alert

    } // fin metodo

    carga_periodos_cursos() {
        this.lista_periodos_cursos = null;
        // console.log(this.tipo_participante);
        if( this.tipo_participante == '4') {
            this.curso_service.consulta_cursos_coordinador().subscribe (
                data => {
                    this.lista_periodos_cursos = data;
                    console.log(this.lista_periodos_cursos);
                    this.display = 'none';
                },
                error => {
                    this.display = 'none';
                    console.error('no se cargaron los cursos');
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, no se cargaron los cursos intentalo más tarde!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        // timer: 2000
                    });

                }
            );
        } else if( this.tipo_participante == '2') {
            this.curso_service.consulta_cursos_instructor(this.participante).subscribe (
                data => {
                    this.lista_periodos_cursos = data;
                    console.log(this.lista_periodos_cursos);
                    this.display = 'none';
                },
                error => {
                    this.display = 'none';
                    console.error('no se cargaron los cursos');
                    Swal.fire({
                        icon: 'error',
                        title: '¡Lo sentimos ha ocurrido un error, no se cargaron los cursos reportelo a Sistemas!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                }
            );
        } else {
            this.display = 'none';
        }// fin if
        // this.display = 'none';
    } // fin carga cursos

    eliminarCursoPorService(body: object, error: boolean, mensaje: string) {
        // eliminar mediante WS
        // console.log('entro service');
        this.curso_service.eliminar_curso(body).subscribe(
            data => {  //
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
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se ha eliminado el curso correctamente!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        // timer: 2000
                    });
                    this.ngOnInit();
                }
            },
            error => { // cuando ocurre un error
                Swal.fire({
                    icon: 'error',
                    title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    // timer: 2000
                });
            }
        ); // fin subscribe eliminar curso
    }
}
