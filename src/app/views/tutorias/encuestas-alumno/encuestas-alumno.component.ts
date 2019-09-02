import {Component, OnInit} from '@angular/core';
import {InterfaceEncuestaPendiente} from '../_models/EncuestasModel';
import {HttpClient} from '@angular/common/http';
import {EncuestasService} from '../encuestas/encuestas.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-encuestas-alumno',
    templateUrl: './encuestas-alumno.component.html',
    styleUrls: ['./encuestas-alumno.component.scss']
})
export class EncuestasAlumnoComponent implements OnInit {

    public hay_encuestas = null;
    public lista_encuestas: InterfaceEncuestaPendiente[];
    public usuario = null;

    constructor(private encuestas_service: EncuestasService,
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
    }

    handleResponse(data) {
        if (data.data) {
            this.hay_encuestas = true;
            this.lista_encuestas = data.data;
            // console.log(this.lista_encuestas);
        } else {
            this.hay_encuestas = false;
        }
    }

    handleError(error) {
    }

}
