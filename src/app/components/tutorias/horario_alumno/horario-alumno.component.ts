import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HorarioAlumnoService} from '../../../services/tutorias/horario_alumno/horario-alumno.service';
import {Modulos} from '../../../config/Tutorias';

@Component({
    selector: 'app-horario-alumno',
    templateUrl: '../../../views/tutorias/horario_alumno/horario-alumno.html',
    styleUrls: ['../../../views/tutorias/horario_alumno/horario-alumno.scss']
})
export class HorarioAlumnoComponent implements OnInit {
    /* Configuracion */
    public rol = '';
    public display = 'block';
    public error = null;

    /* Permisos */
    public ver_horario_alumno = false;

    /* Ventanas modales */

    /* Datos propios */
    public horario_alumno = null;
    public pk_alumno = '';

    constructor(private horario_service: HorarioAlumnoService,
                private route: ActivatedRoute,
                protected router: Router,
    ) { }

    ngOnInit() {
        this._init();
        this.valida_permisos();
        this.get_horario();
    }

    get_horario() {
        this.display = 'block';
        this.horario_service.get_horario(this.pk_alumno).subscribe(
            data => {
                this.horario_alumno = data.data;
            },
            error => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    volver() {
        history.back();
    }

    _init() {
        this.rol = 'ADM_TUT';
        this.horario_alumno = [];
        if (this.route.snapshot.queryParamMap.get('alumno')) {
            this.pk_alumno = this.route.snapshot.queryParamMap.get('alumno');
        } else {
            this.router.navigateByUrl('/home');
        }
    }

    valida_permisos() {
        this.ver_horario_alumno = Modulos.valida_rol_accion(this.rol, Modulos.VER_HORARIO_ALUMNO);
    }
}
