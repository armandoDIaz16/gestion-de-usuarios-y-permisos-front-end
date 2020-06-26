import {Component, OnInit} from '@angular/core';
import {GruposBaseComponent} from './grupos-base-component';

@Component({
    selector: 'app-grupos-inicial-admin',
    templateUrl: '../../../views/tutorias/grupos_inicial/grupos-inicial.html',
    styleUrls: ['../../../views/tutorias/grupos_inicial/grupos-inicial.scss']
})
export class GruposTutorComponent extends GruposBaseComponent implements OnInit {

    ngOnInit() {
        this._init();
        // grupos del administrador
        if (this.ver_grupos_tutoria_inicial) {
            super.get_grupos();
        } else {
            this.router.navigateByUrl('home');
        }
    }

    private _init() {
        this.display = 'block';
        this.rol = 'TUT_TUT';
        this.valida_permisos();
    }
}
