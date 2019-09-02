import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioRolesService} from '../../services/usuraio-roles.service';
import {SistemaPermisosService} from '../../services/sistema-permisos.service';
import {DashboardComponent} from '../../views/aspirantes/dashboard/dashboard.component';
import {DatosComponent} from '../../views/aspirantes/datos/datos.component';
import {PrefichasComponent} from '../../views/aspirantes/prefichas/prefichas.component';
import {PrefichasPagadasComponent} from '../../views/aspirantes/prefichas_pagadas/prefichas_pagadas.component';
import {ListaGruposComponent} from '../../views/aspirantes/lista_grupos/lista_grupos.component';
import {CrearGruposComponent} from '../../views/aspirantes/crear_grupos/crear_grupos.component';
import {ArchivosComponent} from '../../views/aspirantes/archivos/archivos.component';
import {GraficasComponent} from '../../views/aspirantes/graficas/graficas.component';
import {PeriodoComponent} from '../../views/aspirantes/periodo/periodo.component';
// import { rutasSistemas } from '../../views/login/login.component';
// import { navItems } from './../../_nav';

// import { recargarRutas } from '../../containers/default-layout/default-layout.component';

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

  mostrarRoles(sistemaSelect){
    this.router.navigateByUrl('/home');
    sessionStorage.setItem('sistema',sistemaSelect);
    /* this.sistemaPermisosService.getPermisosSistemas().subscribe(data => {
      //sessionStorage['sistemaPermisos'] = JSON.stringify(data);
      sessionStorage.setItem('sistemaPermisos',JSON.stringify(data));
    }); */
    this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
      let sistemas = JSON.parse(sessionStorage.sistemas);
      var rutasRoles = [];
      for(var sistema in sistemas[0].SISTEMAS){
        if(sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
          //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
          for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
            var rutasModulos = [];
            //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
            for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){              
              //console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
              rutasModulos.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE,
                              url: '/'+sistemas[0].SISTEMAS[sistema].NOMBRE.toLowerCase().replace(/\s/g,"_").replace(new RegExp(/[àáâãäå]/g),"a").replace(new RegExp(/[èéêë]/g),"e")
                              .replace(new RegExp(/[ìíîï]/g),"i").replace(new RegExp(/[òóôõö]/g),"o").replace(new RegExp(/[ùúûü]/g),"u")+'/'+sistemas[0].SISTEMAS[sistema].
                              ROLES[rol].MODULOS[modulo].NOMBRE.toLowerCase().replace(/\s/g,"_").replace(new RegExp(/[àáâãäå]/g),"a").replace(new RegExp(/[èéêë]/g),"e")
                              .replace(new RegExp(/[ìíîï]/g),"i").replace(new RegExp(/[òóôõö]/g),"o").replace(new RegExp(/[ùúûü]/g),"u"), 
                              icon: 'icon-arrow-right'});
                              /*  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
            r = r.replace(new RegExp(/[èéêë]/g),"e");
            r = r.replace(new RegExp(/[ìíîï]/g),"i");
            r = r.replace(new RegExp(/ñ/g),"n");                
            r = r.replace(new RegExp(/[òóôõö]/g),"o");
            r = r.replace(new RegExp(/[ùúûü]/g),"u"); */
            }
            rutasRoles.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE, 
                            icon: 'icon-user', 
                            children: rutasModulos});  
          }
                sessionStorage['rutas'] = JSON.stringify(rutasRoles);
                switch (nombreSistema) {
                    case 'Aspirantes':
                        this.router.navigateByUrl('/aspirantes');
                    case 'Residencias':
                        break;
                        break;
                        this.router.navigateByUrl('/residencias');
                        this.router.navigateByUrl('/tutorias');
                    case 'tutorias':
                        break;
                }
            });
        }
    }
}

export const rutasNav = rutasRoles;
