import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosTutoriasComponent } from './usuarios_tutorias/usuarios_tutorias.component';

var rutas = [];


if (sessionStorage.rutas) {
    let sistemas = JSON.parse(sessionStorage.sistemas);
    rutas = [];
    for (var sistema in sistemas[0].SISTEMAS) {
        if (sistemas[0].SISTEMAS[sistema].PK_SISTEMA == sessionStorage.getItem('sistema')) {
            var modulos = [];
            // console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
            for(var rol in sistemas[0].SISTEMAS[sistema].ROLES) {
                // console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
                for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
                    // console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
                    agregarModulos(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE);
                }
            }
            rutas.push({
                path: '',
                data: {
                    title: 'Tutorias'
                },
                children: modulos
            });
        }
    }
}

function agregarModulos(modulo) {
    switch (modulo) {
        // como le ponga al nombre del case, es como debe llamarse en el módulo de base de datos
        case 'Usuarios Tutorias':
            modulos.push({
                path: 'usuarios_tutorias',
                component: UsuariosTutoriasComponent,
                data: {
                    title: 'Usuarios'
                }
            });
        break;
    }
}


const routes: Routes = rutas;



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TutoriasRoutingModule {}
