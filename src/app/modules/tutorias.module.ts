import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {DetalleGrupoAdministradorComponent} from '../components/tutorias/grupos_inicial_detalle/detalle-grupo-administrador.component';
import {DatosAlumnoComponent} from '../components/tutorias/datos-alumno.component';
import {CitasAlumnoComponent} from '../components/tutorias/citas-alumno.component';
import {CanalizacionesAlumnoComponent} from '../components/tutorias/canalizaciones-alumno.component';
import {EncuestasBaseComponent} from '../components/tutorias/encuestas_alumno/encuestas-base.component';
import {HorarioAlumnoComponent} from '../components/tutorias/horario_alumno/horario-alumno.component';
import {RespuestasEncuestaComponent} from '../components/tutorias/respuestas-encuesta.component';
import {ReporteEncuestaComponent} from '../components/tutorias/reporte-encuesta.component';
import {CoordinadoresInstitucionalesComponent} from '../components/tutorias/coordinadores-institucionales.component';
import {CoordinadoresDepartamentalesComponent} from '../components/tutorias/coord_institucional/coordinadores-departamentales.component';

import {LoaderModule} from '../components/loader/loader.module';
import {DatosTutorComponent} from '../components/tutorias/estudiante/datos-tutor.component';
import {HorarioComponent} from '../components/tutorias/estudiante/horario.component';
import {SeguimientoComponent} from '../components/tutorias/estudiante/seguimiento.component';
import {HistoricoGruposComponent} from '../components/tutorias/tutor/historico-grupos.component';
import {DashboardComponent} from '../components/tutorias/dashboard.component';
import {ConferenciasComponent} from '../components/tutorias/coord_institucional/conferencias.component';
import {AplicacionEncuestaComponent} from '../components/tutorias/coord_institucional/aplicacion-encuesta.component';
import {GruposInicialCoordDepComponent} from '../components/tutorias/coord_departamental/grupos-inicial-coord-dep.component';
import {GruposInicialAdminComponent} from '../components/tutorias/coord_institucional/grupos-inicial-admin.component';
import {ReporteEncuestaAlumnoComponent} from '../components/tutorias/estudiante/reporte-encuesta.component';
import {ReporteEncuestaBaseComponent} from '../components/tutorias/encuestas_alumno_reporte/reporte-encuesta-base.component';
import {GruposTutoriasSiiaComponent} from '../components/tutorias/coord_institucional/grupos-tutorias-siia.component';
import {GruposSeguimientoAdminComponent} from '../components/tutorias/coord_institucional/grupos-seguimiento-admin.component';
import {DetalleGrupoSegAdminComponent} from '../components/tutorias/coord_institucional/detalle-grupo-seg-admin.component';
import {InvitacionConferenciasComponent} from '../components/tutorias/coord_institucional/invitacion-conferencias.component';
import {GestionGrupoSeguimientoComponent} from '../components/tutorias/grupos_seguimiento/gestion-grupo-seguimiento.component';
import {GruposAdministradorComponent} from '../components/tutorias/grupos_inicial/grupos-administrador.component';
import {GruposInstitucionalComponent} from '../components/tutorias/grupos_inicial/grupos-institucional.component';
import {GruposDepartamentalComponent} from '../components/tutorias/grupos_inicial/grupos-departamental.component';
import {GruposTutorComponent} from '../components/tutorias/grupos_inicial/grupos-tutor.component';
import {GruposBaseComponent} from '../components/tutorias/grupos_inicial/grupos-base-component';
import {DetalleBaseComponent} from '../components/tutorias/grupos_inicial_detalle/detalle-base.component';
import {EncuestasAdministradorComponent} from '../components/tutorias/encuestas_alumno/encuestas-administrador.component';
import {ReporteEncuestaAdministradorComponent} from '../components/tutorias/encuestas_alumno_reporte/reporte-encuesta-administrador.component';

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
        LoaderModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        UsuariosTutoriasComponent,
        EncuestasComponent,
        VerEncuestasComponent,
        ResponderEncuestaComponent,
        GruposComponent,
        CitasAlumnoComponent,
        CanalizacionesAlumnoComponent,
        ReporteEncuestaBaseComponent,
        CoordinadoresInstitucionalesComponent,
        CoordinadoresDepartamentalesComponent,
        DatosTutorComponent,
        HorarioComponent,
        SeguimientoComponent,
        DashboardComponent,
        HistoricoGruposComponent,
        ConferenciasComponent,
        AplicacionEncuestaComponent,
        GruposInicialCoordDepComponent,
        GruposInicialAdminComponent,
        ReporteEncuestaAlumnoComponent,
        GruposTutoriasSiiaComponent,
        GruposSeguimientoAdminComponent,
        DetalleGrupoSegAdminComponent,
        InvitacionConferenciasComponent,
        GestionGrupoSeguimientoComponent,
        ReporteEncuestaComponent,

        /* Grupos inicial */
        GruposBaseComponent,
        GruposAdministradorComponent,
        GruposInstitucionalComponent,
        GruposDepartamentalComponent,
        GruposTutorComponent,
        /* Detalle grupo inicial */
        DetalleBaseComponent,
        DetalleGrupoAdministradorComponent,
        HorarioAlumnoComponent,
        DatosAlumnoComponent,
        /* Encuestas */
        EncuestasBaseComponent,
        EncuestasAdministradorComponent,
        /* Respuestas encuesta */
        RespuestasEncuestaComponent,
        /* Reportes encuesta */
        ReporteEncuestaBaseComponent,
        ReporteEncuestaAdministradorComponent,
    ],
    exports: [
        ModalModule
    ]
})
export class TutoriasModule {
}
