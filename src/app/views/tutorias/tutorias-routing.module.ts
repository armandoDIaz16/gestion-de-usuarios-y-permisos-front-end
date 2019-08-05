import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsuariosTutoriasComponent} from './usuarios_tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from './encuestas/encuestas.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Sistema Integral de Tutorías'
        },
        children: [
            {
                path: 'usuarios',
                component: UsuariosTutoriasComponent,
                data: {
                    title: 'Usuarios'
                }
            },
            {
                path: 'encuestas',
                component: EncuestasComponent,
                data: {
                    title: 'Encuestas'
                }
            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TutoriasRoutingModule {
}
