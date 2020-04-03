import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HorarioAlumnoService} from '../../services/tutorias/horario-alumno.service';
import {InterfaceAlumno} from '../../models/tutorias/AlumnoModel';

@Component({
    selector: 'app-horario-alumno',
    templateUrl: '../../views/tutorias/horario-alumno.component.html',
    styleUrls: ['../../views/tutorias/horario-alumno.component.scss']
})
export class HorarioAlumnoComponent implements OnInit {

    public error = null;
    public alumno: InterfaceAlumno;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

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

        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

        this.horario_service.get_horario(
            this.route.snapshot.queryParamMap.get('alumno')).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.alumno = data.data;
        }

        this.display = 'none';
    }

    handleError(error) {
        this.display = 'none';
    }

    volver() {
        history.back();
    }

}
