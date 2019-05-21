import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';

import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import {AppComponent} from './app.component';

// Import containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';

const APP_CONTAINERS = [
    DefaultLayoutComponent
];

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {SistemsComponent} from './sistems/sistems.component';
import {ChartsModule} from 'ng2-charts';

// login
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { ProfileComponent } from './components/profile/profile.component';
import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JarwisService} from './services/jarwis.service';
import {TokenService} from './services/token.service';
import {AuthService} from './services/auth.service';
import {AfterLoginService} from './services/after-login.service';
import {BeforeLoginService} from './services/before-login.service';
// @ts-ignore
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormularioComponent} from './components/formulario/formulario.component';
import {EstadoCivilService} from './services/estado-civil.service';
import {DependenciaService} from './services/dependencia.service';
import {PropagandaTecnologicoService} from './services/propaganda-tecnologico.service';
import {IncapacidadService} from './services/incapacidad.service';
import {CarreraService} from './services/carrera.service';
import {EntidadFederativaService} from './services/entidad-federativa.service';
import {CiudadService} from './services/ciudad.service';
import {ControlComponent} from './components/control/control.component';
import {StudentOldComponent} from './components/student-old/student-old.component';
import {NavbarSistemsComponent} from './components/navbar-sistems/navbar-sistems.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DocumentacionComponent} from './views/residencias/documentacion/documentacion.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        FormsModule,
        HttpClientModule,
        ChartsModule,
        // SnotifyModule,
        MDBBootstrapModule.forRoot(),
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        P404Component,
        P500Component,
        LoginComponent,
        //  SignupComponent,
        RegisterComponent,
        RequestResetComponent,
        ResponseResetComponent,
        SistemsComponent,
        FormularioComponent,
        ControlComponent,
        StudentOldComponent,
        NavbarSistemsComponent,
    ],
    providers: [
        EstadoCivilService,
        DependenciaService,
        PropagandaTecnologicoService,
        IncapacidadService,
        CarreraService,
        EntidadFederativaService,
        CiudadService,

        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }, JarwisService, TokenService, AuthService, AfterLoginService, BeforeLoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
