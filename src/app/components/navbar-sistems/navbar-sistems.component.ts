import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioRolesService} from '../../services/usuraio-roles.service';
import {SistemaPermisosService} from '../../services/sistema-permisos.service';

var rutasRoles = [];

@Component({
    selector: 'app-navbar-sistems',
    templateUrl: './navbar-sistems.component.html',
    styleUrls: ['./navbar-sistems.component.scss'],
    providers: [UsuarioRolesService,
        SistemaPermisosService]
})


export class NavbarSistemsComponent implements OnInit {
    public usuarioSistemasLista = [];
    redirigirAspirante: boolean;

    @ViewChild('loaderModal') loaderModal;

    constructor(private usuarioRolesService: UsuarioRolesService,
                private sistemaPermisosService: SistemaPermisosService,
                private router: Router) {
    }

    ngOnInit() {
        this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
            sessionStorage['sistemas'] = JSON.stringify(data);
        });
        let sistemas = JSON.parse(sessionStorage.sistemas);
        for (var sistema in sistemas[0].SISTEMAS) {
            this.usuarioSistemasLista.push({
                PK_SISTEMA: sistemas[0].SISTEMAS[sistema].PK_SISTEMA,
                NOMBRE: sistemas[0].SISTEMAS[sistema].NOMBRE
            });
        }
    }


    async mostrarRoles(sistemaSelect, nombreSistema) {
        this.loaderModal.show();
        this.router.navigateByUrl('/home');

        /*if (sessionStorage.rutas) {*/
            sessionStorage.setItem('sistema', sistemaSelect);
            const data = await this.usuarioRolesService.getUsuarioRoles().subscribe(data => {

                /*console.log(data);*/

                let sistemas = JSON.parse(sessionStorage.sistemas);
                for (var sistema in sistemas[0].SISTEMAS) {
                    if (sistemas[0].SISTEMAS[sistema].PK_SISTEMA === sessionStorage.getItem('sistema')) {
                        // console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)

                        while (rutasRoles.pop()) {}

                        for (var rol in sistemas[0].SISTEMAS[sistema].ROLES) {
                            var rutasModulos = [];
                            if (sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE == 'Aspirante') {
                                this.redirigirAspirante = true;
                            }
                            for (var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS) {
                                // console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
                                rutasModulos.push({
                                    /* name: sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE,
                                    url: '/' + sistemas[0].SISTEMAS[sistema].NOMBRE.toLowerCase().replace(/\s/g, '_') +
                                        '/' + sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE.toLowerCase()
                                        .replace(/\s/g, '_'),
                                    icon: 'icon-arrow-right' */
                                    name: sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE,
                                    url: '/' + sistemas[0].SISTEMAS[sistema].NOMBRE.toLowerCase()
                                            .replace(/\s/g, '_')
                                            .replace(new RegExp(/[????????????]/g), 'a')
                                            .replace(new RegExp(/[????????]/g), 'e')
                                            .replace(new RegExp(/[????????]/g), 'i')
                                            .replace(new RegExp(/[??????????]/g), 'o')
                                            .replace(new RegExp(/[????????]/g), 'u')
                                            + '/' + sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].RUTA_MD5.trim(),
                                            /*+ '/' + sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE.toLowerCase()
                                            .replace(/\s/g, '_')
                                            .replace(new RegExp(/[????????????]/g), 'a')
                                            .replace(new RegExp(/[????????]/g), 'e')
                                            .replace(new RegExp(/[????????]/g), 'i')
                                            .replace(new RegExp(/[??????????]/g), 'o')
                                            .replace(new RegExp(/[????????]/g), 'u'),*/
                                    icon: 'icon-arrow-right'
                                });
                                // modulos.push(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE);
                            }

                            rutasRoles.push({
                                name: sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE,
                                icon: 'icon-user',
                                children: rutasModulos
                            });
                        }
                    }
                }

                this.loaderModal.hide();

                sessionStorage['rutas'] = JSON.stringify(rutasRoles);
                // console.log(nombreSistema);
                switch (nombreSistema) {
                    case 'Aspirantes':
                        if (this.redirigirAspirante) {
                            this.router.navigateByUrl('/aspirantes/dc7161be3dbf2250c8954e560cc35060');
                            break;
                        }
                        this.router.navigateByUrl('/aspirantes');
                        break;
                    case 'Residencias':
                        this.router.navigateByUrl('/residencias');
                        break;
                    case 'Tutor??as':
                        this.router.navigateByUrl('/tutorias/dc7161be3dbf2250c8954e560cc35060'); // dashboard
                        break;
                    case 'asesor??a acad??mica':
                        this.router.navigateByUrl('/asesoria_academica');
                        break;
                    case 'servicio_social':
                        this.router.navigateByUrl('/servicio_social');
                        break;
                    case 'Creditos':
                        this.router.navigateByUrl('/creditos');
                        break;
                    case 'Referencias':
                        this.router.navigateByUrl('/referencias');
                        break;
                     case 'Capacitaci??n docente':
                        this.router.navigateByUrl('/capacitacion_docente/787eb37068bf4a5b174c44f75d22cc51');
                        break;
                }
            });
        /*}*/
    }

    recargar() {
        location.reload();
    }
}

export const rutasNav = rutasRoles;
