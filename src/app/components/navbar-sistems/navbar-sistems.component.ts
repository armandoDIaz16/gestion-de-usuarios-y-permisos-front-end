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
                                            .replace(new RegExp(/[àáâãäå]/g), 'a')
                                            .replace(new RegExp(/[èéêë]/g), 'e')
                                            .replace(new RegExp(/[ìíîï]/g), 'i')
                                            .replace(new RegExp(/[òóôõö]/g), 'o')
                                            .replace(new RegExp(/[ùúûü]/g), 'u')
                                            + '/' + sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE.toLowerCase()
                                            .replace(/\s/g, '_')
                                            .replace(new RegExp(/[àáâãäå]/g), 'a')
                                            .replace(new RegExp(/[èéêë]/g), 'e')
                                            .replace(new RegExp(/[ìíîï]/g), 'i')
                                            .replace(new RegExp(/[òóôõö]/g), 'o')
                                            .replace(new RegExp(/[ùúûü]/g), 'u'),
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

                sessionStorage['rutas'] = JSON.stringify(rutasRoles);
                switch (nombreSistema) {
                    case 'Aspirantes':
                        if (this.redirigirAspirante) {
                            this.router.navigateByUrl('/aspirantes/dashboard');
                            break;
                        }
                        this.router.navigateByUrl('/aspirantes');
                        break;
                    case 'Residencias':
                        this.router.navigateByUrl('/residencias');
                        break;
                    case 'Tutorías':
                        this.router.navigateByUrl('/tutorias/dashboard');
                        break;
                    case 'asesoría académica':
                        this.router.navigateByUrl('/asesoria_academica');
                        break;
                    case 'servicio_social':
                        this.router.navigateByUrl('/servicio_social');
                        break;
                    case 'Creditos':
                        this.router.navigateByUrl('/creditos');
                        break;
                }
            });
        /*}*/

        this.loaderModal.hide();
    }
}

export const rutasNav = rutasRoles;
