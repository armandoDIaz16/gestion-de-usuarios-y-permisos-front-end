import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfaceGruposTutoria, InterfaceGrupoTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposInicialDetalleService} from '../../../services/tutorias/grupos-inicial-detalle.service';
import {DetalleBaseComponent} from './detalle-base.component';
import {Modulos} from '../../../config/Tutorias';

@Component({
    selector: 'app-detalle-grupo',
    templateUrl: '../../../views/tutorias/grupos_inicial_detalle/detalle-grupo.html',
    styleUrls: ['../../../views/tutorias/grupos_inicial_detalle/detalle-grupo.scss']
})
export class DetalleGrupoAdministradorComponent extends DetalleBaseComponent implements OnInit {
    ngOnInit() {
        this._init();
        if (this.ver_detalles_grupo) {
            super.get_detalle();
        } else {
            this.router.navigateByUrl('home');
        }
    }

    private _init() {
        this.display = 'block';
        this.detalle_grupo = [];
        if (this.route.snapshot.queryParamMap.get('grupo')) {
            this.pk_grupo = parseInt(this.route.snapshot.queryParamMap.get('grupo'), 10);
        } else {
            this.router.navigateByUrl('/home');
        }
        if (this.route.snapshot.queryParamMap.get('token')) {
            this.token_rol = this.route.snapshot.queryParamMap.get('token');
        } else {
            this.router.navigateByUrl('/home');
        }
        this.valida_permisos();
    }
}
