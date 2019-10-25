import {Component, OnInit} from '@angular/core';
import {InterfaceAlumno} from '../_models/AlumnoModel';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatosAlumnoService} from './datos-alumno.service';

@Component({
    selector: 'app-datos-alumno',
    templateUrl: './datos-alumno.component.html',
    styleUrls: ['./datos-alumno.component.scss']
})
export class DatosAlumnoComponent implements OnInit {

    public error = null;
    public perfil: InterfaceAlumno;

    constructor(private datos_alumno_service: DatosAlumnoService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
    ) {
    }

    ngOnInit() {
        this.datos_alumno_service.get_perfil(
            parseInt(this.route.snapshot.queryParamMap.get('alumno'))).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.perfil = data.data;
        }
    }

    handleError(error) {
        this.error = error.error.error;
    }

    volver() {
        history.back();
    }

}
