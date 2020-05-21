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
            this.buscar_grupo();
            // buscar alumnos
            this.buscar_alumnos();
        }
    }

    buscar_alumnos() {
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

    buscar_grupo() {
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
    }

    buscar_alumno() {
        if (this.numero_control.trim().length > 0) {
            // buscar por número de control
            this.get_alumno();
        } else {
            alert('Ingrese el número de control');
        }
    }

    get_alumno() {
        this.usuarios_service.get_alumno(
            '?numero_control=' + this.numero_control
            + '&carrera=' + this.grupo.PK_CARRERA
        ).subscribe(
            data => {
                if (data.data[0] !== undefined) {
                    this.alumno_busqueda = data.data[0];
                } else {
                    this.alumno_busqueda = null;
                    alert('No se encontraron datos');
                }
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
            }
        );
    }

    agregar_alumno(token_alumno: string, pk_grupo: number) {
        if (confirm('¿Está seguro de agregar al estudiante?'
            + '\nEsta acción lo eliminará de cualquier otro grupo en que pueda estar registrado')) {
            // agregar alumno
            const body = {
                token_alumno: token_alumno,
                pk_grupo: pk_grupo
            };
            this.grupos_service.agrega_alumno(body).subscribe(
                (result) => {
                    this.display = 'block';
                },
                (error) => {
                    alert('Ha ocurrido un error');
                },
                () => {
                    this.display = 'none';
                    this.ngOnInit();
                }
            );
        }
    }

    eliminar_alumno(pk_detalle) {
        if (confirm('¿Está seguro de eliminar al estudiante')) {
            this.display = 'block';
            this.grupos_service.elimina_alumno_grupo(pk_detalle).subscribe(
                () => {},
                () => {
                    alert('Ha ocurrido un error');
                },
                () => {
                    this.display = 'none';
                    this.ngOnInit();
                }
            );
        }
    }

    volver() {
        history.back();
    }

    private _init() {
        this.display = 'none';
        this.alumno_busqueda = null;
        this.numero_control = '';
        this.lista_alumnos = [];
    }

}
