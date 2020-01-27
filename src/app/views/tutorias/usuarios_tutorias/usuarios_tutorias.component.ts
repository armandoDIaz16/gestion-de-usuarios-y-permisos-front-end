import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacePerfil} from '../../usuarios/_models/PerfilModel';
import {UsuariosServiceService} from '../../../services/usuarios-service.service';
import {JarwisService} from '../../../services/jarwis.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios_tutorias.component.html',
    styleUrls: ['./usuarios_tutorias.component.scss']
})
export class UsuariosTutoriasComponent implements OnInit {

    public error = null;
    public error_actualizar = null;
    @ViewChild('loaderModal') loaderModal;
    @ViewChild('loaderModalModificar') loaderModalModificar;
    public lista_usuarios: InterfacePerfil[] = [];
    public usuario_modificacion: InterfacePerfil;
    public tipo_usuario: number;
    public numero_control: string;
    public nombre: string;

    // datos para actualizar usuario
    public correo_personal: string;

    constructor(private usuarios_service: UsuariosServiceService,
                private Jarvis: JarwisService) {
        this._init();
    }

    ngOnInit() {
    }

    buscar_usuarios() {
        let body = {
            tipo_usuario: this.tipo_usuario,
            numero_control: this.numero_control,
            nombre: this.nombre
        };

        this.usuarios_service.busca_usuarios(body).subscribe(
            data => {
                this.lista_usuarios = data;
                this.loaderModal.hide();
                this._init();
            },
            error => this.error = error.error
        );
    }

    carga_usuario(pk_usuario) {
        let usuario = this.lista_usuarios.filter(usuario => usuario.PK_USUARIO == pk_usuario);
        this.usuario_modificacion = usuario[0];
        this.correo_personal = this.usuario_modificacion.CORREO1;
        this.loaderModalModificar.show();
    }

    actualizar_correo() {
        if (this.correo_personal.trim().length > 0) {
            if (confirm('¿Realmente desea actualizar el correo?')) {
                this.error_actualizar = null;
                let body = {
                    pk_encriptada: this.usuario_modificacion.PK_ENCRIPTADA,
                    correo: this.correo_personal
                };
                this.usuarios_service.modifica_correo(body).subscribe(
                    data => {
                        this.usuario_modificacion.CORREO1 = this.correo_personal;
                    },
                    error => this.error_actualizar = error.error
                );
            }
        } else {
            alert('Ingrese el correo para el usuario');
        }
    }

    cambio_contrasenia(curp: string) {
        if (confirm('¿Realmente desea enviar correo para recuperación de contraseña?')) {
            let body = {
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
                }
            );
        }
    }

    ocultar_modal_modificar() {
        this.loaderModalModificar.hide();
        this.usuario_modificacion = null;
    }

    ocultar_modal_busqueda() {
        this.loaderModal.hide();
        this._init();
    }

    _init() {
        this.tipo_usuario = 0;
        this.numero_control = '';
        this.nombre = '';
    }
}
