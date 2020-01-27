import {Component, OnInit} from '@angular/core';
import {HorarioAlumnoService} from '../horario-alumno/horario-alumno.service';
import {InterfaceAlumno} from '../_models/AlumnoModel';

@Component({
    selector: 'app-horario',
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {

    public error = null;
    public alumno: InterfaceAlumno;

    constructor(private horario_service: HorarioAlumnoService,) {
        this.alumno = <InterfaceAlumno>{};
        this.alumno.HORARIO = [
            {
                PERIODO: 0,
                ClaveMateria: '',
                Nombre: '',
                Docente: 0,
                Aula: '',
                DIAS: {
                    LUNES: '',
                    MARTES: '',
                    MIERCOLES: '',
                    JUEVES: '',
                    VIERNES: '',
                },
            }
        ];
    }

    ngOnInit() {
        this.horario_service.get_horario(parseInt(sessionStorage['IdUsuario'])).subscribe(
            data => this.resultHorario(data),
            error => {
                this.error = error.error.error;
            }
        );
    }

    resultHorario(data) {
        this.alumno = data.data;
    }

}
