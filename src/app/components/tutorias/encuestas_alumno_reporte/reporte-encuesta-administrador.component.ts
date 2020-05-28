import {Component, OnInit} from '@angular/core';
import {ReporteEncuestaBaseComponent} from './reporte-encuesta-base.component';

@Component({
    selector: 'app-reporte-encuesta-tutor',
    templateUrl: '../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.html',
    styleUrls: ['../../../views/tutorias/encuestas_alumno_reporte/reporte-encuesta.scss']
})
export class ReporteEncuestaAdministradorComponent extends ReporteEncuestaBaseComponent implements OnInit {

    ngOnInit() {
        this._init();
        this.get_reporte();
    }

    _init() {
        this.reporte = [];
        if (this.activated_route.snapshot.queryParamMap.get('aplicacion')) {
            this.pk_aplicacion = this.activated_route.snapshot.queryParamMap.get('aplicacion');
        } else {
            this.router.navigateByUrl('/home');
        }
        if (this.activated_route.snapshot.queryParamMap.get('token')) {
            this.rol = this.activated_route.snapshot.queryParamMap.get('token');
        } else {
            this.router.navigateByUrl('/home');
        }
    }
}
