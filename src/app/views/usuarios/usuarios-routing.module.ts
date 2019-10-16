import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PerfilComponent} from './perfil/perfil.component';

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
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {
}
