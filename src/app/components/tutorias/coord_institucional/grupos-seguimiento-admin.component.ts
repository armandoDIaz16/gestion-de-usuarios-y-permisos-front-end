import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposAdminService} from '../../../services/tutorias/coord_institucional/grupos-admin.service';
import {InterfaceCarrera} from '../../../models/general/CarreraModel';
import {CarrerasService} from '../../../services/general/carreras.service';
import {InterfaceUsuario} from '../../../models/general/UsuarioModel';
import {UsuariosService} from '../../../services/usuarios/usuarios.service';
import {number} from '@amcharts/amcharts4/core';

@Component({
    selector: 'app-grupos-seguimiento-admin',
    templateUrl: '../../../views/tutorias/coord_institucional/grupos-seguimiento-admin.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/grupos-seguimiento-admin.component.scss']
})
export class GruposSeguimientoAdminComponent implements OnInit {

    // ventanas modales
    @ViewChild('modalGrupoNuevo') modalGrupoNuevo;

    public error = null;
    public lista_grupos: InterfacecCarreraGruposTutoria;
    public display = '';
    public lista_carreras: InterfaceCarrera[];
    public lista_tutores: InterfaceUsuario[];
    public form_grupo = {
        pk_grupo: 0,
        carrera: 0,
        tutor: 0,
        clave_grupo: ''
    };

    constructor(private grupos_service: GruposAdminService,
                private carreras_service: CarrerasService,
                private usuarios_service: UsuariosService) {
        this.lista_grupos = <InterfacecCarreraGruposTutoria>{};
    }

    ngOnInit() {
        this.display = 'block';
        this._init();
        this.obtener_grupos();
        this.obtener_carreras();
    }

    elimina_grupo(pk_grupo: number) {
        if (confirm('¿Está seguro que desea eliminar el grupo y todos los alumnos vinculados?')) {
            this.grupos_service.elimina_grupo(pk_grupo).subscribe(
                data => {
                    this.ngOnInit();
                },
                error => {
                    this.error = error.error.error;
                    alert('Ocurrión un error');
                }
            );
        }
    }

    editar_grupo(pk_grupo: number) {
        // editar grupo
        this.grupos_service.get_grupo_seguimiento(
            '?pk_grupo=' + pk_grupo
        ).subscribe(
            data => {
                this.form_grupo = {
                    pk_grupo: data.data.PK_GRUPO_TUTORIA,
                    carrera: data.data.PK_CARRERA,
                    tutor: data.data.FK_USUARIO,
                    clave_grupo: data.data.CLAVE,
                };
                this.modalGrupoNuevo.show();
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.busca_tutores();
            }
        );
    }

    obtener_carreras(tutor?: number) {
        this.carreras_service.get_carreras('').subscribe(
            data => {
                this.lista_carreras = data;
            },
            error => {
                this.error = error.error.error;
            }
        );
    }

    obtener_grupos() {
        this.grupos_service.get_grupos_seguimiento().subscribe(
            data => {
                this.lista_grupos = data;
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
            }
        );
    }

    guardar_grupo() {
        // guardar grupo de seguimiento
        if (this.valida_grupo()) {
            this.display = 'block';
            if (this.form_grupo.pk_grupo === 0) {
                // crear grupo
                this.crea_grupo();
            } else {
                // actualizar grupo
                this.actualiza_grupo();
            }
        }
    }

    actualiza_grupo() {
        this.grupos_service.actualiza_grupo_seguimiento(this.form_grupo, this.form_grupo.pk_grupo).subscribe(
            data => {
                alert('El grupo ha sido actualizado');
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
                this.modalGrupoNuevo.hide();
                this.ngOnInit();
            }
        );
    }

    crea_grupo() {
        this.grupos_service.crea_grupo_seguimiento(this.form_grupo).subscribe(
            data => {
                alert('El grupo ha sido creado');
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
                this.modalGrupoNuevo.hide();
                this.ngOnInit();
            }
        );
    }

    busca_tutores() {
        this.lista_tutores = [];
        // this.form_grupo.tutor = (this.form_grupo.tutor !== 0) ? this.form_grupo.tutor : 0;
        // buscar tutores por carrera
        if (this.form_grupo.carrera !== 0) {
            this.usuarios_service.get_usuarios(
                '?carrera=' + this.form_grupo.carrera
                + '&tipo_usuario=2' // 2 - administrativo o docente
            ).subscribe(
                data => {
                    this.lista_tutores = data.data;
                },
                error => {
                    this.error = error.error.error;
                }
            );
        }
    }

    mostrar_modal_grupo() {
        this.modalGrupoNuevo.show();
        this._init();
    }

    private valida_grupo() {
        if (this.form_grupo.carrera !== 0
        && this.form_grupo.tutor !== 0
            && this.form_grupo.clave_grupo.trim().length !== 0) {
            return true;
        } else {
            alert('Complete todos los datos');
            return false;
        }
    }

    private _init() {
        this.display = 'none';
        this.form_grupo = {
            pk_grupo: 0,
            carrera: 0,
            tutor: 0,
            clave_grupo: ''
        };
    }

}
