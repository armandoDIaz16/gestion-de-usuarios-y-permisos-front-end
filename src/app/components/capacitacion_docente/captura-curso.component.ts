import { Component, OnInit } from '@angular/core';
// Iconos
import { faEdit, faTrashAlt, faPlus, faHdd, faTimes, faCalendarAlt, faInfoCircle, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';
@Component({
  selector: 'app-captura-curso',
  templateUrl: '../../views/capacitacion_docente/captura-curso.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class CapturaCursoComponent implements OnInit {

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

    hora_inicio_curso: string;

  constructor() { }

  ngOnInit() {
  }

}
