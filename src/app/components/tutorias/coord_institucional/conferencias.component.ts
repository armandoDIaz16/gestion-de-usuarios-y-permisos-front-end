import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfaceConferencia} from '../../../models/tutorias/ConferenciaModel';
import {ConferenciasServiceService} from '../../../services/tutorias/coord_institucional/conferencias-service.service';

@Component({
    selector: 'app-conferencias',
    templateUrl: '../../../views/tutorias/coord_institucional/conferencias.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/conferencias.component.scss']
})
export class ConferenciasComponent implements OnInit {

    public error = null;
    public display = 'block';
    public lista_conferencias: InterfaceConferencia[];

    @ViewChild('loaderModal') loaderModal;

    constructor(private conferencias_service: ConferenciasServiceService) {
        this.lista_conferencias = <InterfaceConferencia[]>{};
    }

    ngOnInit() {
        this.conferencias_service.get_conferencias().subscribe(
            data => {
                this.display = 'none';
                this.lista_conferencias = data;
            },
            error => {
                this.error = error.error.error;
                this.display = 'none';
            }
        );
    }

}
