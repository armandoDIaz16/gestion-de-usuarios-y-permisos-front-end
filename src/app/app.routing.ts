import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';


import {P404Component} from './components/error/404.component';
import {P500Component} from './components/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';

import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
// import { EgresadosComponent } from './views/egresados/egresados.component';
import {FormularioComponent} from './components/formulario/formulario.component';
import {ControlComponent} from './components/control/control.component';
import {StudentOldComponent} from './components/student-old/student-old.component';

import {ActivaCuentaComponent} from './components/activa-cuenta/activa-cuenta.component';

import { RepositorioTesisComponent } from './components/repositorio_tesis/repositorio_tesis.component';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [BeforeLoginService],
        data: {
            title: 'Login Page'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'registro_aspirante',
        component: FormularioComponent,
        data: {
            title: 'Registro aspirante'
        }
    },
    {
        path: 'get-password',
        component: ControlComponent,
        canActivate: [BeforeLoginService],
        data: {
            title: 'Obtener contraseña'
        }
    },
    {
        path: 'activa-cuenta',
        component: ActivaCuentaComponent,
        canActivate: [BeforeLoginService],
        data: {
            title: 'Activar cuenta'
        }
    },
    {
        path: 'create-password',
        component: StudentOldComponent,
        canActivate: [BeforeLoginService],
        data: {
            title: 'Obtener contraseña'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [BeforeLoginService],
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [BeforeLoginService],
        data: {
            title: 'Register Page'
        }
    },
    {
        path: 'home',
        component: DefaultLayoutComponent,
        canActivate: [AfterLoginService],
        data: {
            title: 'Inicio'
        }
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        canActivate: [AfterLoginService],
        data: {
            title: 'Sistemas'
        },
        children: [
            {
                path: 'aspirantes',
                loadChildren: './views/aspirantes/aspirantes.module#AspirantesModule'
            },
            {
                path: 'egresados',
                loadChildren: './views/egresados/egresados.module#EgresadosModule'
            },
            {
                path: 'residencias',
                loadChildren: './views/residencias/residencias.module#ResidenciasModule'
            },
            {
                path: 'tutorias',
                loadChildren: './modules/tutorias.module#TutoriasModule'
            },
            {
                path: 'capacitacion_docente',
                loadChildren: './modules/capacitacion.module#CapacitacionModule'
            },
            {
                path: 'asesoria_academica',
                loadChildren: './views/asesoria_academica/asesoria.module#AsesoriaModule'
            },
            {
                path: 'creditos',
                loadChildren: './views/creditos/creditos.module#CreditosModule'
            },
            {
                path: 'servicio_social',
                loadChildren: './views/servicio_social/servicio-social.module#ServicioSocialModule'
            },
            {
                path: 'usuarios',
                loadChildren: './modules/usuarios.module#UsuariosModule'
            }
        ]
    },
    {
        path: 'request-password-reset',
        component: RequestResetComponent,
        canActivate: [BeforeLoginService],
    },
    {
        path: 'response-password-reset',
        component: ResponseResetComponent,
        canActivate: [BeforeLoginService],
    },
    {
        path: 'repositorio_tesis',
        component: RepositorioTesisComponent,
        data: {
            title: 'Repositorio tesis'
        }
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
