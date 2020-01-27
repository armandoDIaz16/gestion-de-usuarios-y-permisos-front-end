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
import {UsuariosTutoriasComponent} from './usuarios_tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from './encuestas/encuestas.component';
import {VerEncuestasComponent} from './ver-encuestas/ver-encuestas.component';
import {ResponderEncuestaComponent} from './responder-encuesta/responder-encuesta.component';
import {GruposComponent} from './grupos/grupos.component';
import {DetalleGrupoComponent} from './detalle-grupo/detalle-grupo.component';
import {DatosAlumnoComponent} from './datos-alumno/datos-alumno.component';
import {CitasAlumnoComponent} from './citas-alumno/citas-alumno.component';
import {CanalizacionesAlumnoComponent} from './canalizaciones-alumno/canalizaciones-alumno.component';
import {EncuestasAlumnoComponent} from './encuestas-alumno/encuestas-alumno.component';
import {HorarioAlumnoComponent} from './horario-alumno/horario-alumno.component';
import {RespuestasEncuestaComponent} from './respuestas-encuesta/respuestas-encuesta.component';
import {ReporteEncuestaComponent} from './reporte-encuesta/reporte-encuesta.component';
import {CoordinadoresInstitucionalesComponent} from './coordinadores-institucionales/coordinadores-institucionales.component';
import {CoordinadoresDepartamentalesComponent} from './coordinadores-departamentales/coordinadores-departamentales.component';

import {LoaderModule} from '../../components/loader/loader.module';
import { DatosTutorComponent } from './datos-tutor/datos-tutor.component';
import { HorarioComponent } from './horario/horario.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

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
        SeguimientoComponent
    ],
    exports: [
        ModalModule
    ]
})
export class TutoriasModule {
}
