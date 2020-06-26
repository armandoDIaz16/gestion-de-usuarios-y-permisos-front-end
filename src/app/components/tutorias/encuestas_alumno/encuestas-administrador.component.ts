import {Component, OnInit, ViewChild} from '@angular/core';
import {EncuestasBaseComponent} from './encuestas-base.component';

@Component({
    selector: 'app-encuestas-alumno',
    templateUrl: '../../../views/tutorias/encuestas_alumno/encuestas-alumno.html',
    styleUrls: ['../../../views/tutorias/encuestas_alumno/encuestas-alumno.scss']
})
export class EncuestasAdministradorComponent extends EncuestasBaseComponent implements OnInit {
    ngOnInit() {
        this._init();
        // grupos del administrador
        if (this.ver_detalle_encuestas_alumno) {
            super.get_encuestas();
            super.get_perfil();
        } else {
            this.router.navigateByUrl('home');
        }
    }

    private _init() {
        if (this.route.snapshot.queryParamMap.get('alumno')) {
            this.pk_alumno = this.route.snapshot.queryParamMap.get('alumno');
        } else {
            this.router.navigateByUrl('home');
        }
        if (this.route.snapshot.queryParamMap.get('token')) {
            this.token_rol = this.route.snapshot.queryParamMap.get('token');
        } else {
            this.router.navigateByUrl('home');
        }
        this.alumno = [];
        this.usuario = [];
        this.display = 'block';
        this.valida_permisos();
    }
}
