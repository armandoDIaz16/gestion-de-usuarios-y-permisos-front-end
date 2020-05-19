import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacecCarreraGruposTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposAdminService} from '../../../services/tutorias/coord_institucional/grupos-admin.service';
import {InterfaceCarrera} from '../../../models/general/CarreraModel';
import {CarrerasService} from '../../../services/general/carreras.service';
import {InterfaceUsuario} from '../../../models/general/UsuarioModel';
import {UsuariosService} from '../../../services/usuarios/usuarios.service';

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

        this.carreras_service.get_carreras('').subscribe(
            data => {
                this.lista_carreras = data;
            },
            error => {
                this.error = error.error.error;
            }
        );
    }

    elimina_grupo() {
        // eliminar un grupo
    }

    guardar_grupo() {
        // guardar grupo de seguimiento
        if (this.valida_grupo()) {
            this.display = 'block';
            this.grupos_service.guarda_grupo_seguimiento(this.form_grupo).subscribe(
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
    }

    busca_tutores() {
        this.lista_tutores = [];
        this.form_grupo.tutor = 0;
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

    ocultar_modal_grupo() {
        this.modalGrupoNuevo.hide();
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
            carrera: 0,
            tutor: 0,
            clave_grupo: ''
        };
    }

}
