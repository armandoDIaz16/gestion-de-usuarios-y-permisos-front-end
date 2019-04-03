import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SignupComponent } from './components/signup/signup.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { EgresadosComponent } from './views/egresados/egresados.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ControlComponent } from './components/control/control.component';
import { StudentOldComponent } from './components/student-old/student-old.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [BeforeLoginService]
  },
  {
    path: '404',
    component: P404Component,
    canActivate: [BeforeLoginService]},
  {
    path: 'egresados',
    component: EgresadosComponent,
    data: {
      title: 'Egresados'
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
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
    data: {
      title: 'MOSNOS'
    }
  },
  {
    path: '500',
    component: P500Component,
    canActivate: [BeforeLoginService],
    data: {
      title: 'Page 500'
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
    //canActivate: [AfterLoginService],
    data: {
      title: 'Home'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    //canActivate: [AfterLoginService],
    data: {
      title: 'Sistemas'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'aspirantes',
        loadChildren: './views/aspirantes/aspirantes.module#AspirantesModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
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
  { path: '**', component: P404Component },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
