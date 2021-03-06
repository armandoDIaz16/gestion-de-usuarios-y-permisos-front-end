import {Component, OnInit, ViewChild} from '@angular/core';
import {HorarioAlumnoService} from '../../../services/tutorias/horario_alumno/horario-alumno.service';
import {InterfaceAlumno} from '../../../models/tutorias/AlumnoModel';

@Component({
    selector: 'app-horario',
    templateUrl: '../../../views/tutorias/estudiante/horario.component.html',
    styleUrls: ['../../../views/tutorias/estudiante/horario.component.scss']
})
export class HorarioComponent implements OnInit {

    public error = null;
    public alumno: InterfaceAlumno;

    @ViewChild('loaderModal') loaderModal;
    public display: string;

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

        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

        this.horario_service.get_horario(sessionStorage['IdEncriptada']).subscribe(
            data => this.resultHorario(data),
            error => {
                this.error = error.error.error;
                this.display = 'none';
            }
        );
    }

    resultHorario(data) {
        this.alumno = data.data;

        this.display = 'none';
    }

}
