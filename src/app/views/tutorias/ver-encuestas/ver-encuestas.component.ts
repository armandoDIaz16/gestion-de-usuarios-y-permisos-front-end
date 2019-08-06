import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {VerEncuestasService} from './ver-encuestas.service';
import {InterfaceEncuestaCompleta} from '../_models/EncuestasModel';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-ver-encuestas',
    templateUrl: './ver-encuestas.component.html',
    styleUrls: ['./ver-encuestas.component.scss']
})
export class VerEncuestasComponent implements OnInit {

    private pk_aplicacion_encuesta: number;
    private hay_encuesta = null;
    private encuesta_completa: InterfaceEncuestaCompleta;

    constructor(private ver_encuestas_service: VerEncuestasService, private route: ActivatedRoute, private http: HttpClient) {
        this.pk_aplicacion_encuesta = parseInt(this.route.snapshot.queryParamMap.get('pk_aplicacion_encuesta'));
    }

    ngOnInit() {
        this.ver_encuestas_service.get_encuesta_completa(this.pk_aplicacion_encuesta.toString()).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.encuesta_completa = data.data;
            // console.log(this.encuesta_completa);
        } else {
            this.hay_encuesta = false;
        }
    }

    handleError(error) { }

    onSubmit() { }

}
