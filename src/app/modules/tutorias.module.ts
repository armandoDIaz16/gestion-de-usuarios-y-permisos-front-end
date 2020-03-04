import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// ventanas modales
import {ModalModule} from 'ngx-bootstrap';

// Dropdowns Component
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

// Buttons Routing
import {TutoriasRoutingModule} from './tutorias-routing.module';

// Component
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {UsuariosTutoriasComponent} from '../components/tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from '../components/tutorias/estudiante/encuestas.component';
import {VerEncuestasComponent} from '../components/tutorias/ver-encuestas.component';
import {ResponderEncuestaComponent} from '../components/tutorias/responder-encuesta.component';
import {GruposComponent} from '../components/tutorias/tutor/grupos.component';
import {DetalleGrupoComponent} from '../components/tutorias/detalle-grupo.component';
import {DatosAlumnoComponent} from '../components/tutorias/datos-alumno.component';
import {CitasAlumnoComponent} from '../components/tutorias/citas-alumno.component';
import {CanalizacionesAlumnoComponent} from '../components/tutorias/canalizaciones-alumno.component';
import {EncuestasAlumnoComponent} from '../components/tutorias/encuestas-alumno.component';
import {HorarioAlumnoComponent} from '../components/tutorias/horario-alumno.component';
import {RespuestasEncuestaComponent} from '../components/tutorias/respuestas-encuesta.component';
import {ReporteEncuestaComponent} from '../components/tutorias/reporte-encuesta.component';
import {CoordinadoresInstitucionalesComponent} from '../components/tutorias/coordinadores-institucionales.component';
import {CoordinadoresDepartamentalesComponent} from '../components/tutorias/coord_institucional/coordinadores-departamentales.component';

import {LoaderModule} from '../components/loader/loader.module';
import { DatosTutorComponent } from '../components/tutorias/estudiante/datos-tutor.component';
import { HorarioComponent } from '../components/tutorias/estudiante/horario.component';
import { SeguimientoComponent } from '../components/tutorias/estudiante/seguimiento.component';
import { HistoricoGruposComponent} from '../components/tutorias/tutor/historico-grupos.component';
import { DashboardComponent } from '../components/tutorias/dashboard.component';
import {ConferenciasComponent} from '../components/tutorias/coord_institucional/conferencias.component';
import {AplicacionEncuestaComponent} from '../components/tutorias/aplicacion-encuesta.component';

// Angular

@NgModule({
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        TutoriasRoutingModule,
        BsDropdownModule.forRoot(),
        FormsModule,
        CollapseModule,
        TooltipModule.forRoot(),
        LoaderModule
    ],
    declarations: [
        UsuariosTutoriasComponent,
        EncuestasComponent,
        VerEncuestasComponent,
        ResponderEncuestaComponent,
        GruposComponent,
        DetalleGrupoComponent,
        DatosAlumnoComponent,
        CitasAlumnoComponent,
        CanalizacionesAlumnoComponent,
        EncuestasAlumnoComponent,
        HorarioAlumnoComponent,
        RespuestasEncuestaComponent,
        ReporteEncuestaComponent,
        CoordinadoresInstitucionalesComponent,
        CoordinadoresDepartamentalesComponent,
        DatosTutorComponent,
        HorarioComponent,
        SeguimientoComponent,
        DashboardComponent,
        HistoricoGruposComponent,
        ConferenciasComponent,
        AplicacionEncuestaComponent
    ],
    exports: [
        ModalModule
    ]
})
export class TutoriasModule {
}
