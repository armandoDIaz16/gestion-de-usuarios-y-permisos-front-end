import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';


import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
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
import {ResidenciasRoutingModule} from './views/residencias/residencias-routing.module';


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
        path: 'formulario',
        component: FormularioComponent,
        data: {
            title: 'Formulario'
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
            title: 'Home'
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
                loadChildren: './views/tutorias/tutorias.module#TutoriasModule'
            },
            {
                path: 'capacitacion_docente',
                loadChildren: './views/capacitacion_docente/capacitacion.module#CapacitacionModule'
            },
            {
                path: 'asesoria_academica',
                loadChildren: './views/asesoria_academica/asesoria.module#AsesoriaModule'
            },
            {
                path: 'creditos',
                loadChildren: './views/creditos/creditos.module#CreditosModule'
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
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
