import {Component, OnInit} from '@angular/core';
import {InterfaceEncuestaPendiente} from '../_models/EncuestasModel';
import {HttpClient} from '@angular/common/http';
import {EncuestasService} from '../encuestas/encuestas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InterfaceAlumno} from '../_models/AlumnoModel';
import {DatosAlumnoService} from '../datos-alumno/datos-alumno.service';

@Component({
    selector: 'app-encuestas-alumno',
    templateUrl: './encuestas-alumno.component.html',
    styleUrls: ['./encuestas-alumno.component.scss']
})
export class EncuestasAlumnoComponent implements OnInit {

    public hay_encuestas = null;
    public lista_encuestas: InterfaceEncuestaPendiente[];
    public alumno: InterfaceAlumno;
    public usuario = null;

    constructor(private encuestas_service: EncuestasService,
                private alumno_service: DatosAlumnoService,
                private http: HttpClient,
                private router: Router,
                private route: ActivatedRoute) {
        this.hay_encuestas = false;
        this.usuario = parseInt(this.route.snapshot.queryParamMap.get('alumno'));
    }

    ngOnInit() {
        this.encuestas_service.get_encuestas(parseInt(this.usuario)).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );

        this.alumno_service.get_perfil(parseInt(this.usuario)).subscribe(
            data => this.handleResponseAlumno(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.hay_encuestas = true;
            this.lista_encuestas = data.data;
        } else {
            this.hay_encuestas = false;
        }
    }

    handleResponseAlumno(data) {
        if (data.data) {
            this.alumno = data.data;
        } else {
            this.hay_encuestas = false;
        }
    }

    handleError(error) {
    }

    volver() {
        history.back();
    }

}
