import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PerfilComponent} from '../components/usuarios/perfil.component';
import {PerfilDocenteComponent} from '../components/usuarios/perfil-docente.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Sistema de Administración de Usuarios'
        },
        children: [
            {
                path: 'perfil',
                component: PerfilComponent,
                data: {
                    title: 'Usuarios'
                }
            },
            {
                path: 'perfil_docente',
                component: PerfilDocenteComponent,
                data: {
                    title: 'Usuarios'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {
}
