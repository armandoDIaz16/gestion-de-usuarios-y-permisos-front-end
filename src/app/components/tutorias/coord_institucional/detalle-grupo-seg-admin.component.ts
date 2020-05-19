import {Component, OnInit, ViewChild} from '@angular/core';
import {GruposAdminService} from '../../../services/tutorias/coord_institucional/grupos-admin.service';
import {UsuariosService} from '../../../services/usuarios/usuarios.service';
import {InterfaceGrupoTutoria} from '../../../models/tutorias/GrupoModel';
import {InterfaceAlumnoTutoria} from '../../../models/tutorias/AlumnoModel';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-detalle-grupo-seg-admin',
    templateUrl: '../../../views/tutorias/coord_institucional/detalle-grupo-seg-admin.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/detalle-grupo-seg-admin.component.scss']
})
export class DetalleGrupoSegAdminComponent implements OnInit {

    // datos de configuración
    public display: string;
    public error = null;

    // datos propios del componente
    public lista_alumnos: InterfaceAlumnoTutoria[];
    public alumno_busqueda: InterfaceAlumnoTutoria;
    public grupo: InterfaceGrupoTutoria;
    public mostrar_busqueda: boolean;
    public numero_control: string;

    constructor(private grupos_service: GruposAdminService,
                private usuarios_service: UsuariosService,
                private route: ActivatedRoute) {
        this.grupo = {};
    }

    ngOnInit() {
        this.display = 'block';
        this._init();
        if (this.route.snapshot.queryParamMap.get('clave_grupo') !== '') {
            // buscar grupo
            this.grupos_service.get_grupo_seguimiento(
                '?pk_grupo=' + this.route.snapshot.queryParamMap.get('clave_grupo')
            ).subscribe(
                data => {
                    this.grupo = data.data;
                },
                error => {
                    this.error = error.error.error;
                }
            );

            // buscar alumnos
            this.grupos_service.get_alumnos_grupo(
                '?pk_grupo=' + this.route.snapshot.queryParamMap.get('clave_grupo')
            ).subscribe(
                data => {
                    this.lista_alumnos = data.data;
                },
                error => {
                    this.error = error.error.error;
                },
                () => {
                    this.display = 'none';
                }
            );
        }
    }

    buscar_alumnos() {
        if (this.numero_control.trim().length > 0) {
            this.mostrar_busqueda = false;
            // buscar por número de control
            this.usuarios_service.get_usuarios(
                '?numero_control=' + this.numero_control
                + '&tipo_usuario=1' // tipo alumno
                + '&carrera=' + this.grupo.PK_CARRERA
            ).subscribe(
                data => {
                    if (data.data[0] !== undefined) {
                        this.alumno_busqueda = data.data[0];
                    }
                },
                error => {
                    this.error = error.error.error;
                },
                () => {
                    this.display = 'none';
                    this.mostrar_busqueda = true;
                }
            );
        } else {
            alert('Ingrese el número de control');
        }
    }

    agregar_alumno(token: string, grupo: number) {
        if (confirm('¿Está seguro de agregar al estudiante?')) {
            // agregar alumno
        }
    }

    eliminar_alumno(token: string, grupo: number) {
        if (confirm('¿Está seguro de eliminar al estudiante')) {
            // eliminar alumno
        }
    }

    volver() {
        history.back();
    }

    private _init() {
        this.display = 'none';
        this.alumno_busqueda = null;
        this.mostrar_busqueda = false;
        this.numero_control = '';
        this.lista_alumnos = [];
    }

}
