import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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
import {DatosTutorComponent} from './datos-tutor/datos-tutor.component';
import {HorarioComponent} from './horario/horario.component';
import {SeguimientoComponent} from './seguimiento/seguimiento.component';

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
            },
            {
                path: 'responder_encuesta',
                component: ResponderEncuestaComponent,
                data: {
                    title: 'Responder encuesta'
                }
            },
            {
                path: 'grupos',
                component: GruposComponent,
                data: {
                    title: 'Ver grupos'
                }
            },
            {
                path: 'detalle-grupo',
                component: DetalleGrupoComponent,
                data: {
                    title: 'Ver grupo'
                }
            },
            {
                path: 'datos-alumno',
                component: DatosAlumnoComponent,
                data: {
                    title: 'Datos estudiante'
                }
            },
            {
                path: 'ver-encuestas',
                component: EncuestasAlumnoComponent,
                data: {
                    title: 'Encuesta estudiante'
                }
            },
            {
                path: 'citas-alumno',
                component: CitasAlumnoComponent,
                data: {
                    title: 'Citas estudiante'
                }
            },
            {
                path: 'canalizaciones-alumno',
                component: CanalizacionesAlumnoComponent,
                data: {
                    title: 'Canalizaciones estudiante'
                }
            },
            {
                path: 'horario-alumno',
                component: HorarioAlumnoComponent,
                data: {
                    title: 'Horario de estudiante'
                }
            },
            {
                path: 'respuestas-encuesta',
                component: RespuestasEncuestaComponent,
                data: {
                    title: 'Respuesta de encuesta'
                }
            },
            {
                path: 'reporte-encuesta',
                component: ReporteEncuestaComponent,
                data: {
                    title: 'Respuesta de encuesta'
                }
            },
            {
                path: 'coordinadores_institucionales',
                component: CoordinadoresInstitucionalesComponent,
                data: {
                    title: 'Coordinadores institucionales'
                }
            },
            {
                path: 'coordinadores_departamentales',
                component: CoordinadoresDepartamentalesComponent,
                data: {
                    title: 'Coordinadores departamentales'
                }
            },
            {
                path: 'datos_tutor',
                component: DatosTutorComponent,
                data: {
                    title: 'Datos de tutor'
                }
            },
            {
                path: 'horario',
                component: HorarioComponent,
                data: {
                    title: 'Mi horario'
                }
            },
            {
                path: 'seguimiento_academico',
                component: SeguimientoComponent,
                data: {
                    title: 'Seguimiento académico'
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
