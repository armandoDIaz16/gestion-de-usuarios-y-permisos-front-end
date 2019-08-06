import {Component, OnInit} from '@angular/core';
import {InterfaceEncuestaPendiente} from '../_models/EncuestasModel';
import {EncuestasService} from './encuestas.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-encuestas',
    templateUrl: './encuestas.component.html',
    styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

    private hay_encuestas = null;
    private lista_encuestas: InterfaceEncuestaPendiente[];
    private usuario = sessionStorage.getItem('IdUsuario');

    constructor(private encuestas_service: EncuestasService, private http: HttpClient) {
        this.hay_encuestas = false;
    }

    ngOnInit() {
        this.encuestas_service.get_encuestas(this.usuario).subscribe(
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

    handleError(error) { }

}
