import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsuariosTutoriasComponent} from '../components/tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from '../components/tutorias/encuestas.component';
import {ResponderEncuestaComponent} from '../components/tutorias/responder-encuesta.component';
import {GruposComponent} from '../components/tutorias/grupos.component';
import {DetalleGrupoComponent} from '../components/tutorias/detalle-grupo.component';
import {DatosAlumnoComponent} from '../components/tutorias/datos-alumno.component';
import {CitasAlumnoComponent} from '../components/tutorias/citas-alumno.component';
import {CanalizacionesAlumnoComponent} from '../components/tutorias/canalizaciones-alumno.component';
import {EncuestasAlumnoComponent} from '../components/tutorias/encuestas-alumno.component';
import {HorarioAlumnoComponent} from '../components/tutorias/horario-alumno.component';
import {RespuestasEncuestaComponent} from '../components/tutorias/respuestas-encuesta.component';
import {ReporteEncuestaComponent} from '../components/tutorias/reporte-encuesta.component';
import {CoordinadoresInstitucionalesComponent} from '../components/tutorias/coordinadores-institucionales.component';
import {CoordinadoresDepartamentalesComponent} from '../components/tutorias/coordinadores-departamentales.component';
import {DatosTutorComponent} from '../components/tutorias/datos-tutor.component';
import {HorarioComponent} from '../components/tutorias/horario.component';
import {SeguimientoComponent} from '../components/tutorias/seguimiento.component';
import {DashboardComponent} from '../components/tutorias/dashboard.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Sistema Integral de Tutorías'
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Tablero de control'
                }
            },
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
