import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfaceEncuestaPendiente} from '../../../models/tutorias/EncuestasModel';
import {EncuestasService} from '../../../services/tutorias/encuestas.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-encuestas',
    templateUrl: '../../../views/tutorias/estudiante/encuestas.component.html',
    styleUrls: ['../../../views/tutorias/estudiante/encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

    public hay_encuestas = null;
    public lista_encuestas: InterfaceEncuestaPendiente[];

    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private encuestas_service: EncuestasService, private http: HttpClient) {
        this.hay_encuestas = false;
        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

        this.encuestas_service.get_encuestas(sessionStorage.getItem('IdEncriptada')).subscribe(
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

        this.display = 'none';
    }

    handleError(error) {
        this.display = 'none';
    }

}
