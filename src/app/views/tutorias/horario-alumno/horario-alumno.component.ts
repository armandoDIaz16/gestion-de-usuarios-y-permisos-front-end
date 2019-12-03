import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HorarioAlumnoService} from './horario-alumno.service';
import {InterfaceAlumno} from '../_models/AlumnoModel';

@Component({
    selector: 'app-horario-alumno',
    templateUrl: './horario-alumno.component.html',
    styleUrls: ['./horario-alumno.component.scss']
})
export class HorarioAlumnoComponent implements OnInit {

    public error = null;
    public alumno: InterfaceAlumno;

    constructor(private horario_service: HorarioAlumnoService,
                private route: ActivatedRoute,
    ) {
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
        this.horario_service.get_horario(
            parseInt(this.route.snapshot.queryParamMap.get('alumno'))).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.alumno = data.data;
        }
    }

    handleError(error) {

    }

    volver() {
        history.back();
    }

}
