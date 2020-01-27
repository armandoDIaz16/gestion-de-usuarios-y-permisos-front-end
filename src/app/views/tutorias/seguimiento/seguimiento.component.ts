import {Component, OnInit} from '@angular/core';
import {SeguimientoServiceService} from '../../../services/seguimiento-service.service';
import {InterfaceSeguimiento} from '../../_models/GeneralModels';

@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html',
    styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {

    public error;
    public seguimiento: InterfaceSeguimiento[];

    constructor(private seguimiento_service: SeguimientoServiceService) { }

    ngOnInit() {
        this._init_components();
        this.seguimiento_service.seguimiento_alumno(sessionStorage['IdEncriptada']).subscribe(
            data => {
                this.seguimiento = data;
            },
            error => {
                this.error = error.error;
            }
        );
    }

    _init_components() {
        this.error = null;
        this.seguimiento = [];
    }

}
