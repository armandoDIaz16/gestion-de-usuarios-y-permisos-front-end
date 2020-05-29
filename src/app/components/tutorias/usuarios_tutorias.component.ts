import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacePerfil} from '../../models/usuarios/PerfilModel';
import {UsuariosService} from '../../services/usuarios/usuarios.service';
import {JarwisService} from '../../services/jarwis.service';
import {Modulos} from '../../config/Tutorias';

@Component({
    selector: 'app-usuarios',
    templateUrl: '../../views/tutorias/usuarios_tutorias.component.html',
    styleUrls: ['../../views/tutorias/usuarios_tutorias.component.scss']
})
export class UsuariosTutoriasComponent implements OnInit {
    /* Configuracion */
    public rol = null;
    public token_rol = null;
    public display = '';
    public error = null;
    public error_actualizar = null;

    /* Permisos */
    public editar_usuario = false;
    public correo_recuperar_contrasenia = false;

    /* Ventanas modales */
    @ViewChild('loaderModalModificar') loaderModalModificar;
    @ViewChild('modal_busqueda') modal_busqueda;

    /* Datos propios */
    public lista_usuarios: InterfacePerfil[] = [];
    public usuario_modificacion: InterfacePerfil;
    public tipo_usuario: number;
    public numero_control: string;
    public nombre: string;

    // datos para actualizar usuario
    public correo_personal: string;

    constructor(private usuarios_service: UsuariosService,
                private Jarvis: JarwisService) {
        this._init();
    }

    ngOnInit() {
        this.rol = 'ADM_TUT';
    }

    buscar_usuarios() {
        const body = {
            tipo_usuario: this.tipo_usuario,
            numero_control: this.numero_control,
            nombre: this.nombre
        };

        this.display = 'block';
        this.usuarios_service.busca_usuarios(body).subscribe(
            data => {
                this.lista_usuarios = data;
                this._init();
            },
            error => {
                this.display = 'none';
                this.error = error.error;
            },
            () => {
                this.display = 'none';
                this.modal_busqueda.hide();
            }
        );
    }

    carga_usuario(pk_usuario) {
        const usuario = this.lista_usuarios.filter(data => data.PK_USUARIO === pk_usuario);
        this.usuario_modificacion = usuario[0];
        this.correo_personal = this.usuario_modificacion.CORREO1;
        this.loaderModalModificar.show();
    }

    actualizar_correo() {
        if (this.correo_personal.trim().length > 0) {
            if (confirm('¿Realmente desea actualizar el correo?')) {
                this.display = 'block';
                this.error_actualizar = null;
                const body = {
                    pk_encriptada: this.usuario_modificacion.PK_ENCRIPTADA,
                    correo: this.correo_personal
                };
                this.usuarios_service.modifica_correo(body).subscribe(
                    data => {
                        this.usuario_modificacion.CORREO1 = this.correo_personal;
                    },
                    error => {
                        this.error_actualizar = error.error;
                        this.display = 'none';
                    },
                    () => {
                        this.display = 'none';
                    }
                );
            }
        } else {
            alert('Ingrese el correo para el usuario');
        }
    }

    cambio_contrasenia(curp: string) {
        if (confirm('¿Realmente desea enviar correo para recuperación de contraseña?')) {
            this.display = 'block';
            const body = {
                CURP: curp
            };
            this.Jarvis.recuperarContrasena(body).subscribe(
                data => {
                    if (data) {
                        alert('El correo se ha enviado correctamente');
                    }
                },
                error => {
                    this.error = error.error;
                },
                () => {
                    this.display = 'none';
                }
            );
        }
    }

    ocultar_modal_modificar() {
        this.loaderModalModificar.hide();
        this.usuario_modificacion = null;
    }

    ocultar_modal_busqueda() {
        this.modal_busqueda.hide();
        this._init();
    }

    _init() {
        this.tipo_usuario = null;
        this.numero_control = '';
        this.nombre = '';
    }

    valida_permisos() {
        this.token_rol = Modulos.rol_token(this.rol);
        this.editar_usuario = Modulos.valida_rol_accion(this.rol, Modulos.EDITAR_USUARIO);
        this.correo_recuperar_contrasenia = Modulos.valida_rol_accion(this.rol, Modulos.CORREO_RECUPERAR_CONTRASENIA);
    }
}
