import {Component, OnInit, ViewChild} from '@angular/core';
import {SeguimientoServiceService} from '../../services/seguimiento-service.service';
import {InterfaceSeguimiento} from '../../views/_models/GeneralModels';

@Component({
    selector: 'app-seguimiento',
    templateUrl: '../../views/tutorias/seguimiento.component.html',
    styleUrls: ['../../views/tutorias/seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {

    public error;
    public seguimiento: InterfaceSeguimiento[];

    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private seguimiento_service: SeguimientoServiceService) {
        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';

        this._init_components();
        this.seguimiento_service.seguimiento_alumno(sessionStorage['IdEncriptada']).subscribe(
            data => {
                this.seguimiento = data;
                this.display = 'none';
            },
            error => {
                this.error = error.error;
                this.display = 'none';
            }
        );
    }

    _init_components() {
        this.error = null;
        this.seguimiento = [];
    }

}
