import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

    constructor(private ver_encuestas_service: VerEncuestasService, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
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

    handleError(error) {
    }

    onSubmit() {
        var array_respuestas = [], array_original = [];
        for (var _i = 0; _i < 15; _i++) {
            array_respuestas.push(
                parseInt((<HTMLInputElement>document.getElementById('res_' + _i)).value)
            );
            array_original.push(
                parseInt((<HTMLInputElement>document.getElementById('res_' + _i)).value)
            );
        }

        array_respuestas.sort(this.mayor_a_menor);

        if (this.valida_array_respuestas(array_respuestas)) {
            this.ver_encuestas_service.guarda_respuestas_pasatiempos(this.pk_aplicacion_encuesta.toString(), array_original).subscribe(
                data => this.handleResponseGuardar(data),
                error => this.handleError(error)
            );
        } else {
            alert('Los números no deben repetirse');
        }
    }

    handleResponseGuardar(data) {
        if (data.data) {
            this.router.navigateByUrl('/tutorias/encuestas');
        }
    }

    valida_array_respuestas(array_respuestas) {
        for (var _i = 0; _i < 14; _i++) {
            if (array_respuestas[_i] == array_respuestas[_i + 1]) {
                return false;
            }
        }

        return true;
    }

    mayor_a_menor(elem1, elem2) {
        return elem1 - elem2;
    }

}
