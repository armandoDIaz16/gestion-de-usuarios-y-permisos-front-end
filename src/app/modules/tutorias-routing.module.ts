import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsuariosTutoriasComponent} from '../components/tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from '../components/tutorias/estudiante/encuestas.component';
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
import {CoordinadoresDepartamentalesComponent} from '../components/tutorias/coord_institucional/coordinadores-departamentales.component';
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
            /* ************************************* *
             * ********** RUTAS DE ALUMNOS ********* *
             * ************************************* */
            {
                path: '6da5b4309f3cc102b3a2b7ac7e52a62c', // encuestas_alumno
                component: EncuestasComponent,
                data: {
                    title: 'Encuestas'
                }
            },
            {
                path: '93f61aa8ec5dd9a7c456f3fcab126e81', // datos_tutor
                component: DatosTutorComponent,
                data: {
                    title: 'Datos de tutor'
                }
            },
            {
                path: '019598bbc4a553858bb03f4d26d4e772', // horario
                component: HorarioComponent,
                data: {
                    title: 'Mi horario'
                }
            },
            {
                path: 'ace6a2029397fd5f164842ac293223e5', // seguimiento_academico
                component: SeguimientoComponent,
                data: {
                    title: 'Seguimiento académico'
                }
            },
            {
                path: '745651e29c6bb18baf4a1118fa8a0fc5', // responder_encuesta
                component: ResponderEncuestaComponent,
                data: {
                    title: 'Responder encuesta'
                }
            },
            {
                path: 'd41ac8705ff2bfef62c749c4928edb98', // reporte_encuesta_alumno
                component: ReporteEncuestaComponent,
                data: {
                    title: 'Resporte de encuesta'
                }
            },
            /* ************************************* *
             * ********** RUTAS DE TUTORES ********* *
             * ************************************* */
            {
                path: 'a20e50d69f0242136be5a392524da972', // grupos_tutor
                component: GruposComponent,
                data: {
                    title: 'Ver grupos'
                }
            },
            {
                path: '47b8563343b0fec813625cb20111085f', // detalle-grupo
                component: DetalleGrupoComponent,
                data: {
                    title: 'Ver grupo'
                }
            },
            {
                path: '8f15ac9b679bca1571f27fb7ec20ecce', // horario-alumno
                component: HorarioAlumnoComponent,
                data: {
                    title: 'Horario de estudiante'
                }
            },
            {
                path: 'ae5e8aad886494179a1caaca506c192a', // datos-alumno
                component: DatosAlumnoComponent,
                data: {
                    title: 'Datos estudiante'
                }
            },
            {
                path: '7cb70e1b1cc26baefc65581481ff2c05', // ver-encuestas
                component: EncuestasAlumnoComponent,
                data: {
                    title: 'Encuesta estudiante'
                }
            },
            {
                path: 'reporte_encuesta_tutor', // reporte_encuesta_tutor
                component: ReporteEncuestaComponent,
                data: {
                    title: 'Resporte de encuesta'
                }
            },
            /* *********************************************************** *
             * ********** RUTAS DE COORDINADORES DEPARTAMELTALES ********* *
             * *********************************************************** */

            /* ***************************************************************** *
             * ********** RUTAS DE COORD INSTITUCIONALES/ADMINISTRADOR ********* *
             * ***************************************************************** */

            /* **************************************************** *
             * ********** RUTAS DE COORD INVEST EDUCATIVA ********* *
             * **************************************************** */
            {
                path: 'dc7161be3dbf2250c8954e560cc35060', // dashboard_tutorias
                component: DashboardComponent,
                data: {
                    title: 'Tablero de control'
                }
            },
            {
                path: '03f996214fba4a1d05a68b18fece8e71', // usuarios
                component: UsuariosTutoriasComponent,
                data: {
                    title: 'Usuarios'
                }
            }, /*
            {
                path: 'grupos',
                component: GruposComponent,
                data: {
                    title: 'Ver grupos'
                }
            },*/
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
                path: 'respuestas-encuesta',
                component: RespuestasEncuestaComponent,
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
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TutoriasRoutingModule {
}