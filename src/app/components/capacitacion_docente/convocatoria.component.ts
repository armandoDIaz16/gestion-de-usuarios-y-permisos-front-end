// Angular libs
import { Component, OnInit, ViewChild } from '@angular/core';
// Services

// Modelos

// Funciones

// Iconos
import {faEdit, faTrashAlt, faPlus, faCalendarAlt, faUsers, faTimes, faInfoCircle, faSearch, faClock} from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';
import {CursoCadoService} from '../../services/capacitacion_docente/curso-cado.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-convocatoria',
  templateUrl: '../../views/capacitacion_docente/convocatoria.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class ConvocatoriaComponent implements OnInit {

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    // icons
    fecha = faCalendarAlt;
    hora = faClock;
    add = faPlus;
    people = faUsers;
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
    public flagConvocatoria: boolean;
    prueba = ['', '' , '' , ''  , ''   , '' ];

    constructor(private curso_service: CursoCadoService,
                private router: Router) {
        this.carga_usuario_session();
       this.flagConvocatoria = false;
    }

    ngOnInit() {
        this.display = 'block';
        this.carga_convocatoria_cursos();
    }

    carga_usuario_session() {
        this.participante = sessionStorage.getItem('participante');
        if ( this.participante !== '0') {
            this.tipo_participante = sessionStorage.getItem('tipo_participante');
        }
        // this.pk_usuario_en_sistema = sessionStorage.getItem('IdUsuario');
    }





    carga_convocatoria_cursos() {
        this.lista_periodos_cursos = null;
        // consulta para coordinador
            this.curso_service.carga_convocatoria_cursos().subscribe(
                data => {
                    this.lista_periodos_cursos = data;
                    console.log(this.lista_periodos_cursos);
                    this.display = 'none';
                    if (!(Object.keys(this.lista_periodos_cursos).length === 0))
                    this.flagConvocatoria = true;
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
            // consulta para participante
        // this.display = 'none';
        /* } else if( this.tipo_participante == '2') {
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
        } */
        // this.display = 'none';
    } // fin carga cursos


}
