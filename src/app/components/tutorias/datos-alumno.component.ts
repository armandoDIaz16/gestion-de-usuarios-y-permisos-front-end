import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';
import {PerfilService} from '../../services/perfil.service';
import {Modulos} from '../../config/Tutorias';

@Component({
    selector: 'app-datos-alumno',
    templateUrl: '../../views/tutorias/datos_alumno/datos-alumno.html',
    styleUrls: ['../../views/tutorias/datos_alumno/datos-alumno.scss']
})
export class DatosAlumnoComponent implements OnInit {
    /* Configuracion */
    public rol = '';
    public display = 'block';
    public error = null;

    /* Permisos */
    public ver_datos_personales_alumno = false;

    /* Ventanas modales */

    /* Datos propios */
    public perfil = null;
    public pk_alumno = '';

    constructor(private perfil_service: PerfilService,
                private route: ActivatedRoute,
                private router: Router,
    ) { }

    ngOnInit() {
        this._init();
        this.valida_permisos();
        this.get_perfil();
    }

    get_perfil() {
        this.display = 'block';
        this.perfil_service.get_perfil('?pk_encriptada=' + this.pk_alumno).subscribe(
            data => {
                this.perfil = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    _init() {
        this.rol = 'ADM_TUT';
        this.perfil = [];
        if (this.route.snapshot.queryParamMap.get('alumno')) {
            this.pk_alumno = this.route.snapshot.queryParamMap.get('alumno');
        } else {
            this.router.navigateByUrl('/home');
        }
    }

    valida_permisos() {
        this.ver_datos_personales_alumno = Modulos.valida_rol_accion(this.rol, Modulos.VER_DATOS_PERSONALES_ALUMNO);
    }

    volver() {
        history.back();
    }

}
