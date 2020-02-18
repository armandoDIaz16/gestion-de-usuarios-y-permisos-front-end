// Angular libs
import { Component, OnInit, ViewChild } from '@angular/core';
// Services

// Modelos

// Funciones

// Iconos
import {faEdit, faTrashAlt, faPlus, faCalendarAlt, faTimes, faInfoCircle, faSearch, faClock} from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: '../../views/capacitacion_docente/cursos.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class CursosComponent implements OnInit {

    // icons
    fecha = faCalendarAlt;
    hora = faClock;
    add = faPlus;
    search = faSearch;
    info = faInfoCircle;
    edit = faEdit;
    delete = faTrashAlt;
    prueba = ['', '' , '' , ''  , ''   , '' ];

  constructor() { }

  ngOnInit() {
  }

}
