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
    index = 3;
    // llenado automatico periodos
    public lista_periodos_cursos: object; // periodos cursos
    periodosCursosArray: Array<Object>;

    prueba = ['', '' , '' , ''  , ''   , '' ];

  constructor(private curso_service: CursoCadoService) {
      this.participante = sessionStorage.getItem('participante');
      if ( this.participante !== '0') {
          this.tipo_participante = sessionStorage.getItem('tipo_participante');
      }
  }

  ngOnInit() {
      this.display = 'block';
      this.carga_periodos_cursos();
  }



    carga_periodos_cursos() {
        this.lista_periodos_cursos = null;
        console.log(this.tipo_participante);
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
        } // fin if
        // this.display = 'none';
    } // fin carga cursos

}
